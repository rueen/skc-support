<template>
  <div class="account content-container">
    <div class="table-container">
      <div class="table-header">
        <a-form layout="inline" :model="searchForm">
          <a-form-item :label="$t('account.search.account')">
            <a-input
              v-model:value="searchForm.keyword"
              :placeholder="$t('account.search.accountPlaceholder')"
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="$t('account.search.channel')">
            <a-select
              v-model:value="searchForm.channelId"
              :placeholder="$t('account.search.channelPlaceholder')"
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
          <a-form-item :label="$t('account.search.auditStatus')">
            <a-select
              v-model:value="searchForm.accountAuditStatus"
              :placeholder="$t('account.search.auditStatusPlaceholder')"
              style="width: 120px"
              allow-clear
            >
              <a-select-option
                v-for="option in accountAuditStatusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('account.search.group')">
            <a-select
              v-model:value="searchForm.groupId"
              :placeholder="$t('account.search.groupPlaceholder')"
              style="width: 120px"
              allow-clear
              show-search
              :filter-option="false"
              @search="loadGroupOptions"
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
          <a-form-item :label="$t('account.search.member')">
            <a-select
              v-model:value="searchForm.memberId"
              :placeholder="$t('account.search.memberPlaceholder')"
              style="width: 120px"
              allow-clear
              show-search
              :filter-option="false"
              @search="loadMemberOptions"
            >
              <a-select-option
                v-for="item in memberOptions"
                :key="item.id"
                :value="item.id"
              >
                {{ item.nickname }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" @click="handleSearch">{{ $t('common.search') }}</a-button>
              <a-button @click="handleReset">{{ $t('common.reset') }}</a-button>
            </a-space>
          </a-form-item>
        </a-form>
        <div style="width: 100%;display: flex;justify-content: space-between;">
          <a-button @click="openOldAccount">{{ $t('account.list.oldAccount') }}</a-button>
          <div class="right">
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
          <template v-if="column.key === 'accountInfo'">
            <div class="account-info">
              <a-space>
                <a-avatar :src="record.channelIcon" size="small" />
                <span>{{ record.account }}</span>
              </a-space>
              <div>
                <div class="link-text-container">
                  <span class="label">{{ $t('account.list.homepage') }}：</span>
                  <CopyContent :content="record.homeUrl">
                    <a-typography-link>
                      <a :href="record.homeUrl" target="_blank">{{ record.homeUrl }}</a>
                    </a-typography-link>
                  </CopyContent>
                </div>
              </div>
              <div>
                <span class="label">uid：</span>
                <CopyContent :content="record.uid" />
              </div>
              <div class="stats">
                <div class="stat-item" v-if="record.channelCustomFields.includes('fansCount')">{{ $t('account.list.fansCount') }}：{{ record.fansCount }}</div>
                <div class="stat-item" v-if="record.channelCustomFields.includes('friendsCount')">{{ $t('account.list.friendsCount') }}：{{ record.friendsCount }}</div>
                <div class="stat-item" v-if="record.channelCustomFields.includes('postsCount')">{{ $t('account.list.postsCount') }}：{{ record.postsCount }}</div>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'member'">
            <div>
              <div>
                <a-typography-link @click="handleMemberDetail(record)">{{ record.memberNickname }}</a-typography-link>
              </div>
              <a-space class="group-name">
                <span>{{ record.groupName }}</span>
                <GroupOwner v-if="record.isGroupOwner" />
              </a-space>
            </div>
          </template>
          <template v-if="column.key === 'accountAuditStatus'">
            {{ enumStore.getEnumText('AccountAuditStatus', record.accountAuditStatus) }}
            <info-circle-outlined 
              v-if="record.accountAuditStatus === 'rejected'" 
              class="danger"
              @click="showRejectReason(record)"
            />
          </template>
          <template v-if="column.key === 'waiterName'">
            {{ record.waiterName || '--' }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-popconfirm
                :title="$t('account.list.resolveConfirm')"
                @confirm="handleResolve(record)"
                v-if="record.accountAuditStatus === 'pending'"
              >
                <a>{{ $t('account.list.resolve') }}</a>
              </a-popconfirm>
              <a-popconfirm
                :title="$t('account.list.rejectConfirm')"
                @confirm="handleReject(record)"
                v-if="record.accountAuditStatus === 'pending'"
              >
                <a class="danger">{{ $t('account.list.reject') }}</a>
              </a-popconfirm>
              <a @click="handleEdit(record)">{{ $t('common.edit') }}</a>
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

    <!-- 拒绝原因弹窗 -->
    <a-modal
      v-model:open="rejectVisible"
      :title="$t('account.list.rejectReason')"
      @ok="handleRejectConfirm"
      :confirmLoading="rejectLoading"
    >
      <a-textarea
        v-model:value="rejectReason"
        :placeholder="$t('account.list.rejectReasonPlaceholder')"
        :rows="4"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { get, post, del } from '@/utils/request'
import { useEnumStore } from '@/stores'
import CopyContent from '@/components/CopyContent.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GroupOwner from '@/components/GroupOwner.vue'
import { downloadByApi } from '@/utils/download'

const router = useRouter()
const enumStore = useEnumStore()
const { t } = useI18n()

// 计算审核状态选项
const accountAuditStatusOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }

  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('AccountAuditStatus')
})

const loading = ref(false)
const selectedRowKeys = ref([])
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')

