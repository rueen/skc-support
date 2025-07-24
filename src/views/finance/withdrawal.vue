<template>
  <div class="withdrawal content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('withdrawal.list.billNo')">
              <a-input
                v-model:value="searchForm.billNo"
                :placeholder="$t('withdrawal.list.billNoPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('withdrawal.list.memberNickname')">
              <a-input
                v-model:value="searchForm.memberNickname"
                :placeholder="$t('withdrawal.list.memberNicknamePlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('withdrawal.list.withdrawalStatus')">
              <a-select
                v-model:value="searchForm.withdrawalStatus"
                :placeholder="$t('withdrawal.list.withdrawalStatusPlaceholder')"
                allow-clear
              >
                <a-select-option
                  v-for="option in withdrawalStatusOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('withdrawal.list.accountType')">
              <a-select
                v-model:value="searchForm.paymentChannelId"
                :placeholder="$t('common.selectPlaceholder')"
                allow-clear
              >
                <a-select-option
                  v-for="option in paymentChannelOptions"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('withdrawal.list.applyTime')">
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
                <a-typography-link class="mobile-only" @click="router.push('/payment-transactions')">
                  {{ $t('withdrawal.list.viewWithdrawalTransactions') }}<RightOutlined />
                </a-typography-link>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-space>
            <a-typography-link class="desktop-only" @click="router.push('/payment-transactions')">
              {{ $t('withdrawal.list.viewWithdrawalTransactions') }}<RightOutlined />
            </a-typography-link>
            <a-button @click="handleExport">
              <template #icon><download-outlined /></template>
              {{ $t('withdrawal.list.export') }}
            </a-button>
            <a-button type="primary" @click="handleBatchResolve">{{$t('withdrawal.list.batchResolve')}}</a-button>
            <a-button danger @click="handleBatchReject">{{$t('withdrawal.list.batchReject')}}</a-button>
          </a-space>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        rowKey="id"
        :row-selection="rowSelection"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'nickname'">
            <a-typography-link @click="handleMemberDetail(record)">{{ record.nickname }}</a-typography-link>
          </template>
          <template v-if="column.key === 'withdrawalStatus'">
            {{ enumStore.getEnumText('WithdrawalStatus', record.withdrawalStatus) }}
            <info-circle-outlined 
              v-if="record.withdrawalStatus === 'failed'" 
              class="danger" 
              @click="showFailReason(record)"
            />
          </template>
          <template v-if="column.key === 'waiterName'">
            {{ record.waiterName || '--' }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space v-if="record.withdrawalStatus === 'pending'">
              <a-popconfirm
                :title="$t('withdrawal.list.resolveConfirm')"
                @confirm="handleResolve(record)"
              >
                <a>{{ $t('withdrawal.list.resolve') }}</a>
              </a-popconfirm>
              <a><a-typography-text type="danger" @click="handleReject(record)">{{ $t('withdrawal.list.reject') }}</a-typography-text></a>
            </a-space>
            <a @click="router.push(`/payment-transactions?withdrawalId=${record.id}`)" v-if="record.withdrawalStatus === 'failed'">查看交易记录</a>
          </template>
        </template>
      </a-table>

      <div class="count-container" v-if="pagination.total">
        <a-descriptions :column="2">
          <a-descriptions-item :label="$t('common.totalCount')">
            {{ pagination.total }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('common.totalAmount')">
            {{ totalAmount }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>

    <!-- 打款失败原因弹窗 -->
    <a-modal
      v-model:open="failedVisible"
      :title="$t('withdrawal.list.rejectTitle')"
      @ok="handleRejectConfirm"
      :confirmLoading="failedLoading"
    >
      <a-textarea
        v-model:value="rejectReason"
        :placeholder="$t('withdrawal.list.rejectPlaceholder')"
        :rows="4"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { get, post } from '@/utils/request'
import { downloadByApi } from '@/utils/download'
import { useEnumStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const enumStore = useEnumStore()

// 计算提现状态选项
const withdrawalStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }

  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('WithdrawalStatus')
})

const paymentChannelOptions = ref([]);

const loading = ref(false)
const failedVisible = ref(false)
const failedLoading = ref(false)
const rejectReason = ref('')

// 搜索表单
const searchForm = reactive({
  billNo: '',
  memberNickname: '',
  withdrawalStatus: 'pending',
  paymentChannelId: null,
  timeRange: []
})

// 表格列配置
const columns = computed(() => [
  {
    title: t('withdrawal.list.billNo'),
    dataIndex: 'billNo',
    key: 'billNo'
  },
  {
    title: t('withdrawal.list.memberNickname'),
    key: 'nickname'
  },
  {
    title: t('withdrawal.list.withdrawalAccount'),
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: t('withdrawal.list.accountType'),
    dataIndex: 'paymentChannelName',
    key: 'paymentChannelName'
  },
  {
    title: t('withdrawal.list.applyWithdrawalAmount'),
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  },
  {
    title: t('withdrawal.list.name'),
    dataIndex: 'withdrawalName',
    key: 'withdrawalName'
  },
  {
    title: t('withdrawal.list.applyTime'),
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: t('withdrawal.list.withdrawalStatus'),
    key: 'withdrawalStatus'
  },
  {
    title: t('withdrawal.list.operator'),
    key: 'waiterName'
  },
  {
    title: t('withdrawal.list.action'),
    key: 'action',
    width: 150
  }
])
const selectedRowKeys = ref([])
// 表格选择配置
const rowSelection = {
  selectedRowKeys,
  onChange: (keys) => {
    selectedRowKeys.value = keys
  },
  getCheckboxProps: (record) => ({
    disabled: record.withdrawalStatus !== 'pending'
  })
}

// 表格数据
const tableData = ref([])
const totalAmount = ref(0)

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    billNo: '',
    memberNickname: '',
    withdrawalStatus: undefined,
    paymentChannelId: null,
    timeRange: []
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 导出
const handleExport = () => {
  Modal.confirm({
    title: t('common.export'),
    content: t('common.confirmExportContent'),
    onOk: async () => {
      // 显示加载中提示
      const loadingMessage = message.loading('正在导出数据，请稍候...', 0)
        
      // 构建导出参数，使用当前的筛选条件
      const params = {
        billNo: searchForm.billNo,
        memberNickname: searchForm.memberNickname,
        withdrawalStatus: searchForm.withdrawalStatus,
        paymentChannelId: searchForm.paymentChannelId,
        startTime: searchForm.timeRange?.[0],
        endTime: searchForm.timeRange?.[1]
      }
      
      try {
        // 调用下载API
        await downloadByApi('withdrawals.export', params, `提现列表_${new Date().toLocaleDateString()}.xlsx`)
        // 显示成功提示
        message.success(t('common.exportSuccess'))
      } catch (error) {
        console.error('导出失败:', error)
        message.error(t('common.exportFailed'))
      } finally {
        // 关闭加载提示
        loadingMessage()
      }
    }
  })
}

// 会员详情
const handleMemberDetail = (record) => {
  router.push(`/member/view/${record.memberId}`)
}

// 显示失败原因
const showFailReason = (record) => {
  Modal.error({
    content: record.rejectReason,
  });
}

// 标记已打款
const handleResolve = async (record) => {
  selectedRowKeys.value = [record.id]
  handleBatchResolve()
}

// 批量标记已打款
const handleBatchResolve = async () => {
  if (!selectedRowKeys.value.length) {
    message.warning('请选择要操作的记录')
    return
  }
  const res = await post('withdrawals.batchResolve', {
    ids: selectedRowKeys.value
  })
  if(res.code === 0) {
    message.success('操作成功')
    selectedRowKeys.value = []
    loadData()
  } else {
    message.error(res.message)
  }
}

// 打款失败
const handleReject = (record) => {
  selectedRowKeys.value = [record.id]
  rejectReason.value = ''
  failedVisible.value = true
}

// 批量打款失败
const handleBatchReject = () => {
  if (!selectedRowKeys.value.length) {
    message.warning('请选择要操作的记录')
    return
  }
  rejectReason.value = ''
  failedVisible.value = true
}

// 确认打款失败
const handleRejectConfirm = async () => {
  if (!rejectReason.value) {
    message.error('请输入打款失败原因')
    return
  }

  failedLoading.value = true
  try {
    await post('withdrawals.batchReject', {
      rejectReason: rejectReason.value,
      ids: selectedRowKeys.value
    })
    
    message.success('操作成功')
    failedVisible.value = false
    selectedRowKeys.value = []
    loadData()
  } catch (error) {
    message.error(error.message)
  } finally {
    failedLoading.value = false
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      billNo: searchForm.billNo,
      memberNickname: searchForm.memberNickname,
      withdrawalStatus: searchForm.withdrawalStatus,
      paymentChannelId: searchForm.paymentChannelId,
      startTime: searchForm.timeRange?.[0],
      endTime: searchForm.timeRange?.[1]
    }
    const res = await get('withdrawals.list', { 
      ...params
     })
    if(res.code === 0){
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
      totalAmount.value = res.data.totalAmount
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// 加载支付渠道
const loadPaymentChannel = async () => {
  if(paymentChannelOptions.value.length) return
  try {
    const res = await get('paymentChannels.list')
    if(res.code === 0){
      paymentChannelOptions.value = res.data;
    }
  } catch (error) {
    console.error(error)
  }
}

// 初始化
onMounted(() => {
  loadData()
  loadPaymentChannel()
})
</script>

<style lang="less" scoped>
.count-container{
  margin-top: -48px;
  width: 250px;
}
</style> 