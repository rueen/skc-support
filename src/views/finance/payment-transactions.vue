<!--
 * @Author: diaochan
 * @Date: 2025-04-08 15:34:09
 * @LastEditors: diaochan
 * @LastEditTime: 2025-07-23 17:39:26
 * @Description: 提现交易记录页面
-->
<template>
  <div class="content-container">
    <page-header
      :title="$t('withdrawal.transactions.pageTitle')"
      :back="true"
    />
    
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('withdrawal.transactions.transactionStatus')">
              <a-select
                v-model:value="searchForm.transactionStatus"
                :placeholder="$t('withdrawal.transactions.transactionStatusPlaceholder')"
                allow-clear
              >
                <a-select-option value="pending">{{ $t('withdrawal.transactions.pending') }}</a-select-option>
                <a-select-option value="success">{{ $t('withdrawal.transactions.success') }}</a-select-option>
                <a-select-option value="failed">{{ $t('withdrawal.transactions.failed') }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('withdrawal.transactions.orderId')">
              <a-input
                v-model:value="searchForm.orderId"
                :placeholder="$t('withdrawal.transactions.orderIdPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('withdrawal.transactions.withdrawalId')">
              <a-input
                v-model:value="searchForm.withdrawalId"
                :placeholder="$t('withdrawal.transactions.withdrawalIdPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('withdrawal.transactions.transactionTime')">
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
            <a-button type="link" size="small" @click="showErrorInfo(record)" v-if="record.errorMessage">{{ $t('withdrawal.transactions.view') }}</a-button>
          </template>
          <template v-if="column.key === 'amount'">
            {{ formatAmount(record.amount) }}
          </template>
          <template v-if="column.key === 'requestParams'">
            <a-button type="link" size="small" @click="showJsonData(record.requestParams)">{{ $t('withdrawal.transactions.view') }}</a-button>
          </template>
          <template v-if="column.key === 'responseData'">
            <a-button type="link" size="small" @click="showJsonData(record.responseData)">{{ $t('withdrawal.transactions.view') }}</a-button>
          </template>
        </template>
      </a-table>
    </div>

    <!-- JSON数据查看弹窗 -->
    <a-modal
      v-model:open="jsonModalVisible"
      :title="$t('withdrawal.transactions.dataDetails')"
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
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { get, post } from '@/utils/request'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
const columns = computed(() => [
  {
    title: t('withdrawal.transactions.orderId'),
    dataIndex: 'orderId',
    key: 'orderId'
  },
  {
    title: t('withdrawal.transactions.withdrawalId'),
    dataIndex: 'withdrawalId',
    key: 'withdrawalId'
  },
  {
    title: t('withdrawal.transactions.amount'),
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  },
  {
    title: t('withdrawal.transactions.account'),
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: t('withdrawal.transactions.requestParams'),
    key: 'requestParams',
    align: 'center'
  },
  {
    title: t('withdrawal.transactions.responseData'),
    key: 'responseData',
    align: 'center'
  },
  {
    title: t('withdrawal.transactions.transactionStatus'),
    key: 'transactionStatus',
    align: 'center'
  },
  {
    title: t('withdrawal.transactions.requestTime'),
    dataIndex: 'requestTime',
    key: 'requestTime',
  },
  {
    title: t('withdrawal.transactions.responseTime'),
    dataIndex: 'responseTime',
    key: 'responseTime',
  }
])

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
    pending: t('withdrawal.transactions.pending'),
    success: t('withdrawal.transactions.success'),
    failed: t('withdrawal.transactions.failed')
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
    title: t('withdrawal.transactions.errorInfo'),
    content: record.errorMessage
  })
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
    message.error(t('withdrawal.transactions.loadDataFailed'))
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

</style>
