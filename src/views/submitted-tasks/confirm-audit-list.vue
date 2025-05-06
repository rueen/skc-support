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
          <a-form-item :label="$t('submittedTasks.search.submitTime')">
            <a-range-picker
              v-model:value="searchForm.submitTimeRange"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 280px;"
            />
          </a-form-item>
          <a-form-item :label="$t('submittedTasks.search.taskAuditStatus')">
            <a-select
              v-model:value="searchForm.taskAuditStatus"
              :placeholder="$t('submittedTasks.search.taskAuditStatusPlaceholder')"
              allow-clear
              style="width: 140px;"
            >
              <a-select-option
                v-for="option in taskAuditStatusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('submittedTasks.search.preAuditor')">
            <a-select
              v-model:value="searchForm.preWaiterId"
              :placeholder="$t('submittedTasks.search.preAuditorPlaceholder')"
              allow-clear
              style="width: 120px;"
            >
              <a-select-option
                v-for="item in waiterOptions"
                :key="item.id"
                :value="item.id"
              >
                {{ item.username }}
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
          <a-form-item :label="$t('submittedTasks.search.completedTaskCount')">
            <a-input-number
              v-model:value="searchForm.completedTaskCount"
              :min="0"
              :max="9999"
              :addon-after="$t('submittedTasks.search.times')"
              style="width: 100px!important"
            />
          </a-form-item>
          <a-form-item :label="$t('member.search.keyword')">
            <a-input
              v-model:value="searchForm.keyword"
              :placeholder="$t('member.search.keywordPlaceholder')"
              allow-clear
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
          <template v-if="column.key === 'taskAuditStatus'">
            {{ enumStore.getEnumText('TaskAuditStatus', record.taskAuditStatus) }}
          </template>
          <template v-if="column.key === 'preWaiterName'">
            {{ record.preWaiterName || '--' }}
          </template>
          <template v-if="column.key === 'waiterName'">
            {{ record.waiterName || '--' }}
          </template>
          <template v-if="column.key === 'member'">
            <div>
              <a-space>
                <a-typography-link @click="handleMemberDetail(record)">{{ record.nickname }}</a-typography-link>
                <a-tag color="green" v-if="record.isNew">new</a-tag>
              </a-space>
            </div>
            <div>{{ record.account }}</div>
            <div>
              <a-space class="group-name">
                <span>{{ record.groupName }}</span>
                <GroupOwner v-if="record.isOwner" />
              </a-space>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleView(record)">查看</a>
              <a-popconfirm
                title="确定要通过该任务吗？"
                @confirm="handleResolve(record)"
                v-if="record.taskAuditStatus === 'pending'"
              >
                <a>通过</a>
              </a-popconfirm>
              <a-popconfirm
                title="确定要拒绝该任务吗？"
                @confirm="handleReject(record)"
                v-if="record.taskAuditStatus === 'pending'"
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
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { get, post } from '@/utils/request'
import { useEnumStore } from '@/stores'
import { downloadByApi } from '@/utils/download'
import { encryptFilters, decryptFilters } from '@/utils/routeParamsEncryption'
import { useI18n } from 'vue-i18n'
import GroupOwner from '@/components/GroupOwner.vue'
const enumStore = useEnumStore()
const { t } = useI18n()

// 计算审核状态选项
const taskAuditStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  } 

  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('TaskAuditStatus')
})

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const detailVisible = ref(false)
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')
const currentRecord = ref(null)
const selectedRowKeys = ref([])
const waiterOptions = ref([])

// 搜索表单
const searchForm = reactive({
  taskName: '',
  channelId: undefined,
  taskAuditStatus: 'pending',
  preWaiterId: undefined,
  groupId: undefined,
  submitTimeRange: [],
  completedTaskCount: undefined,
  keyword: ''
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
    dataIndex: 'taskAuditStatus',
    key: 'taskAuditStatus'
  },
  {
    title: t('submittedTasks.list.preAuditor'),
    key: 'preWaiterName'
  },
  {
    title: t('submittedTasks.list.confirmAuditor'),
    key: 'waiterName'
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
    disabled: record.taskAuditStatus !== 'pending'
  })
}

