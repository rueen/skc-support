<template>
  <div class="withdrawal content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="会员名称">
              <a-input
                v-model:value="searchForm.memberNickname"
                placeholder="请输入会员名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="提现状态">
              <a-select
                v-model:value="searchForm.status"
                placeholder="请选择状态"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="status in Object.values(WithdrawalStatus)"
                  :key="status"
                  :value="status"
                >
                  {{ getWithdrawalStatusText(status) }}
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
            <a-button type="primary" @click="handleExport">
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
        :row-selection="{ selectedRowKeys: selectedKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="WithdrawalStatusColor[record.status]">
              {{ getWithdrawalStatusText(record.status) }}
            </a-tag>
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
        v-model:value="failedReason"
        placeholder="请输入打款失败原因"
        :rows="4"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { WithdrawalStatus, WithdrawalStatusLang, WithdrawalStatusColor } from '@/constants/enums'
import { get, post } from '@/utils/request'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const loading = ref(false)
const currentRecord = ref(null)
const selectedKeys = ref([])
const failedVisible = ref(false)
const failedLoading = ref(false)
const failedReason = ref('')

// 搜索表单
const searchForm = reactive({
  memberNickname: '',
  status: undefined,
  timeRange: []
})

// 表格列配置
const columns = [
  {
    title: '会员名称',
    dataIndex: 'memberNickname',
    key: 'memberNickname'
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
    title: '真实姓名',
    dataIndex: 'realName',
    key: 'realName'
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    key: 'applyTime'
  },
  {
    title: '提现状态',
    dataIndex: 'status',
    key: 'status'
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

// 获取提现状态文本
const getWithdrawalStatusText = (status) => {
  return WithdrawalStatusLang[status]?.[locale.value] || status
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    memberNickname: '',
    status: undefined,
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
const handleExport = async () => {
  // TODO: 实现导出逻辑
  const res = await get('settlement.withdrawalExport', {
    params: {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm
    }
  })
  if(res.success) {
    message.success('导出成功')
  } else {
    message.error(res.message)
  }
}

// 标记已打款
const handleResolve = async (record) => {
  try {
    const res = await post('settlement.batchResolve', {
      ids: [record.id]
    })
    if(res.success) {
      message.success('操作成功')
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('操作失败')
  }
}

// 批量标记已打款
const handleBatchResolve = async () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要操作的记录')
    return
  }
  try {
    const res = await post('settlement.batchResolve', {
      ids: selectedKeys.value
    })
    if(res.success) {
      message.success('操作成功')
      selectedKeys.value = []
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('操作失败')
  }
}

// 打款失败
const handleReject = (record) => {
  currentRecord.value = record
  failedReason.value = ''
  failedVisible.value = true
}

// 批量打款失败
const handleBatchReject = () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要操作的记录')
    return
  }
  failedReason.value = ''
  failedVisible.value = true
}

// 确认打款失败
const handleRejectConfirm = async () => {
  if (!failedReason.value) {
    message.error('请输入打款失败原因')
    return
  }

  try {
    failedLoading.value = true
    const params = {
      failReason: failedReason.value,
      ids: currentRecord.value ? [currentRecord.value.id] : selectedKeys.value
    }
    const res = await post('settlement.batchReject', params)
    if(res.success) {
      message.success('操作成功')
      failedVisible.value = false
      selectedKeys.value = []
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('操作失败')
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
      memberNickname: searchForm.memberNickname,
      status: searchForm.status,
      startTime: searchForm.timeRange?.[0],
      endTime: searchForm.timeRange?.[1]
    }
    const res = await get('settlement.withdrawal', { params })
    if(res.success){
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