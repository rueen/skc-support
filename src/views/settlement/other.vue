<template>
  <div class="other-list">
    <a-empty description="开发中..." />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue'

const loading = ref(false)
const detailModalVisible = ref(false)
const currentRecord = ref({})

// 查询参数
const queryParams = reactive({
  memberName: '',
  type: undefined,
  dateRange: []
})

// 表格数据
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 账单类型选项
const billTypeOptions = [
  { label: '任务收入', value: 'task_income' },
  { label: '任务支出', value: 'task_expense' },
  { label: '奖励收入', value: 'reward_income' },
  { label: '其他收入', value: 'other_income' },
  { label: '其他支出', value: 'other_expense' }
]

// 表格列定义
const columns = [
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName'
  },
  {
    title: '账单金额',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '账单类型',
    dataIndex: 'billType',
    key: 'billType',
    customRender: ({ text }) => getBillTypeText(text)
  },
  {
    title: '关联任务',
    dataIndex: 'taskName',
    key: 'taskName',
    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 100
  }
]

// 获取账单类型文本
const getBillTypeText = (type) => {
  const option = billTypeOptions.find(item => item.value === type)
  return option ? option.label : ''
}

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    memberName: '',
    type: undefined,
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

const handleExport = () => {
  // TODO: 实现导出逻辑
}
</script>

<style lang="less" scoped>
.other-bill {
  .table-operations {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .income {
    color: #52c41a;
  }
  
  .expense {
    color: #ff4d4f;
  }
}
</style> 