// 搜索表单
const searchForm = reactive({
  keyword: '',
  channelId: undefined,
  accountAuditStatus: 'pending',
  groupId: undefined,
  memberId: undefined
})

// 渠道选项
const channelOptions = ref([])
// 群组选项
const groupOptions = ref([])
// 会员选项
const memberOptions = ref([])

// 表格列配置
const columns = computed(() => [
  {
    title: t('account.list.accountInfo'),
    key: 'accountInfo',
    width: 500
  },
  {
    title: t('account.list.memberInfo'),
    key: 'member'
  },
  {
    title: t('account.list.submitTime'),
    dataIndex: 'submitTime',
    key: 'submitTime'
  },
  {
    title: t('account.list.auditStatus'),
    dataIndex: 'accountAuditStatus',
    key: 'accountAuditStatus'
  },
  {
    title: t('account.list.waiterName'),
    key: 'waiterName'
  },
  {
    title: t('account.list.action'),
    key: 'action',
  }
])

// 表格选择配置
const rowSelection = {
  selectedRowKeys,
  onChange: (keys) => {
    selectedRowKeys.value = keys
  },
  getCheckboxProps: (record) => ({
    disabled: record.accountAuditStatus !== 'pending'
  })
}

// 表格数据
const tableData = ref([])
// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.channelId = undefined
  searchForm.accountAuditStatus = undefined
  searchForm.groupId = undefined
  searchForm.memberId = undefined
  handleSearch()
}

// 会员详情
const handleMemberDetail = (record) => {
  router.push(`/member/view/${record.memberId}`)
}

const handleEdit = (record) => {
  router.push({
    name: 'AccountEdit',
    params: {
      id: record.id
    }
  })
}

// 显示拒绝原因
const showRejectReason = (record) => {
  Modal.error({
    content: record.rejectReason,
  });
}

// 打开老账号管理
const openOldAccount = () => {
  router.push('/account/old')
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, {
    current: pag.current,
    pageSize: pag.pageSize
  })
  loadData()
}

// 审核通过
const handleResolve = async (record) => {
  selectedRowKeys.value = [record.id]
  handleBatchResolve()
}

// 批量审核通过
const handleBatchResolve = async () => {
  if (!selectedRowKeys.value.length) {
    message.warning(t('account.list.message.selectAccount'))
    return
  }
  const res = await post('account.batchResolve', {
    ids: selectedRowKeys.value
  })
  if(res.code === 0) {
    const failed = res.data.failed.map(item => item.reason).join(',')
    if(failed) {
      Modal.error({
        title: t('account.list.batchRejectFailedTitle'),
        content: failed,
      });
    } else {
      message.success(t('account.list.message.success'))
      selectedRowKeys.value = []
      loadData()
    }
  } else {
    message.error(res.message)
  }
}

// 批量拒绝
const handleBatchReject = async() => {
  if (!selectedRowKeys.value.length) {
    message.warning(t('account.list.message.selectAccount'))
    return
  }
  rejectReason.value = ''
  rejectVisible.value = true
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
    message.error(t('account.list.message.rejectReason'))
    return
  }
  rejectLoading.value = true
  try {
    const res = await post('account.batchReject', {
      ids: selectedRowKeys.value,
      rejectReason: rejectReason.value
    })
    if(res.code === 0) {
      message.success(t('account.list.message.success'))
      selectedRowKeys.value = []
      rejectVisible.value = false
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log(error)
  } finally {
    rejectLoading.value = false
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    const res = await get('account.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm
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

const loadChannelOptions = async () => {
  const res = await get('channel.list')
  if(res.code === 0){
    channelOptions.value = res.data.list
  } 
}

// 获取群组列表
const loadGroupOptions = async (keyword = '') => {
  try {
    const res = await get('group.list', {
      page: 1,
      pageSize: 50,
      groupName: keyword
    })  
    if(res.code === 0){
      groupOptions.value = res.data.list || []
    }
  } catch (error) {
    message.error('获取群组列表失败')
  }
}

const loadMemberOptions = async (keyword = '') => {
  const res = await get('member.list', {
    page: 1,
    pageSize: 50,
    memberNickname: keyword
  })
  if(res.code === 0){
    memberOptions.value = res.data.list || []
  }
}

// 删除账号
const handleDelete = async (record) => {
  const res = await del('account.delete', {}, {
    urlParams: {
      id: record.id
    }
  })
  if(res.code === 0) {
    message.success(res.message)
    loadData()
  } else {
    message.error(res.message)
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
          taskPreAuditStatus: searchForm.taskPreAuditStatus,
          groupId: searchForm.groupId,
          submitStartTime: searchForm.submitTimeRange?.[0],
          submitEndTime: searchForm.submitTimeRange?.[1],
          completedTaskCount: searchForm.completedTaskCount
        }
        // 调用下载API
        await downloadByApi('account.export', params, `账号列表_${new Date().toLocaleDateString()}.xlsx`)
        
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

// 初始化
onMounted(() => {
  loadData()
  loadGroupOptions()
  loadChannelOptions()
  loadMemberOptions()
})
</script>

<style lang="less" scoped>
.account {
  .label{
    white-space: nowrap;
  }
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

  .account-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;

    .stats {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);

      .stat-item {
        white-space: nowrap;
      }
    }
    .edit-icon{
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      &:hover{
        color: #1890ff;
      }
    }
  }
}
</style> 