<template>
  <div class="account">
    <div class="table-operations">
      <a-form layout="inline" :model="queryParams">
        <a-form-item label="账号名称">
          <a-input
            v-model:value="queryParams.accountName"
            placeholder="请输入账号名称"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="平台渠道">
          <a-select
            v-model:value="queryParams.channel"
            placeholder="请选择平台渠道"
            style="width: 200px"
            allow-clear
          >
            <a-select-option v-for="item in channelOptions" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleQuery">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <div class="table-operations-right">
        <a-button
          type="primary"
          :disabled="!selectedRowKeys.length"
          @click="handleBatchApprove"
        >
          批量审核通过
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
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="handleView(record)">查看</a>
            <a-button
              type="link"
              @click="handleApprove(record)"
            >
              审核通过
            </a-button>
            <a-button
              type="link"
              danger
              @click="handleReject(record)"
            >
              审核拒绝
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- 账号详情弹窗 -->
    <a-modal
      v-model:open="detailModalVisible"
      title="账号详情"
      :footer="null"
      width="600px"
    >
      <a-descriptions :column="1">
        <a-descriptions-item label="账号名称">
          {{ currentAccount.accountName }}
        </a-descriptions-item>
        <a-descriptions-item label="平台渠道">
          {{ currentAccount.channel }}
        </a-descriptions-item>
        <a-descriptions-item label="粉丝数">
          {{ currentAccount.fansCount }}
        </a-descriptions-item>
        <a-descriptions-item label="好友数">
          {{ currentAccount.friendsCount }}
        </a-descriptions-item>
        <a-descriptions-item label="主页链接">
          <a :href="currentAccount.profileUrl" target="_blank">
            {{ currentAccount.profileUrl }}
          </a>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>

    <!-- 拒绝原因弹窗 -->
    <a-modal
      v-model:open="rejectModalVisible"
      title="审核拒绝"
      @ok="handleRejectConfirm"
    >
      <a-form :model="rejectForm">
        <a-form-item label="拒绝原因" required>
          <a-textarea
            v-model:value="rejectForm.reason"
            :rows="4"
            placeholder="请输入拒绝原因"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const selectedRowKeys = ref([])
const detailModalVisible = ref(false)
const rejectModalVisible = ref(false)
const currentAccount = ref({})

// 查询参数
const queryParams = reactive({
  accountName: '',
  channel: undefined
})

// 表格数据
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 拒绝表单
const rejectForm = reactive({
  reason: ''
})

// 平台渠道选项
const channelOptions = [
  { label: '抖音', value: 'douyin' },
  { label: '快手', value: 'kuaishou' },
  { label: '小红书', value: 'xiaohongshu' }
]

// 表格列定义
const columns = [
  {
    title: '账号名称',
    dataIndex: 'accountName',
    key: 'accountName'
  },
  {
    title: '平台渠道',
    dataIndex: 'channel',
    key: 'channel'
  },
  {
    title: '粉丝数',
    dataIndex: 'fansCount',
    key: 'fansCount'
  },
  {
    title: '好友数',
    dataIndex: 'friendsCount',
    key: 'friendsCount'
  },
  {
    title: '主页链接',
    dataIndex: 'profileUrl',
    key: 'profileUrl',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 250
  }
]

// 行选择配置
const rowSelection = {
  selectedRowKeys,
  onChange: (keys) => {
    selectedRowKeys.value = keys
  }
}

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    accountName: '',
    channel: undefined
  })
  handleQuery()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleQuery()
}

const handleView = (record) => {
  currentAccount.value = record
  detailModalVisible.value = true
}

const handleApprove = async (record) => {
  try {
    // TODO: 实现审核通过逻辑
    message.success('审核通过成功')
    handleQuery()
  } catch (error) {
    message.error('审核通过失败')
  }
}

const handleReject = (record) => {
  currentAccount.value = record
  rejectModalVisible.value = true
}

const handleRejectConfirm = async () => {
  if (!rejectForm.reason) {
    message.error('请输入拒绝原因')
    return
  }
  
  try {
    // TODO: 实现审核拒绝逻辑
    message.success('审核拒绝成功')
    rejectModalVisible.value = false
    rejectForm.reason = ''
    handleQuery()
  } catch (error) {
    message.error('审核拒绝失败')
  }
}

const handleBatchApprove = async () => {
  try {
    // TODO: 实现批量审核通过逻辑
    message.success('批量审核通过成功')
    selectedRowKeys.value = []
    handleQuery()
  } catch (error) {
    message.error('批量审核通过失败')
  }
}
</script>

<style lang="less" scoped>
.account {
  .table-operations {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style> 