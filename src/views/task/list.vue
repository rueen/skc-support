<template>
  <div class="task-list content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('task.title')">
              <a-input
                v-model:value="searchForm.title"
                :placeholder="$t('common.search')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('task.platform')">
              <a-select
                v-model:value="searchForm.platform"
                :placeholder="$t('common.search')"
                style="width: 200px"
                allow-clear
              >
                <a-select-option v-for="item in platformOptions" :key="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('task.status')">
              <a-select
                v-model:value="searchForm.status"
                :placeholder="$t('common.search')"
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
          <a-button type="primary" @click="handleAdd">
            <template #icon><plus-outlined /></template>
            {{ $t('common.add') }}
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
              <a @click="handleEdit(record)">{{ $t('common.edit') }}</a>
              <a @click="handleView(record)">{{ $t('common.view') }}</a>
              <a-popconfirm
                :title="$t('common.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
                <a class="danger">{{ $t('common.delete') }}</a>
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
  title: '',
  platform: undefined,
  status: undefined
})

// 表格数据
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 选项数据
const platformOptions = [
  { label: '抖音', value: 'douyin' },
  { label: '快手', value: 'kuaishou' },
  { label: '小红书', value: 'xiaohongshu' }
]

const statusOptions = [
  { label: '未开始', value: 'pending' },
  { label: '进行中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' }
]

// 表格列定义
const columns = [
  {
    title: '任务标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '平台',
    dataIndex: 'platform',
    key: 'platform'
  },
  {
    title: '任务奖励',
    dataIndex: 'reward',
    key: 'reward'
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
    fixed: 'right',
    width: 200
  }
]

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    pending: 'default',
    processing: 'processing',
    completed: 'success',
    cancelled: 'error'
  }
  return map[status]
}

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    pending: '未开始',
    processing: '进行中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return map[status]
}

// 方法定义
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const handleReset = () => {
  Object.assign(searchForm, {
    title: '',
    platform: undefined,
    status: undefined
  })
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
    tableData.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

// 初始化加载
loadData()
</script>

<style lang="less" scoped>
.task-list {
  .danger {
    color: #ff4d4f;
  }
}
</style> 