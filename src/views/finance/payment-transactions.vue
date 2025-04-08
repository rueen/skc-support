<!--
 * @Author: diaochan
 * @Date: 2025-04-08 15:34:09
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-08 16:48:17
 * @Description: 提现交易记录页面
-->
<template>
  <div class="payment-transactions content-container">
    <page-header
      title="提现交易记录"
      :back="true"
      style="margin-bottom: 32px;padding:0;"
    />
    
    <div class="table-container">
      <div class="table-header">
        <a-form layout="inline" :model="searchForm">
          <a-form-item label="交易状态">
            <a-select
              v-model:value="searchForm.transactionStatus"
              placeholder="请选择交易状态"
              style="width: 120px"
              allow-clear
            >
              <a-select-option value="pending">处理中</a-select-option>
              <a-select-option value="success">成功</a-select-option>
              <a-select-option value="failed">失败</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="订单号">
            <a-input
              v-model:value="searchForm.orderId"
              placeholder="请输入订单号"
              allow-clear
            />
          </a-form-item>
          <a-form-item label="提现ID">
            <a-input
              v-model:value="searchForm.withdrawalId"
              placeholder="请输入提现ID"
              allow-clear
            />
          </a-form-item>
          <a-form-item label="交易时间">
            <a-range-picker
              v-model:value="searchForm.timeRange"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm:ss"
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

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        rowKey="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'transactionStatus'">
            <a-tag :color="getStatusColor(record.transactionStatus)">
              {{ getStatusText(record.transactionStatus) }}
            </a-tag>
            <a-button type="link" size="small" @click="showErrorInfo(record)">查看</a-button>
          </template>
          <template v-if="column.key === 'amount'">
            {{ formatAmount(record.amount) }}
          </template>
          <template v-if="column.key === 'requestParams'">
            <a-button type="link" size="small" @click="showJsonData(record.requestParams)">查看</a-button>
          </template>
          <template v-if="column.key === 'responseData'">
            <a-button type="link" size="small" @click="showJsonData(record.responseData)">查看</a-button>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleRetry(record)">重试</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- JSON数据查看弹窗 -->
    <a-modal
      v-model:open="jsonModalVisible"
      title="数据详情"
      width="800px"
      :footer="null"
    >
      <a-typography>
        <pre>{{ prettyJson }}</pre>
      </a-typography>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message, Modal } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { get, post } from '@/utils/request'
import { useRoute } from 'vue-router'

const route = useRoute()

// 加载状态
const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  transactionStatus: undefined,
  memberId: '',
  orderId: '',
  withdrawalId: route.query.withdrawalId,
  timeRange: []
})

// JSON详情弹窗
const jsonModalVisible = ref(false)
const jsonData = ref({})
const prettyJson = ref('')

// 表格列配置
const columns = [
  {
    title: '订单号',
    dataIndex: 'orderId',
    key: 'orderId'
  },
  {
    title: '提现ID',
    dataIndex: 'withdrawalId',
    key: 'withdrawalId'
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  },
  {
    title: '账户',
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: '请求参数',
    key: 'requestParams',
    align: 'center'
  },
  {
    title: '响应数据',
    key: 'responseData',
    align: 'center'
  },
  {
    title: '状态',
    key: 'transactionStatus',
    align: 'center'
  },
  {
    title: '请求时间',
    dataIndex: 'requestTime',
    key: 'requestTime',
  },
  {
    title: '响应时间',
    dataIndex: 'responseTime',
    key: 'responseTime',
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    align: 'center'
  }
]

// 表格数据
const tableData = ref([])

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true
})

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    pending: '处理中',
    success: '成功',
    failed: '失败'
  }
  return statusMap[status] || status
}

// 获取状态标签颜色
const getStatusColor = (status) => {
  const colorMap = {
    pending: 'blue',
    success: 'green',
    failed: 'red'
  }
  return colorMap[status] || 'default'
}

// 格式化金额
const formatAmount = (amount) => {
  if (!amount && amount !== 0) return '--'
  return `¥ ${Number(amount).toFixed(2)}`
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    transactionStatus: undefined,
    memberId: '',
    orderId: '',
    withdrawalId: '',
    timeRange: []
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  
  loadData()
}

// 显示JSON数据
const showJsonData = (data) => {
  jsonData.value = data
  prettyJson.value = JSON.stringify(data, null, 2)
  jsonModalVisible.value = true
}

// 显示错误信息
const showErrorInfo = (record) => {
  Modal.info({
    title: '错误信息',
    content: record.errorMessage
  })
}

// 重试
const handleRetry = async (record) => {
  try {
    const res = await post('withdrawals.retry', {}, {
      urlParams: {
        orderId: record.orderId
      }
    })
    loadData()
  } catch (error) {
    console.error('重试失败:', error)
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      transactionStatus: searchForm.transactionStatus,
      memberId: searchForm.memberId,
      orderId: searchForm.orderId,
      withdrawalId: searchForm.withdrawalId,
      startDate: searchForm.timeRange?.[0],
      endDate: searchForm.timeRange?.[1]
    }
    
    const res = await get('withdrawals.paymentTransactions', params)
    if (res.code === 0) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    message.error('加载数据失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="less" scoped>
.payment-transactions {
  .table-header {
    margin-bottom: 16px;
  }
  
  :deep(.ant-typography pre) {
    max-height: 500px;
    overflow: auto;
    background-color: #f5f5f5;
    padding: 12px;
    border-radius: 4px;
  }
}
</style>
