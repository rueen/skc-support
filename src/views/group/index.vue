<template>
  <div class="group content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="群名称">
              <a-input
                v-model:value="searchForm.groupName"
                placeholder="请输入群名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="群主">
              <a-select
                v-model:value="searchForm.ownerId"
                placeholder="请选择群主"
                allow-clear
                show-search
                :filter-option="false"
                @search="loadMemberOptions"
                style="width: 200px"
              >
                <a-select-option v-for="item in memberOptions" :key="item.id" :value="item.id">
                  {{ item.memberNickname }}
                </a-select-option>
              </a-select>
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
          <template v-if="column.key === 'memberCount'">
            {{ record.memberCount }}
            <a-typography-link @click="handleViewMember(record)">查看</a-typography-link>
          </template>
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
            <div class="link-text-container">
              <a :href="record.groupLink" target="_blank" class="link-text">{{ record.groupLink }}</a>
              <a-button type="link" size="small" @click="handleCopy(record.groupLink)">
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
        <a-form-item label="群名称" name="groupName">
          <a-input
            v-model:value="formData.groupName"
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
            allow-clear
            show-search
            :filter-option="false"
            @search="loadMemberOptions"
          >
            <a-select-option v-for="item in memberOptions" :key="item.id" :value="item.id">
              {{ item.nickname }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { get, post, put, del } from '@/utils/request'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit, view
const formRef = ref()

// 搜索表单
const searchForm = reactive({
  groupName: '',
  ownerId: undefined
})

// 表单数据
const formData = reactive({
  groupName: '',
  groupLink: '',
  ownerId: undefined
})
const currentId = ref(undefined)

// 表单校验规则
const rules = {
  groupName: [{ required: true, message: '请输入群名称' }],
  groupLink: [{ required: true, message: '请输入群链接' }]
}

// 会员选项（群主）
const memberOptions = ref([])

// 表格列配置
const columns = [
  {
    title: '群名称',
    dataIndex: 'groupName',
    key: 'groupName'
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
    title: '成员人数',
    key: 'memberCount',
    align: 'right'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
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
  formData.groupName = ''
  formData.groupLink = ''
  formData.ownerId = undefined
  modalVisible.value = true
}

const handleViewMember = (record) => {
  router.push(`/member?groupId=${record.id}`)
}

// 编辑群
const handleEdit = (record) => {
  currentId.value = record.id
  modalType.value = 'edit'
  formData.groupName = record.groupName
  formData.groupLink = record.groupLink
  formData.ownerId = record.ownerId
  modalVisible.value = true
}

// 删除群
const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    const res = await del('group.delete', { id: record.id }, {
      urlParams: {
        id: record.id
      }
    }) 
    if(res.code === 0){
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
  if(res.code === 0){
    message.success('添加成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}
const editGroup = async () => {
  const res = await put('group.edit', formData, {
    urlParams: {
      id: currentId.value
    }
  })
  if(res.code === 0){
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
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm
    })
    if(res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// 获取会员列表
const loadMemberOptions = async (keyword = '') => {
  try {
    // TODO: 实现获取会员列表逻辑
    const res = await get('member.list', {
      page: 1,
      pageSize: 50,
      memberNickname: keyword
    })  
    if(res.code === 0){
      memberOptions.value = res.data.list || []
    }
  } catch (error) {
    message.error('获取会员列表失败')
  }
}

// 复制群链接
const handleCopy = (link) => {
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
}
</style> 