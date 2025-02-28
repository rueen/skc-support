<template>
  <div class="other-bill content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="会员名称">
              <a-input
                v-model:value="searchForm.memberName"
                placeholder="请输入会员名称"
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
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ getStatusText(record.status) }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  memberName: ''
})

// 表格列配置
const columns = [
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName'
  },
  {
    title: '账单类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '关联任务',
    dataIndex: 'taskName',
    key: 'taskName'
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
]

// 表格数据
const tableData = ref([
  {
    id: 1,
    memberName: '张三',
    type: '任务收入',
    taskName: '测试任务1',
    amount: 100.00,
    createTime: '2024-02-28 10:00:00',
    status: 'completed'
  },
  {
    id: 2,
    memberName: '李四',
    type: '任务收入',
    taskName: '测试任务2',
    amount: 200.00,
    createTime: '2024-02-28 11:00:00',
    status: 'completed'
  }
])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    completed: '已完成',
    pending: '处理中'
  }
  return map[status] || status
}

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    completed: 'success',
    pending: 'warning'
  }
  return map[status]
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.memberName = ''
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
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
.other-bill {
  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style> 