<template>
  <div class="withdrawal content-container">
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
        <div class="right">
          <a-space>
            <a-button type="primary" @click="handleExport">
              <template #icon><download-outlined /></template>
              导出
            </a-button>
            <a-button type="primary" @click="handleBatchPaid">批量已打款</a-button>
            <a-button danger @click="handleBatchFailed">批量打款失败</a-button>
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
            <a-tag :color="getStatusColor(record.status)">
              {{ getStatusText(record.status) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-popconfirm
                title="确定要标记为已打款吗？"
                @confirm="handlePaid(record)"
              >
                <a>已打款</a>
              </a-popconfirm>
              <a class="danger" @click="handleFailed(record)">打款失败</a>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 打款失败原因弹窗 -->
    <a-modal
      v-model:open="failedVisible"
      title="打款失败原因"
      @ok="handleFailedConfirm"
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
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue'

const loading = ref(false)
const currentRecord = ref(null)
const selectedKeys = ref([])
const failedVisible = ref(false)
const failedLoading = ref(false)
const failedReason = ref('')

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
    title: '提现账户',
    dataIndex: 'account',
    key: 'account'
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
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '状态',
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
const tableData = ref([
  {
    id: 1,
    memberName: '张三',
    account: '6222021234567890123',
    amount: 1000.00,
    realName: '张三',
    createTime: '2024-02-28 10:00:00',
    status: 'pending'
  },
  {
    id: 2,
    memberName: '李四',
    account: '6222021234567890124',
    amount: 2000.00,
    realName: '李四',
    createTime: '2024-02-28 11:00:00',
    status: 'paid'
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
    pending: '待处理',
    paid: '已打款',
    failed: '打款失败'
  }
  return map[status] || status
}

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    pending: 'warning',
    paid: 'success',
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
  searchForm.memberName = ''
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
  // TODO: 实现导出逻辑
  message.success('导出成功')
}

// 标记已打款
const handlePaid = async (record) => {
  try {
    // TODO: 实现标记已打款逻辑
    message.success('操作成功')
    loadData()
  } catch (error) {
    message.error('操作失败')
  }
}

// 批量标记已打款
const handleBatchPaid = async () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要操作的记录')
    return
  }
  try {
    // TODO: 实现批量标记已打款逻辑
    message.success('操作成功')
    selectedKeys.value = []
    loadData()
  } catch (error) {
    message.error('操作失败')
  }
}

// 打款失败
const handleFailed = (record) => {
  currentRecord.value = record
  failedReason.value = ''
  failedVisible.value = true
}

// 批量打款失败
const handleBatchFailed = () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要操作的记录')
    return
  }
  failedReason.value = ''
  failedVisible.value = true
}

// 确认打款失败
const handleFailedConfirm = async () => {
  if (!failedReason.value) {
    message.error('请输入打款失败原因')
    return
  }

  try {
    failedLoading.value = true
    // TODO: 实现打款失败逻辑
    message.success('操作成功')
    failedVisible.value = false
    selectedKeys.value = []
    loadData()
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