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
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button
                v-if="record.status === 'pending'"
                type="link"
                @click="handlePay(record)"
              >
                打款
              </a-button>
              <a-button
                v-if="record.status === 'pending'"
                type="link"
                danger
                @click="handleReject(record)"
              >
                拒绝
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 拒绝原因弹窗 -->
    <a-modal
      v-model:visible="rejectVisible"
      title="拒绝原因"
      @ok="handleRejectConfirm"
      :confirmLoading="rejectLoading"
    >
      <a-textarea
        v-model:value="rejectReason"
        placeholder="请输入拒绝原因"
        :rows="4"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')
const currentRecord = ref(null)

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
    rejected: '已拒绝'
  }
  return map[status] || status
}

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    pending: 'warning',
    paid: 'success',
    rejected: 'error'
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

// 打款
const handlePay = async (record) => {
  try {
    // TODO: 实现打款逻辑
    message.success('打款成功')
    loadData()
  } catch (error) {
    message.error('打款失败')
  }
}

// 拒绝
const handleReject = (record) => {
  currentRecord.value = record
  rejectReason.value = ''
  rejectVisible.value = true
}

// 确认拒绝
const handleRejectConfirm = async () => {
  if (!rejectReason.value) {
    message.error('请输入拒绝原因')
    return
  }

  try {
    rejectLoading.value = true
    // TODO: 实现拒绝逻辑
    message.success('已拒绝')
    rejectVisible.value = false
    loadData()
  } catch (error) {
    message.error('操作失败')
  } finally {
    rejectLoading.value = false
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
}
</style> 