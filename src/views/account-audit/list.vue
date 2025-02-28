<template>
  <div class="account-audit content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="账号名称">
              <a-input
                v-model:value="searchForm.accountName"
                placeholder="请输入账号名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="平台渠道">
              <a-select
                v-model:value="searchForm.channelId"
                placeholder="请选择平台渠道"
                style="width: 200px"
                allow-clear
              >
                <a-select-option
                  v-for="item in channelOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button @click="handleReset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-button
            type="primary"
            :disabled="!selectedRowKeys.length"
            @click="handleBatchApprove"
          >
            批量通过
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        :row-selection="rowSelection"
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
              <a @click="handleView(record)">查看</a>
              <a-button
                v-if="record.status === 'pending'"
                type="link"
                @click="handleApprove(record)"
              >
                通过
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

    <!-- 查看详情弹窗 -->
    <a-modal
      v-model:visible="detailVisible"
      title="账号详情"
      :footer="null"
    >
      <a-descriptions :column="1">
        <a-descriptions-item label="账号名称">{{ currentRecord?.accountName }}</a-descriptions-item>
        <a-descriptions-item label="平台渠道">{{ currentRecord?.channelName }}</a-descriptions-item>
        <a-descriptions-item label="粉丝数">{{ currentRecord?.fansCount }}</a-descriptions-item>
        <a-descriptions-item label="好友数">{{ currentRecord?.friendsCount }}</a-descriptions-item>
        <a-descriptions-item label="主页链接">
          <a :href="currentRecord?.homeUrl" target="_blank">{{ currentRecord?.homeUrl }}</a>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>

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
const detailVisible = ref(false)
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')
const currentRecord = ref(null)
const selectedRowKeys = ref([])

// 搜索表单
const searchForm = reactive({
  accountName: '',
  channelId: undefined
})

// 渠道选项
const channelOptions = [
  { id: 1, name: '抖音' },
  { id: 2, name: '快手' }
]

// 表格列配置
const columns = [
  {
    title: '账号名称',
    dataIndex: 'accountName',
    key: 'accountName'
  },
  {
    title: '平台渠道',
    dataIndex: 'channelName',
    key: 'channelName'
  },
  {
    title: '粉丝数',
    dataIndex: 'fansCount',
    key: 'fansCount',
  },
  {
    title: '好友数',
    dataIndex: 'friendsCount',
    key: 'friendsCount',
  },
  {
    title: '主页链接',
    dataIndex: 'homeUrl',
    key: 'homeUrl',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    key: 'action',
    width: 200
  }
]

// 表格数据
const tableData = ref([
  {
    id: 1,
    accountName: '抖音账号1',
    channelName: '抖音',
    channelId: 1,
    fansCount: 10000,
    friendsCount: 500,
    homeUrl: 'https://www.douyin.com/user1',
    status: 'pending'
  },
  {
    id: 2,
    accountName: '快手账号1',
    channelName: '快手',
    channelId: 2,
    fansCount: 20000,
    friendsCount: 1000,
    homeUrl: 'https://www.kuaishou.com/user1',
    status: 'approved'
  }
])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 表格选择配置
const rowSelection = {
  selectedRowKeys,
  onChange: (keys) => {
    selectedRowKeys.value = keys
  },
  getCheckboxProps: (record) => ({
    disabled: record.status !== 'pending'
  })
}

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return map[status] || status
}

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    pending: 'warning',
    approved: 'success',
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
  searchForm.accountName = ''
  searchForm.channelId = undefined
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 查看详情
const handleView = (record) => {
  currentRecord.value = record
  detailVisible.value = true
}

// 审核通过
const handleApprove = async (record) => {
  try {
    // TODO: 实现审核通过逻辑
    message.success('审核通过成功')
    loadData()
  } catch (error) {
    message.error('审核通过失败')
  }
}

// 批量审核通过
const handleBatchApprove = async () => {
  try {
    // TODO: 实现批量审核通过逻辑
    message.success('批量审核通过成功')
    selectedRowKeys.value = []
    loadData()
  } catch (error) {
    message.error('批量审核通过失败')
  }
}

// 审核拒绝
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
    // TODO: 实现审核拒绝逻辑
    message.success('审核拒绝成功')
    rejectVisible.value = false
    loadData()
  } catch (error) {
    message.error('审核拒绝失败')
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
.account-audit {
  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style> 