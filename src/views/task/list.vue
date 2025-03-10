<!--
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-10 16:40:35
 * @Description: 
-->
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
            <a-form-item label="任务状态">
              <a-select
                v-model:value="searchForm.taskStatus"
                placeholder="请选择状态"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="status in Object.values(TaskStatus)"
                  :key="status"
                  :value="status"
                >
                  {{ getTaskStatusText(status) }}
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
          <a-space>
            <a-button @click="handleExport">
              <template #icon><download-outlined /></template>
              导出
            </a-button>
            <a-button type="primary" @click="handleAdd">
              <template #icon><plus-outlined /></template>
              新建任务
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
          <template v-if="column.key === 'taskStatus'">
            <a-tag :color="getTaskStatusColor(record.taskStatus)">
              {{ getTaskStatusText(record.taskStatus) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)" v-if="record.taskStatus === TaskStatus.NOT_STARTED">编辑</a>
              <a-popconfirm
                title="确定要删除该任务吗？"
                @confirm="handleDelete(record)"
                v-if="record.taskStatus === TaskStatus.NOT_STARTED"
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import {
  TaskStatus,
  TaskStatusLang,
  TaskStatusColor,
  getLangText
} from '@/constants/enums'
import { get } from '@/utils/request'

const router = useRouter()
const { locale } = useI18n()
const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  taskName: '',
  channelId: undefined,
  taskStatus: undefined,
})

// 渠道选项
const channelOptions = ref([])

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
    title: '任务状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 180
  }
]

// 表格数据
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 获取任务状态文本
const getTaskStatusText = (status) => {
  return getLangText(TaskStatusLang, status, locale.value)
}

// 获取任务状态颜色
const getTaskStatusColor = (status) => {
  return TaskStatusColor[status]
}

// 方法定义
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const handleReset = () => {
  searchForm.taskName = ''
  searchForm.channelId = undefined
  searchForm.taskStatus = undefined
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

const handleDelete = async (record) => {
  try {
    const res = await get('task.delete', { id: record.id })
    if(res.success){
      message.success('删除成功')
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('删除失败')
  }
}

const handleExport = () => {
  Modal.confirm({
    title: '确认导出',
    content: '确定要导出当前筛选条件下的所有任务数据吗？',
    onOk: async () => {
      try {
        // TODO: 实现导出逻辑
        const params = {
          taskName: searchForm.taskName,
          channelId: searchForm.channelId
        }
        const res = await get('task.export', params)
        if(res.success){
          message.success('导出成功')
        } else {
          message.error(res.message)
        }
      } catch (error) {
        message.error('导出失败')
      }
    }
  })
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await get('task.list', {
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...searchForm
      }
    })
    if(res.success){
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

const loadChannelOptions = async () => {
  const res = await get('channel.list')
  if(res.success){
    channelOptions.value = res.data.list
  } 
}

// 初始化
onMounted(() => {
  loadData()
  loadChannelOptions()
})
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