// 获取并解密路由中的filters参数
const filtersParam = ref(null)
const getRouteFilters = () => {
  const encryptedFilters = route.query.filters
  if (encryptedFilters) {
    filtersParam.value = decryptFilters(encryptedFilters)
    Object.assign(searchForm, filtersParam.value)
    // 清除路由中的filters参数
    const query = { ...route.query }
    delete query.filters
    router.replace({ 
      path: route.path,
      query 
    })
  }
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
    taskAuditStatus: 'pending',
    preWaiterId: undefined,
    groupId: undefined,
    submitTimeRange: [],
    completedTaskCount: undefined,
    keyword: ''
  })
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 会员详情
const handleMemberDetail = (record) => {
  router.push(`/member/view/${record.memberId}`)
}

// 查看详情
const handleView = (record) => {
  // 将当前搜索条件加密
  const encryptedFilters = encryptFilters({
    ...searchForm,
    // 去掉日期范围对象，改用开始和结束时间字符串
    submitStartTime: searchForm.submitTimeRange?.[0],
    submitEndTime: searchForm.submitTimeRange?.[1],
    submitTimeRange: undefined,
  })
  
  // 跳转到详情页并传递加密后的filters参数
  router.push({
    path: `/submitted-tasks/detail/${record.id}`,
    query: { 
      type: 'confirm',
      filters: encryptedFilters
    }
  })
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
  const res = await post('taskSubmitted.batchConfirmAuditApprove', {
    ids: selectedRowKeys.value
  })
  if(res.code === 0) {
    message.success(t('submittedTasks.resolveSuccess'))
    tableData.value.forEach(item => {
      if(selectedRowKeys.value.includes(item.id)) {
        item.taskAuditStatus = 'approved'
      }
    })
    selectedRowKeys.value = []
    // loadData()
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
    message.error('请输入拒绝原因')
    return
  }

  rejectLoading.value = true;
  try {
    await post('taskSubmitted.batchConfirmAuditReject', {
      ids: selectedRowKeys.value,
      reason: rejectReason.value
    })
    message.success('审核拒绝成功')
    rejectVisible.value = false;
    tableData.value.forEach(item => {
      if(selectedRowKeys.value.includes(item.id)) {
        item.taskAuditStatus = 'rejected'
      }
    })
    selectedRowKeys.value = []
  } catch (error) {
    message.error(error.message)
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
    title: t('common.export'),
    content: t('common.confirmExportContent'),
    onOk: async () => {
      try {
        // 显示加载中提示
        const loadingMessage = message.loading(t('common.exporting'), 0)
        
        // 构建导出参数，使用当前的筛选条件
        const params = {
          taskName: searchForm.taskName,
          channelId: searchForm.channelId,
          taskAuditStatus: searchForm.taskAuditStatus,
          preWaiterId: searchForm.preWaiterId,
          groupId: searchForm.groupId,
          submitStartTime: searchForm.submitTimeRange?.[0],
          submitEndTime: searchForm.submitTimeRange?.[1],
          completedTaskCount: searchForm.completedTaskCount,
          keyword: searchForm.keyword
        }
        
        // 调用下载API
        await downloadByApi('taskSubmitted.confirmAuditExport', params, `复审列表_${new Date().toLocaleDateString()}.xlsx`)
        
        // 关闭加载提示
        loadingMessage()
        
        // 显示成功提示
        message.success(t('common.exportSuccess'))
      } catch (error) {
        console.error('导出失败:', error)
        message.error(t('common.exportFailed'))
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
      taskAuditStatus: searchForm.taskAuditStatus,
      preWaiterId: searchForm.preWaiterId,
      groupId: searchForm.groupId,
      submitStartTime: searchForm.submitTimeRange?.[0],
      submitEndTime: searchForm.submitTimeRange?.[1],
      completedTaskCount: searchForm.completedTaskCount,
      keyword: searchForm.keyword
    }
    const res = await get('taskSubmitted.confirmAuditList', {
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

const loadWaiterOptions = async () => {
  if(waiterOptions.value.length) return
  const res = await get('waiter.list', {
    page: 1,
    pageSize: 100
  })
  if(res.code === 0){
    waiterOptions.value = res.data.list || []
  }
}

// 初始化
onMounted(() => {
  // 获取并解密filters参数
  getRouteFilters()
  loadData()
  loadGroupOptions()
  loadChannelOptions()
  loadWaiterOptions()
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