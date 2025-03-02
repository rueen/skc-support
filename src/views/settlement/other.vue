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
            <a-form-item label="账单类型">
              <a-select
                v-model:value="searchForm.billType"
                placeholder="请选择账单类型"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="type in Object.values(BillType)"
                  :key="type"
                  :value="type"
                >
                  {{ getBillTypeText(type) }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="结算状态">
              <a-select
                v-model:value="searchForm.status"
                placeholder="请选择结算状态"
                style="width: 120px"
                allow-clear
              >
                <a-select-option value="settled">已结算</a-select-option>
                <a-select-option value="failed">结算失败</a-select-option>
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
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'billType'">
            {{ getBillTypeText(record.billType) }}
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">
              {{ getStatusText(record.status) }}
            </a-tag>
            <a-tooltip v-if="record.status === 'failed'">
              <template #title>{{ record.failReason }}</template>
              <info-circle-outlined style="margin-left: 4px" />
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { BillType, BillTypeLang, getLangText } from '@/constants/enums'

const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  memberName: '',
  billType: undefined,
  status: undefined
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
    dataIndex: 'billType',
    key: 'billType'
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
    title: '结算状态',
    dataIndex: 'status',
    key: 'status'
  }
]

// 表格数据
const tableData = ref([
  {
    id: 1,
    memberName: '张三',
    billType: BillType.TASK_INCOME,
    amount: 100.00,
    createTime: '2024-02-28 10:00:00',
    status: 'settled'
  },
  {
    id: 2,
    memberName: '李四',
    billType: BillType.TASK_INCOME,
    amount: 200.00,
    createTime: '2024-02-28 11:00:00',
    status: 'failed',
    failReason: '账户信息有误'
  }
])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 获取账单类型文本
const getBillTypeText = (type) => {
  return getLangText(BillTypeLang, type)
}

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    settled: '已结算',
    failed: '结算失败'
  }
  return map[status] || status
}

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    settled: 'success',
    failed: 'error'
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
  Object.assign(searchForm, {
    memberName: '',
    billType: undefined,
    status: undefined
  })
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