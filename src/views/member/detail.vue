<template>
  <div class="member-detail content-container">
    <div class="form-container detail-container">
      <div class="page-header">
        <a-space>
          <a-button @click="$router.back()">
            <template #icon><left-outlined /></template>
            返回
          </a-button>
          <h2 class="page-title">会员详情</h2>
        </a-space>
      </div>

      <a-descriptions :column="2">
        <a-descriptions-item label="会员名称">
          {{ memberInfo.name }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号">
          {{ memberInfo.phone }}
        </a-descriptions-item>
        <a-descriptions-item label="所属群">
          {{ memberInfo.groupName }}
        </a-descriptions-item>
        <a-descriptions-item label="群主标识">
          {{ memberInfo.isGroupOwner ? '是' : '否' }}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ memberInfo.createTime }}
        </a-descriptions-item>
      </a-descriptions>

      <a-divider />

      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="task" tab="任务记录">
          <a-table
            :columns="taskColumns"
            :data-source="taskData"
            :loading="taskLoading"
            :pagination="taskPagination"
            @change="handleTaskTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-tag :color="getTaskStatusColor(record.status)">
                  {{ getTaskStatusText(record.status) }}
                </a-tag>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
        
        <a-tab-pane key="bill" tab="账单记录">
          <a-table
            :columns="billColumns"
            :data-source="billData"
            :loading="billLoading"
            :pagination="billPagination"
            @change="handleBillTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'amount'">
                <span :class="{ 'income': record.type === 'income', 'expense': record.type === 'expense' }">
                  {{ record.type === 'income' ? '+' : '-' }}¥{{ record.amount.toFixed(2) }}
                </span>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { LeftOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const memberId = route.params.id

// 会员信息
const memberInfo = ref({})

// 标签页
const activeTab = ref('task')

// 任务记录
const taskLoading = ref(false)
const taskData = ref([])
const taskPagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

const taskColumns = [
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status',
    width: 100
  },
  {
    title: '完成时间',
    dataIndex: 'completeTime',
    key: 'completeTime',
    width: 180
  }
]

// 账单记录
const billLoading = ref(false)
const billData = ref([])
const billPagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

const billColumns = [
  {
    title: '账单类型',
    dataIndex: 'billType',
    key: 'billType'
  },
  {
    title: '账单金额',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180
  }
]

// 获取任务状态颜色
const getTaskStatusColor = (status) => {
  const map = {
    pending: 'warning',
    processing: 'processing',
    completed: 'success',
    failed: 'error'
  }
  return map[status]
}

// 获取任务状态文本
const getTaskStatusText = (status) => {
  const map = {
    pending: '待处理',
    processing: '进行中',
    completed: '已完成',
    failed: '已失败'
  }
  return map[status]
}

// 加载会员信息
const loadMemberInfo = async () => {
  // TODO: 实现加载会员信息的逻辑
  memberInfo.value = {
    name: '张三',
    phone: '13800138000',
    groupName: '测试群组',
    isGroupOwner: true,
    createTime: '2024-02-28 15:30:00'
  }
}

// 加载任务记录
const loadTaskData = async () => {
  taskLoading.value = true
  try {
    // TODO: 实现加载任务记录的逻辑
    taskData.value = []
    taskPagination.total = 0
  } finally {
    taskLoading.value = false
  }
}

// 加载账单记录
const loadBillData = async () => {
  billLoading.value = true
  try {
    // TODO: 实现加载账单记录的逻辑
    billData.value = []
    billPagination.total = 0
  } finally {
    billLoading.value = false
  }
}

// 表格分页变化
const handleTaskTableChange = (pag) => {
  Object.assign(taskPagination, pag)
  loadTaskData()
}

const handleBillTableChange = (pag) => {
  Object.assign(billPagination, pag)
  loadBillData()
}

onMounted(() => {
  loadMemberInfo()
  loadTaskData()
  loadBillData()
})
</script>

<style lang="less" scoped>
.member-detail {
  .page-header {
    margin-bottom: 24px;
    
    .page-title {
      margin: 0;
      font-size: 20px;
      line-height: 32px;
    }
  }
  
  .income {
    color: #52c41a;
  }
  
  .expense {
    color: #ff4d4f;
  }
}
</style> 