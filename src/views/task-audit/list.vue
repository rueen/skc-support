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
            <a-form-item label="审核状态">
              <a-select
                v-model:value="searchForm.auditStatus"
                placeholder="请选择审核状态"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="status in Object.values(TaskAuditStatus)"
                  :key="status"
                  :value="status"
                >
                  {{ getTaskAuditStatusText(status) }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="所属群组">
              <a-select
                v-model:value="searchForm.groupId"
                placeholder="请选择群组"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="item in groupOptions"
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
          <a-space>
            <a-button type="primary" @click="handleBatchResolve">批量通过</a-button>
            <a-button danger @click="handleBatchReject">批量拒绝</a-button>
          </a-space>
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
          <template v-if="column.key === 'auditStatus'">
            <a-tag :color="getTaskAuditStatusColor(record.auditStatus)">
              {{ getTaskAuditStatusText(record.auditStatus) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'member'">
            <div>
              <div>{{ record.memberNickname }}</div>
              <div class="group-name">{{ record.groupName }}</div>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleView(record)">查看</a>
              <a-popconfirm
                title="确定要通过该任务吗？"
                @confirm="handleApprove(record)"
                v-if="record.auditStatus === TaskAuditStatus.PENDING"
              >
                <a>通过</a>
              </a-popconfirm>
              <a-popconfirm
                title="确定要拒绝该任务吗？"
                @confirm="handleReject(record)"
                v-if="record.auditStatus === TaskAuditStatus.PENDING"
              >
                <a class="danger">拒绝</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 查看详情弹窗 -->
    <a-modal
      v-model:open="detailVisible"
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
      v-model:open="rejectVisible"
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import {
  TaskAuditStatus,
  TaskAuditStatusLang,
  TaskAuditStatusColor,
  getLangText
} from '@/constants/enums'
import { get, post } from '@/utils/request'

const router = useRouter()
const { locale } = useI18n()
const loading = ref(false)
const detailVisible = ref(false)
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')
const currentRecord = ref(null)
const selectedRowKeys = ref([])

// 搜索表单
const searchForm = reactive({
  taskName: '',
  channelId: undefined,
  auditStatus: undefined,
  groupId: undefined
})

// 选项数据
const channelOptions = ref([])
const groupOptions = ref([])

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
    title: '任务奖励',
    dataIndex: 'reward',
    key: 'reward'
  },
  {
    title: '会员信息',
    key: 'member'
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    key: 'auditStatus'
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

// 表格选择配置
const rowSelection = {
  selectedRowKeys,
  onChange: (keys) => {
    selectedRowKeys.value = keys
  },
  getCheckboxProps: (record) => ({
    disabled: record.auditStatus !== TaskAuditStatus.PENDING
  })
}

// 获取任务审核状态文本
const getTaskAuditStatusText = (status) => {
  return getLangText(TaskAuditStatusLang, status, locale.value)
}

// 获取任务审核状态颜色
const getTaskAuditStatusColor = (status) => {
  return TaskAuditStatusColor[status]
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.taskName = ''
  searchForm.channelId = undefined
  searchForm.auditStatus = undefined
  searchForm.groupId = undefined
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 查看详情
const handleView = (record) => {
  router.push(`/task-audit/detail/${record.id}`)
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
const handleBatchResolve = async () => {
  if (!selectedRowKeys.value.length) {
    message.warning('请选择要通过的任务')
    return
  }
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

// 批量拒绝
const handleBatchReject = () => {
  if (!selectedRowKeys.value.length) {
    message.warning('请选择要拒绝的任务')
    return
  }
  // TODO: 实现批量拒绝逻辑
}

const loadChannelOptions = async () => {
  const res = await get('channel.list')
  if(res.success){
    channelOptions.value = res.data.list
  } 
}

// 获取群组列表
const loadGroupOptions = async (keyword = '') => {
  try {
    const res = await get('group.list', {
      params: {
        page: 1,
        pageSize: 50,
        keyword
      }
    })  
    if(res.success){
      groupOptions.value = res.data.list || []
    }
  } catch (error) {
    message.error('获取群组列表失败')
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    const res = await get('taskAudit.list', {
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...searchForm
      }
    })
    if(res.success) {
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  loadData()
  loadGroupOptions()
  loadChannelOptions()
})
</script>

<style lang="less" scoped>
.task-audit {
  .table-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
  }

  .group-name {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    margin-top: 4px;
  }

  .danger {
    color: #ff4d4f;
  }
}
</style> 