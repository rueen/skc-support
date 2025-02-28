<template>
  <div class="task-audit content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="任务名称">
              <a-input
                v-model:value="searchForm.taskName"
                placeholder="请输入任务名称"
                allow-clear
              />
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
      title="任务详情"
      :footer="null"
    >
      <a-descriptions :column="1">
        <a-descriptions-item label="任务名称">{{ currentRecord?.taskName }}</a-descriptions-item>
        <a-descriptions-item label="任务类型">{{ currentRecord?.taskType }}</a-descriptions-item>
        <a-descriptions-item label="任务描述">{{ currentRecord?.description }}</a-descriptions-item>
        <a-descriptions-item label="任务奖励">{{ currentRecord?.reward }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ currentRecord?.createTime }}</a-descriptions-item>
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
  taskName: ''
})

// 表格列配置
const columns = [
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName'
  },
  {
    title: '任务类型',
    dataIndex: 'taskType',
    key: 'taskType'
  },
  {
    title: '任务描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true
  },
  {
    title: '任务奖励',
    dataIndex: 'reward',
    key: 'reward',
  },
  {
    title: '创建时间',
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
    width: 200
  }
]

// 表格数据
const tableData = ref([
  {
    id: 1,
    taskName: '点赞任务1',
    taskType: '点赞',
    description: '给指定视频点赞并停留30秒',
    reward: 1.00,
    createTime: '2024-02-28 10:00:00',
    status: 'pending'
  },
  {
    id: 2,
    taskName: '关注任务1',
    taskType: '关注',
    description: '关注指定账号并停留1分钟',
    reward: 2.00,
    createTime: '2024-02-28 11:00:00',
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
  searchForm.taskName = ''
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
.task-audit {
  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style> 