<template>
  <div class="group-list">
    <!-- 暂时显示开发中提示 -->
    <a-empty description="开发中..." />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const formRef = ref()

// 查询参数
const queryParams = reactive({
  name: '',
  ownerName: '',
  status: undefined
})

// 表格数据
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 表单数据
const formState = reactive({
  name: '',
  ownerId: undefined,
  remark: ''
})

// 表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入群名称' }
  ],
  ownerId: [
    { required: true, message: '请选择群主' }
  ]
}

// 状态选项
const statusOptions = [
  { label: '正常', value: 'normal' },
  { label: '已解散', value: 'dismissed' }
]

// 表格列定义
const columns = [
  {
    title: '群名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '群主',
    dataIndex: 'ownerName',
    key: 'ownerName'
  },
  {
    title: '成员数',
    dataIndex: 'memberCount',
    key: 'memberCount',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150
  }
]

// 计算属性
const modalTitle = computed(() => isEdit.value ? '编辑群组' : '添加群组')

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    normal: 'success',
    dismissed: 'default'
  }
  return map[status]
}

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    normal: '正常',
    dismissed: '已解散'
  }
  return map[status]
}

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    name: '',
    ownerName: '',
    status: undefined
  })
  handleQuery()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleQuery()
}

const resetForm = () => {
  formRef.value?.resetFields()
  Object.assign(formState, {
    name: '',
    ownerId: undefined,
    remark: ''
  })
}

const handleAdd = () => {
  isEdit.value = false
  resetForm()
  modalVisible.value = true
}

const handleEdit = (record) => {
  isEdit.value = true
  resetForm()
  Object.assign(formState, record)
  modalVisible.value = true
}

const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    message.success('删除成功')
    handleQuery()
  } catch (error) {
    message.error('删除失败')
  }
}

const handleModalOk = () => {
  formRef.value.validate().then(async () => {
    try {
      modalLoading.value = true
      // TODO: 实现提交逻辑
      message.success('提交成功')
      modalVisible.value = false
      handleQuery()
    } catch (error) {
      message.error('提交失败')
    } finally {
      modalLoading.value = false
    }
  })
}

// 群主选择器相关
const memberLoading = ref(false)
const memberOptions = ref([])

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script>

<style lang="less" scoped>
.group-management {
  .table-operations {
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