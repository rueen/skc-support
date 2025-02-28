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
            <a-form-item label="群ID">
              <a-input
                v-model:value="searchForm.groupId"
                placeholder="请输入群ID"
                allow-clear
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
          <a-button type="primary" @click="handleAdd">
            添加群
          </a-button>
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
              <a @click="handleView(record)">查看</a>
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除该群吗？"
                @confirm="handleDelete(record)"
              >
                <a class="danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 添加/编辑/查看群弹窗 -->
    <a-modal
      v-model:visible="modalVisible"
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
            :disabled="modalType === 'view'"
          />
        </a-form-item>
        <a-form-item label="群ID" name="groupId">
          <a-input
            v-model:value="formData.groupId"
            placeholder="请输入群ID"
            :disabled="modalType === 'view'"
          />
        </a-form-item>
        <a-form-item label="群主" name="ownerId">
          <a-select
            v-model:value="formData.ownerId"
            placeholder="请选择群主"
            :disabled="modalType === 'view'"
            :options="memberOptions"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit, view
const formRef = ref()

// 搜索表单
const searchForm = reactive({
  name: '',
  groupId: ''
})

// 表单数据
const formData = reactive({
  name: '',
  groupId: '',
  ownerId: undefined
})

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入群名称' }],
  groupId: [{ required: true, message: '请输入群ID' }],
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
    title: '群ID',
    dataIndex: 'groupId',
    key: 'groupId'
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
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'action',
    width: 200
  }
]

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: '测试群1',
    groupId: 'group001',
    ownerId: 1,
    ownerName: '张三',
    memberCount: 100,
    createTime: '2024-02-28 10:00:00'
  },
  {
    id: 2,
    name: '测试群2',
    groupId: 'group002',
    ownerId: 2,
    ownerName: '李四',
    memberCount: 50,
    createTime: '2024-02-28 11:00:00'
  }
])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: '添加群',
    edit: '编辑群',
    view: '查看群'
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
    groupId: ''
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
  formData.groupId = ''
  formData.ownerId = undefined
  modalVisible.value = true
}

// 编辑群
const handleEdit = (record) => {
  modalType.value = 'edit'
  formData.name = record.name
  formData.groupId = record.groupId
  formData.ownerId = record.ownerId
  modalVisible.value = true
}

// 查看群
const handleView = (record) => {
  modalType.value = 'view'
  formData.name = record.name
  formData.groupId = record.groupId
  formData.ownerId = record.ownerId
  modalVisible.value = true
}

// 删除群
const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    message.success('删除成功')
    loadData()
  } catch (error) {
    message.error('删除失败')
  }
}

// 确认弹窗
const handleModalOk = async () => {
  if (modalType.value === 'view') {
    modalVisible.value = false
    return
  }

  try {
    await formRef.value.validate()
    modalLoading.value = true
    // TODO: 实现保存逻辑
    message.success(modalType.value === 'add' ? '添加成功' : '编辑成功')
    modalVisible.value = false
    loadData()
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
    pagination.total = tableData.value.length
  } finally {
    loading.value = false
  }
}

// 初始化
loadData()
</script>

<style lang="less" scoped>
.group {
  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .danger {
    color: #ff4d4f;
  }
}
</style> 