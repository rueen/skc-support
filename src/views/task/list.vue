<template>
  <div class="task content-container">
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
            <a-form-item label="平台渠道">
              <a-select
                v-model:value="searchForm.channelId"
                placeholder="请选择平台渠道"
                style="width: 120px"
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
          <a-button type="primary" @click="handleAdd">
            <template #icon><plus-outlined /></template>
            新建任务
          </a-button>
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
              <a @click="handleView(record)">查看</a>
              <a @click="handleEdit(record)" v-if="record.status === 'pending'">编辑</a>
              <a-popconfirm
                title="确定要删除该任务吗？"
                @confirm="handleDelete(record)"
                v-if="record.status === 'pending'"
              >
                <a class="danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  taskName: '',
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
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName'
  },
  {
    title: '平台渠道',
    dataIndex: 'channelName',
    key: 'channelName'
  },
  {
    title: '报名人数',
    dataIndex: 'signupCount',
    key: 'signupCount'
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime'
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime'
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
    channelName: '抖音',
    channelId: 1,
    status: 'pending',
    signupCount: 0,
    startTime: '2024-03-01 00:00:00',
    endTime: '2024-03-07 23:59:59'
  },
  {
    id: 2,
    taskName: '关注任务1',
    channelName: '快手',
    channelId: 2,
    status: 'processing',
    signupCount: 10,
    startTime: '2024-02-28 00:00:00',
    endTime: '2024-03-06 23:59:59'
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
    pending: '未开始',
    processing: '进行中',
    completed: '已结束'
  }
  return map[status] || status
}

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    pending: 'default',
    processing: 'processing',
    completed: 'success'
  }
  return map[status]
}

// 方法定义
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const handleReset = () => {
  searchForm.taskName = ''
  searchForm.channelId = undefined
  handleSearch()
}

const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

const handleAdd = () => {
  router.push('/task/create')
}

const handleEdit = (record) => {
  router.push(`/task/edit/${record.id}`)
}

const handleView = (record) => {
  router.push(`/task/view/${record.id}`)
}

const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    message.success('删除成功')
    loadData()
  } catch (error) {
    message.error('删除失败')
  }
}

const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    pagination.total = tableData.value.length
  } finally {
    loading.value = false
  }
}

// 初始化加载
loadData()
</script>

<style lang="less" scoped>
.task {
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