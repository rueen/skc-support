<template>
  <div class="task-list">
    <div class="table-operations">
      <a-form layout="inline" :model="queryParams">
        <a-form-item label="任务名称">
          <a-input
            v-model:value="queryParams.name"
            placeholder="请输入任务名称"
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
        <a-form-item label="任务状态">
          <a-select
            v-model:value="queryParams.status"
            placeholder="请选择任务状态"
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
        <a-space>
          <a-button type="primary" @click="handleAdd">
            <plus-outlined /> 添加任务
          </a-button>
          <a-button @click="handleExport">
            <download-outlined /> 导出
          </a-button>
        </a-space>
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
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="handleEdit(record)">编辑</a>
            <a @click="handleView(record)">查看</a>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="handleDelete(record)"
            >
              <a class="danger">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

// 查询参数
const queryParams = reactive({
  name: '',
  channel: undefined,
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
const channelOptions = [
  { label: '抖音', value: 'douyin' },
  { label: '快手', value: 'kuaishou' },
  { label: '小红书', value: 'xiaohongshu' }
]

const statusOptions = [
  { label: '未开始', value: 'not_started' },
  { label: '进行中', value: 'in_progress' },
  { label: '已结束', value: 'finished' }
]

// 表格列定义
const columns = [
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '平台渠道',
    dataIndex: 'channel',
    key: 'channel'
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status'
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
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200
  }
]

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    name: '',
    channel: undefined,
    status: undefined
  })
  handleQuery()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleQuery()
}

const handleAdd = () => {
  router.push('/task/create')
}

const handleEdit = (record) => {
  router.push(`/task/edit/${record.id}`)
}

const handleView = (record) => {
  // TODO: 实现查看逻辑
}

const handleDelete = (record) => {
  // TODO: 实现删除逻辑
}

const handleExport = () => {
  // TODO: 实现导出逻辑
}
</script>

<style lang="less" scoped>
.task-list {
  .table-operations {
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