<!--
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-22 18:59:58
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
                placeholder="请选择任务状态"
                allowClear
              >
                <a-select-option 
                  v-for="option in taskStatusOptions" 
                  :key="option.value" 
                  :value="option.value"
                >
                  {{ option.text }}
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
          <template v-if="column.key === 'taskName'">
            <a-space>
              <a-avatar :src="record.channelIcon" />
              {{ record.taskName }}
            </a-space>
          </template>
          <template v-if="column.key === 'taskTime'">
            {{ record.startTime }} - {{ record.endTime }}
          </template>
          <template v-if="column.key === 'taskQuota'">
            <span v-if="record.unlimitedQuota">不限制</span>
            <span v-else>{{ record.quota }}</span>
            <span> / {{ record.submittedCount }}</span>
          </template>
          <template v-if="column.key === 'taskStatus'">
              {{ enumStore.getEnumText('TaskStatus', record.taskStatus) }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除该任务吗？"
                @confirm="handleDelete(record)"
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { get, del } from '@/utils/request'
import { downloadByApi } from '@/utils/download'
import { useEnumStore } from '@/stores'

const router = useRouter()
const loading = ref(false)
const enumStore = useEnumStore()

// 搜索表单
const searchForm = reactive({
  taskName: '',
  channelId: undefined,
  taskStatus: undefined,
})

// 渠道选项
const channelOptions = ref([])

// 计算任务状态选项
const taskStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }
  
  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('TaskStatus')
})

// 表格列配置
const columns = [
  {
    title: '任务名称',
    key: 'taskName'
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    customRender: ({ text }) => {
      // 使用store提供的方法获取枚举文本
      return enumStore.getEnumText('TaskStatus', text)
    }
  },
  {
    title: '任务名额 / 已提交',
    key: 'taskQuota'
  },
  {
    title: '任务时间',
    key: 'taskTime'
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
    const res = await del('task.delete', {}, {
      urlParams: {
        id: record.id
      }
    })
    if(res.code === 0){
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
        // 显示加载中提示
        const loadingMessage = message.loading('正在导出数据，请稍候...', 0)
        
        // 构建导出参数，使用当前的筛选条件
        const params = {
          taskName: searchForm.taskName,
          channelId: searchForm.channelId,
          taskStatus: searchForm.taskStatus
        }
        
        // 调用下载API
        await downloadByApi('task.export', params, `任务列表_${new Date().toLocaleDateString()}.xlsx`)
        
        // 关闭加载提示
        loadingMessage()
        
        // 显示成功提示
        message.success('导出成功')
      } catch (error) {
        console.error('导出失败:', error)
        message.error('导出失败，请稍后重试')
      }
    }
  })
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await get('task.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm
    })
    if(res.code === 0){
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
  if(res.code === 0){
    channelOptions.value = res.data.list
  } 
}

// 初始化
onMounted(async () => {
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