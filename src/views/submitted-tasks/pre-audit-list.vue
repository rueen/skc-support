<template>
  <div class="task-audit content-container">
    <div class="table-container">
      <div class="table-header">
        <a-form layout="inline" :model="searchForm">
          <a-form-item :label="$t('submittedTasks.search.taskName')">
            <a-input
              v-model:value="searchForm.taskName"
              :placeholder="$t('submittedTasks.search.taskNamePlaceholder')"
              allow-clear
              style="width: 140px;"
            />
          </a-form-item>
          <a-form-item :label="$t('submittedTasks.search.channel')">
            <a-select
              v-model:value="searchForm.channelId"
              :placeholder="$t('submittedTasks.search.channelPlaceholder')"
              allow-clear
              style="width: 140px;"
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
          <a-form-item :label="$t('submittedTasks.search.taskPreAuditStatus')">
            <a-select
              v-model:value="searchForm.taskPreAuditStatus"
              :placeholder="$t('submittedTasks.search.taskPreAuditStatusPlaceholder')"
              allow-clear
              style="width: 140px;"
            >
              <a-select-option
                v-for="option in taskPreAuditStatusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('submittedTasks.search.groupId')">
            <a-select
              v-model:value="searchForm.groupId"
              :placeholder="$t('submittedTasks.search.groupIdPlaceholder')"
              allow-clear
            >
              <a-select-option
                v-for="item in groupOptions"
                :key="item.id"
                :value="item.id"
              >
                {{ item.groupName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('submittedTasks.search.submitTime')">
            <a-range-picker
              v-model:value="searchForm.submitTimeRange"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 280px;"
            />
          </a-form-item>
          <a-form-item :label="$t('submittedTasks.search.completedTaskCount')">
            <a-input-number
              v-model:value="searchForm.completedTaskCount"
              :min="0"
              :max="9999"
              :addon-after="$t('submittedTasks.search.times')"
              style="width: 100px!important"
            />
          </a-form-item>
        </a-form>
        <div style="width: 100%;display: flex;justify-content: space-between;">
          <div>
            <a-space>
              <a-button type="primary" @click="handleSearch">{{ $t('common.search') }}</a-button>
              <a-button @click="handleReset">{{ $t('common.reset') }}</a-button>
            </a-space>
          </div>
          <div>
            <a-space>
              <a-button
                @click="handleExport"
                v-if="tableData.length"
              >
                <template #icon><DownloadOutlined /></template>
                {{ $t('common.export') }}
              </a-button>
              <a-button type="primary" @click="handleBatchResolve">{{ $t('common.batchResolve') }}</a-button>
              <a-button danger @click="handleBatchReject">{{ $t('common.batchReject') }}</a-button>
            </a-space>
          </div>
        </div>
      </div>
      
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        :row-selection="rowSelection"
        rowKey="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'taskName'">
            <a-space>
              <a-avatar :src="record.channelIcon" size="small" />
              <span>{{ record.taskName }}</span>
            </a-space>
          </template>
          <template v-if="column.key === 'taskPreAuditStatus'">
            {{ enumStore.getEnumText('TaskPreAuditStatus', record.taskPreAuditStatus) }}
          </template>
          <template v-if="column.key === 'preWaiterName'">
            {{ record.preWaiterName || '--' }}
          </template>
          <template v-if="column.key === 'member'">
            <div>
              <div>{{ record.nickname }}</div>
              <a-space class="group-name">
                <span>{{ record.groupName }}</span>
                <GroupOwner v-if="record.isOwner" />
              </a-space>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleView(record)">{{ $t('submittedTasks.list.view') }}</a>
              <a-popconfirm
                :title="$t('submittedTasks.list.confirmResolve')"
                @confirm="handleResolve(record)"
                v-if="record.taskPreAuditStatus === 'pending'"
              >
                <a>{{ $t('submittedTasks.list.resolve') }}</a>
              </a-popconfirm>
              <a-popconfirm
                :title="$t('submittedTasks.list.confirmReject')"
                @confirm="handleReject(record)"
                v-if="record.taskPreAuditStatus === 'pending'"
              >
                <a class="danger">{{ $t('submittedTasks.list.reject') }}</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 拒绝原因弹窗 -->
    <a-modal
      v-model:open="rejectVisible"
      :title="$t('submittedTasks.rejectReasonTitle')"
      @ok="handleRejectConfirm"
      :confirmLoading="rejectLoading"
    >
      <a-textarea
        v-model:value="rejectReason"
        :placeholder="$t('submittedTasks.rejectReasonPlaceholder')"
        :rows="4"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { get, post } from '@/utils/request'
import { useEnumStore } from '@/stores'
import { downloadByApi } from '@/utils/download'
import { useI18n } from 'vue-i18n'
import GroupOwner from '@/components/GroupOwner.vue'

const enumStore = useEnumStore()
const { t } = useI18n()

// 计算审核状态选项
const taskPreAuditStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  } 

  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('TaskPreAuditStatus')
})

