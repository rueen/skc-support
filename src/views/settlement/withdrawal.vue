<template>
  <div class="withdrawal-list">
    <a-empty description="开发中..." />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const detailModalVisible = ref(false)
const rejectModalVisible = ref(false)
const currentRecord = ref({})

// 查询参数
const queryParams = reactive({
  memberName: '',
  status: undefined,
  dateRange: []
})

// 表格数据
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 拒绝表单
const rejectForm = reactive({
  reason: ''
})

// 状态选项
const statusOptions = [
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已拒绝', value: 'rejected' },
  { label: '已打款', value: 'paid' }
]

// 表格列定义
const columns = [
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName'
  },
  {
    title: '提现金额',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '提现账户',
    dataIndex: 'accountInfo',
    key: 'accountInfo',
    ellipsis: true
  },
  {
    title: '提现状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200
  }
]

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    pending: 'warning',
    approved: 'processing',
    rejected: 'error',
    paid: 'success'
  }
  return map[status]
}

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
    paid: '已打款'
  }
  return map[status]
}

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    memberName: '',
    status: undefined,
    dateRange: []
  })
  handleQuery()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleQuery()
}

const handleView = (record) => {
  currentRecord.value = record
  detailModalVisible.value = true
}

const handleApprove = async (record) => {
  try {
    // TODO: 实现审核通过逻辑
    message.success('审核通过成功')
    handleQuery()
  } catch (error) {
    message.error('审核通过失败')
  }
}

const handleReject = (record) => {
  currentRecord.value = record
  rejectModalVisible.value = true
}

const handleRejectConfirm = async () => {
  if (!rejectForm.reason) {
    message.error('请输入拒绝原因')
    return
  }
  
  try {
    // TODO: 实现审核拒绝逻辑
    message.success('审核拒绝成功')
    rejectModalVisible.value = false
    rejectForm.reason = ''
    handleQuery()
  } catch (error) {
    message.error('审核拒绝失败')
  }
}

const handleExport = () => {
  // TODO: 实现导出逻辑
}
</script>

<style lang="less" scoped>
.withdrawal-bill {
  .table-operations {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style> 