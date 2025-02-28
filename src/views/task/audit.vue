<template>
  <div class="task-audit">
    <div class="table-operations">
      <a-form layout="inline" :model="queryParams">
        <a-form-item label="任务名称">
          <a-input
            v-model:value="queryParams.taskName"
            placeholder="请输入任务名称"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="会员名称">
          <a-input
            v-model:value="queryParams.memberName"
            placeholder="请输入会员名称"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="审核状态">
          <a-select
            v-model:value="queryParams.status"
            placeholder="请选择审核状态"
            style="width: 200px"
            allow-clear
          >
            <a-select-option v-for="item in statusOptions" :key="item.value">
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
        <template v-if="column.key === 'status'">
          <a-tag :color="getStatusColor(record.status)">
            {{ getStatusText(record.status) }}
          </a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="handleView(record)">查看</a>
            <a-button
              type="link"
              :disabled="record.status !== 'pending'"
              @click="handleApprove(record)"
            >
              审核通过
            </a-button>
            <a-button
              type="link"
              danger
              :disabled="record.status !== 'pending'"
              @click="handleReject(record)"
            >
              审核拒绝
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="rejectModalVisible"
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
const rejectModalVisible = ref(false)
const currentRecord = ref(null)

// 查询参数
const queryParams = reactive({
  taskName: '',
  memberName: '',
  status: undefined
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

// 状态选项
const statusOptions = [
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已拒绝', value: 'rejected' }
]

// 表格列定义
const columns = [
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName'
  },
  {
    title: '平台渠道',
    dataIndex: 'channel',
    key: 'channel'
  },
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName'
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime'
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status'
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
  },
  getCheckboxProps: (record) => ({
    disabled: record.status !== 'pending'
  })
}

// 状态相关方法
const getStatusColor = (status) => {
  const map = {
    pending: 'warning',
    approved: 'success',
    rejected: 'error'
  }
  return map[status]
}

const getStatusText = (status) => {
  const map = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return map[status]
}

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    taskName: '',
    memberName: '',
    status: undefined
  })
  handleQuery()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleQuery()
}

const handleView = (record) => {
  // TODO: 实现查看逻辑
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
  currentRecord.value = record
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
.task-audit {
  .table-operations {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style> 