const router = useRouter()
const loading = ref(false)
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')
const selectedRowKeys = ref([])

// 搜索表单
const searchForm = reactive({
  taskName: '',
  channelId: undefined,
  taskPreAuditStatus: 'pending',
  groupId: undefined,
  submitTimeRange: [],
  completedTaskCount: undefined
})

// 选项数据
const channelOptions = ref([])
const groupOptions = ref([])

// 表格列配置
const columns = computed(() => [
  {
    title: t('submittedTasks.list.taskName'),
    key: 'taskName'
  },
  {
    title: t('submittedTasks.list.reward'),
    dataIndex: 'reward',
    key: 'reward'
  },
  {
    title: t('submittedTasks.list.memberInfo'),
    key: 'member'
  },
  {
    title: t('submittedTasks.list.status'),
    dataIndex: 'taskPreAuditStatus',
    key: 'taskPreAuditStatus'
  },
  {
    title: t('submittedTasks.list.preAuditor'),
    key: 'preWaiterName'
  },
  {
    title: t('submittedTasks.list.action'),
    key: 'action',
    fixed: 'right',
    width: 180
  }
])

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
    disabled: record.taskPreAuditStatus !== 'pending'
  })
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    taskName: '',
    channelId: undefined,
    taskPreAuditStatus: 'pending',
    groupId: undefined,
    submitTimeRange: [],
    completedTaskCount: undefined
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 查看详情
const handleView = (record) => {
  router.push(`/submitted-tasks/detail/${record.id}?type=pre`)
}

// 审核通过
const handleResolve = async (record) => {
  selectedRowKeys.value = [record.id]
  handleBatchResolve()
}

// 批量审核通过
const handleBatchResolve = async () => {
  if (!selectedRowKeys.value.length) {
    message.warning(t('submittedTasks.list.selectTask'))
    return
  }
  const res = await post('taskSubmitted.batchPreAuditApprove', {
    ids: selectedRowKeys.value
  })
  if(res.code === 0) {
    message.success(t('submittedTasks.resolveSuccess'))
    selectedRowKeys.value = []
    loadData()
  } else {
    message.error(res.message)
  }
}

// 审核拒绝
const handleReject = (record) => {
  selectedRowKeys.value = [record.id]
  rejectReason.value = ''
  rejectVisible.value = true
}

// 确认拒绝
const handleRejectConfirm = async () => {
  if (!rejectReason.value) {
    message.error(t('submittedTasks.rejectReasonRequired'))
    return
  }

  rejectLoading.value = true
  const res = await post('taskSubmitted.batchPreAuditReject', {
    ids: selectedRowKeys.value,
    reason: rejectReason.value
  })
  if(res.code === 0) {
    message.success(t('submittedTasks.rejectSuccess'))
    rejectVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}

// 批量拒绝
const handleBatchReject = () => {
  if (!selectedRowKeys.value.length) {
    message.warning(t('submittedTasks.list.selectTask'))
    return
  }
  // TODO: 实现批量拒绝逻辑
  rejectReason.value = ''
  rejectVisible.value = true
}

const loadChannelOptions = async () => {
  const res = await get('channel.list')
  if(res.code === 0){
    channelOptions.value = res.data.list
  } 
}

const handleExport = () => {
  Modal.confirm({
    title: t('submittedTasks.list.export'),
    content: t('submittedTasks.list.confirmExportContent'),
    onOk: async () => {
      try {
        // 显示加载中提示
        const loadingMessage = message.loading(t('submittedTasks.list.exporting'), 0)
        
        // 构建导出参数，使用当前的筛选条件
        const params = {
          ...searchForm
        }
        
        // 调用下载API
        await downloadByApi('taskSubmitted.preAuditExport', params, `pre_audit_tasks_${new Date().toLocaleDateString()}.xlsx`)
        
        // 关闭加载提示
        loadingMessage()
        
        // 显示成功提示
        message.success(t('submittedTasks.list.exportSuccess'))
      } catch (error) {
        console.error('导出失败:', error)
        message.error(t('submittedTasks.list.exportFailed'))
      }
    }
  })
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
    if(res.code === 0){
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
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      taskName: searchForm.taskName,
      channelId: searchForm.channelId,
      taskPreAuditStatus: searchForm.taskPreAuditStatus,
      groupId: searchForm.groupId,
      submitStartTime: searchForm.submitTimeRange?.[0],
      submitEndTime: searchForm.submitTimeRange?.[1],
      completedTaskCount: searchForm.completedTaskCount
    }
    const res = await get('taskSubmitted.preAuditList', {
      ...params
    })
    if(res.code === 0) {
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