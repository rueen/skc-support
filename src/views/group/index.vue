<template>
  <div class="group content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="群名称">
              <a-input
                v-model:value="searchForm.name"
                placeholder="请输入群名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="群主">
              <a-select
                v-model:value="searchForm.ownerId"
                placeholder="请选择群主"
                allow-clear
                style="width: 200px"
                :options="memberOptions"
              />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleSearch">
                  {{ $t('common.search') }}
                </a-button>
                <a-button @click="handleReset">
                  {{ $t('common.reset') }}
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-space>
            <a-button @click="handleConfigCommission">
              <template #icon><setting-outlined /></template>
              收益配置
            </a-button>
            <a-button type="primary" @click="handleAdd">
              <template #icon><plus-outlined /></template>
              新增群组
            </a-button>
          </a-space>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除该群吗？"
                @confirm="handleDelete(record)"
              >
                <a class="danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
          <template v-else-if="column.key === 'groupLink'">
            <div class="group-link-container">
              <a :href="record.groupLink" target="_blank" class="group-link">{{ record.groupLink }}</a>
              <a-button type="link" size="small" @click="copyLink(record.groupLink)" class="copy-btn">
                复制
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 添加/编辑/查看群弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      :confirmLoading="modalLoading"
      @ok="handleModalOk"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="群名称" name="name">
          <a-input
            v-model:value="formData.name"
            placeholder="请输入群名称"
          />
        </a-form-item>
        <a-form-item label="群链接" name="groupLink">
          <a-input
            v-model:value="formData.groupLink"
            placeholder="请输入群链接"
          />
        </a-form-item>
        <a-form-item label="群主" name="ownerId">
          <a-select
            v-model:value="formData.ownerId"
            placeholder="请选择群主"
            :options="memberOptions"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 群主收益配置弹窗 -->
    <a-modal
      v-model:open="configVisible"
      title="群主收益配置"
      @ok="handleConfigSave"
      :confirmLoading="configLoading"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item
          label="收益比例"
          extra="设置群主可获得的任务收益分成比例"
        >
          <a-input-number
            v-model:value="ownerCommissionRate"
            :min="0"
            :max="100"
            :precision="1"
            :step="0.1"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { get, post } from '@/utils/request'

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit, view
const formRef = ref()
const configVisible = ref(false)
const configLoading = ref(false)
const ownerCommissionRate = ref(10.0)

// 搜索表单
const searchForm = reactive({
  name: '',
  ownerId: undefined
})

// 表单数据
const formData = reactive({
  name: '',
  groupLink: '',
  ownerId: undefined
})

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入群名称' }],
  groupLink: [{ required: true, message: '请输入群链接' }],
  ownerId: [{ required: true, message: '请选择群主' }]
}

// 会员选项（群主）
const memberOptions = ref([
  // TODO: 从API获取会员列表
  { value: 1, label: '张三' },
  { value: 2, label: '李四' }
])

// 表格列配置
const columns = [
  {
    title: '群名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '群链接',
    dataIndex: 'groupLink',
    key: 'groupLink',
    ellipsis: true
  },
  {
    title: '群主',
    dataIndex: 'ownerName',
    key: 'ownerName'
  },
  {
    title: '会员人数',
    dataIndex: 'memberCount',
    key: 'memberCount',
    align: 'right'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '操作',
    key: 'action',
    width: 200
  }
]

// 表格数据
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: '添加群',
    edit: '编辑群'
  }
  return titles[modalType.value]
})

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    name: '',
    ownerId: undefined
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 添加群
const handleAdd = () => {
  modalType.value = 'add'
  formData.name = ''
  formData.groupLink = ''
  formData.ownerId = undefined
  modalVisible.value = true
}

// 编辑群
const handleEdit = (record) => {
  modalType.value = 'edit'
  formData.name = record.name
  formData.groupLink = record.groupLink
  formData.ownerId = record.ownerId
  modalVisible.value = true
}

// 删除群
const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    const res = await post('group.delete', { id: record.id }) 
    if(res.success){
      message.success('删除成功')
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('删除失败')
  }
}

const addGroup = async () => {
  const res = await post('group.add', formData)
  if(res.success){
    message.success('添加成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}
const editGroup = async () => {
  const res = await post('group.edit', formData)
  if(res.success){
    message.success('编辑成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}
// 确认弹窗
const handleModalOk = async () => {
  try {
    await formRef.value.validate()
    modalLoading.value = true
    // TODO: 实现保存逻辑
    switch(modalType.value){
      case 'add':
        await addGroup()
        break
      case 'edit':
        await editGroup()
        break
    }
  } catch (error) {
    console.error(error)
  } finally {
    modalLoading.value = false
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    const res = await get('group.list', {
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...searchForm
      }
    })
    if(res.success) {
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// 打开收益配置弹窗
const handleConfigCommission = async () => {
  configVisible.value = true
  await getOwnerCommissionConfig()
}

// 保存收益配置
const handleConfigSave = async () => {
  try {
    configLoading.value = true
    // TODO: 实现保存配置逻辑
    message.success('保存成功')
    configVisible.value = false
  } catch (error) {
    message.error('保存失败')
  } finally {
    configLoading.value = false
  }
}

// 获取群主收益配置
const getOwnerCommissionConfig = async () => {
  try {
    // TODO: 实现获取配置逻辑
    ownerCommissionRate.value = 10.0
  } catch (error) {
    message.error('获取配置失败')
  }
}

// 获取会员列表
const loadMemberOptions = async () => {
  try {
    // TODO: 实现获取会员列表逻辑
    // 这里暂时使用静态数据
    memberOptions.value = [
      { value: 1, label: '张三' },
      { value: 2, label: '李四' },
      { value: 3, label: '王五' },
      { value: 4, label: '赵六' }
    ]
  } catch (error) {
    message.error('获取会员列表失败')
  }
}

// 复制群链接
const copyLink = (link) => {
  navigator.clipboard.writeText(link)
    .then(() => {
      message.success('链接已复制到剪贴板')
    })
    .catch(() => {
      message.error('复制失败，请手动复制')
    })
}

// 初始化
onMounted(() => {
  loadData()
  loadMemberOptions()
})
</script>

<style lang="less" scoped>
.group {
  .table-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
  }

  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .left {
      flex: 1;
    }
  }

  .danger {
    color: #ff4d4f;
  }

  .group-link {
    color: #1890ff;
    text-decoration: underline;
  }

  .group-link-container {
    display: flex;
    align-items: center;

    .group-link {
      margin-right: 8px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .copy-btn {
      flex-shrink: 0;
      font-size: 12px;
      padding: 0 4px;
      height: 24px;
      color: rgba(0, 0, 0, 0.45);
      
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style> 