<template>
  <div class="withdrawal content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="会员昵称">
              <a-input
                v-model:value="searchForm.memberNickname"
                placeholder="请输入会员昵称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="提现状态">
              <a-select
                v-model:value="searchForm.withdrawalStatus"
                placeholder="请选择状态"
                style="width: 120px"
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
            <a-form-item label="申请时间">
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
        <div class="right">
          <a-space>
            <a-button @click="handleExport">
              <template #icon><download-outlined /></template>
              导出
            </a-button>
            <a-button type="primary" @click="handleBatchResolve">批量已打款</a-button>
            <a-button danger @click="handleBatchReject">批量打款失败</a-button>
          </a-space>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        rowKey="id"
        :row-selection="{ selectedRowKeys: selectedKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'withdrawal_status'">
            {{ enumStore.getEnumText('WithdrawalStatus', record.withdrawal_status) }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-popconfirm
                title="确定要标记为已打款吗？"
                @confirm="handleResolve(record)"
              >
                <a>已打款</a>
              </a-popconfirm>
              <a class="danger" @click="handleReject(record)">打款失败</a>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 打款失败原因弹窗 -->
    <a-modal
      v-model:open="failedVisible"
      title="打款失败原因"
      @ok="handleRejectConfirm"
      :confirmLoading="failedLoading"
    >
      <a-textarea
        v-model:value="rejectReason"
        placeholder="请输入打款失败原因"
        :rows="4"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { get, post } from '@/utils/request'
import { downloadByApi } from '@/utils/download'
import { useEnumStore } from '@/stores'

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

const loading = ref(false)
const selectedKeys = ref([])
const failedVisible = ref(false)
const failedLoading = ref(false)
const rejectReason = ref('')

// 搜索表单
const searchForm = reactive({
  memberNickname: '',
  withdrawalStatus: 'pending',
  timeRange: []
})

// 表格列配置
const columns = [
  {
    title: '会员昵称',
    dataIndex: 'member_nickname',
    key: 'member_nickname'
  },
  {
    title: '提现账户',
    dataIndex: 'memberAccount',
    key: 'memberAccount'
  },
  {
    title: '账户类型',
    dataIndex: 'memberAccountType',
    key: 'memberAccountType'
  },
  {
    title: '申请提现金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    key: 'applyTime'
  },
  {
    title: '提现状态',
    key: 'withdrawal_status'
  },
  {
    title: '操作',
    key: 'action',
    width: 150
  }
]

// 表格数据
const tableData = ref([])

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
    memberNickname: '',
    withdrawalStatus: undefined,
    timeRange: []
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 选择行变化
const onSelectChange = (keys) => {
  selectedKeys.value = keys
}

// 导出
const handleExport = () => {
  Modal.confirm({
    title: '确认导出',
    content: '确定要导出当前筛选条件下的所有任务数据吗？',
    onOk: async () => {
      // 显示加载中提示
      const loadingMessage = message.loading('正在导出数据，请稍候...', 0)
        
      // 构建导出参数，使用当前的筛选条件
      const params = {
        ...searchForm
      }
      
      try {
        // 调用下载API
        await downloadByApi('withdrawals.export', params, `提现列表_${new Date().toLocaleDateString()}.xlsx`)
        // 显示成功提示
        message.success('导出成功')
      } catch (error) {
        console.error('导出失败:', error)
        message.error('导出失败，请稍后重试')
      } finally {
        // 关闭加载提示
        loadingMessage()
      }
    }
  })
}

// 标记已打款
const handleResolve = async (record) => {
  selectedKeys.value = [record.id]
  handleBatchResolve()
}

// 批量标记已打款
const handleBatchResolve = async () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要操作的记录')
    return
  }
  const res = await post('withdrawals.batchResolve', {
    ids: selectedKeys.value
  })
  if(res.code === 0) {
    message.success('操作成功')
    selectedKeys.value = []
    loadData()
  } else {
    message.error(res.message)
  }
}

// 打款失败
const handleReject = (record) => {
  selectedKeys.value = [record.id]
  rejectReason.value = ''
  failedVisible.value = true
}

// 批量打款失败
const handleBatchReject = () => {
  if (!selectedKeys.value.length) {
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
  const res = await post('withdrawals.batchReject', {
    rejectReason: rejectReason.value,
    ids: selectedKeys.value
  })
  if(res.code === 0) {
    message.success('操作成功')
    failedVisible.value = false
    selectedKeys.value = []
    loadData()
  } else {
    message.error(res.message)
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      memberNickname: searchForm.memberNickname,
      withdrawalStatus: searchForm.withdrawalStatus,
      startTime: searchForm.timeRange?.[0],
      endTime: searchForm.timeRange?.[1]
    }
    const res = await get('withdrawals.list', { 
      ...params
     })
    if(res.code === 0){
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    } else {
      message.error(res.message)
    }
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
.withdrawal {
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