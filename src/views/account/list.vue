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
          <a-form-item :label="$t('account.search.submitTime')">
            <a-range-picker
              v-model:value="searchForm.submitTimeRange"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 280px;"
            />
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
          <a-form-item :label="$t('account.search.auditor')">
            <a-select
              v-model:value="searchForm.waiterId"
              :placeholder="$t('account.search.auditorPlaceholder')"
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
        :showSorterTooltip="false"
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
                      <a :href="formatUrl(record.homeUrl)" target="_blank">{{ record.homeUrl }}</a>
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
              <div v-for="item in record.groups">
                <a-space>
                  <span>{{ item.groupName }}</span>
                  <GroupOwner v-if="item.isOwner" />
                </a-space>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'accountAuditStatus'">
            {{ enumStore.getEnumText('AccountAuditStatus', record.accountAuditStatus) }}
          </template>
          <template v-if="column.key === 'rejectReason'">
            <a-typography-text type="danger" v-if="record.rejectReason">{{ record.rejectReason }}</a-typography-text>
            <span v-else>--</span>
          </template>
          <template v-if="column.key === 'waiterName'">
            {{ record.waiterName || '--' }}
          </template>
          <template v-if="column.key === 'auditTime'">
            {{ record.auditTime || '--' }}
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

      <div class="count-container" v-if="pagination.total">
        <a-descriptions :column="2">
          <a-descriptions-item :label="$t('common.totalCount')">
            {{ pagination.total }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
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
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GroupOwner from '@/components/GroupOwner.vue'
import { encryptFilters, decryptFilters } from '@/utils/routeParamsEncryption'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
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

/**
 * 获取当月时间范围
 * @returns {Array} 返回当月开始和结束时间的数组
 */
const getCurrentMonthRange = () => {
  const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
  const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss')
  return [startOfMonth, endOfMonth]
}

/**
 * 格式化URL为标准链接格式
 * @param {string} url - 原始URL
 * @returns {string} 格式化后的标准URL
 */
const formatUrl = (url) => {
  if (!url) return url
  
  // 如果已经是完整的URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // 转换为小写进行匹配，但保持原始大小写用于替换
  const lowerUrl = url.toLowerCase()
  
  // 处理TikTok链接
  if (lowerUrl.includes('tiktok.com')) {
    // 确保是www.tiktok.com格式
    let formattedUrl = url.replace(/^(.*?)tiktok\.com/i, 'www.tiktok.com')
    return `https://${formattedUrl}`
  }
  
  // 其他情况直接添加https://
  return `https://${url}`
}

// 获取并解密路由中的filters参数
const getRouteFilters = () => {
  const encryptedFilters = route.query.filters
  if (encryptedFilters) {
    const filtersParam = {};
    const filters = decryptFilters(encryptedFilters)
    Object.keys(filters).forEach(key => {
      if(key === 'current') {
        pagination.current = filters[key]
      } else {
        filtersParam[key] = filters[key]
      }
    })
    Object.assign(searchForm,{
      accountAuditStatus: null
    }, filtersParam)
    // 清除路由中的filters参数
    const query = { ...route.query }
    delete query.filters
    router.replace({ 
      path: route.path,
      query 
    })
  }
}

// 搜索表单
const searchForm = reactive({
  keyword: '',
  channelId: undefined,
  accountAuditStatus: 'pending',
  waiterId: undefined,
  groupId: undefined,
  memberId: undefined,
  submitTimeRange: getCurrentMonthRange()
})

// 渠道选项
const channelOptions = ref([])
// 群组选项
const groupOptions = ref([])
// 会员选项
const memberOptions = ref([])
const waiterOptions = ref([])

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
    key: 'submitTime',
    sorter: true,
  },
  {
    title: t('account.list.auditStatus'),
    dataIndex: 'accountAuditStatus',
    key: 'accountAuditStatus'
  },
  {
    title: t('account.list.rejectReason'),
    key: 'rejectReason'
  },
  {
    title: t('account.list.rejectTimes'),
    dataIndex: 'rejectTimes',
    key: 'rejectTimes'
  },
  {
    title: t('account.list.waiterName'),
    key: 'waiterName'
  },
  {
    title: t('account.list.auditTime'),
    dataIndex: 'auditTime',
    key: 'auditTime',
    sorter: true,
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
const sorter = reactive({
  sorterField: undefined,
  sorterOrder: undefined
})

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    keyword: '',
    channelId: undefined,
    accountAuditStatus: 'pending',
    waiterId: undefined,
    groupId: undefined,
    memberId: undefined,
    submitTimeRange: getCurrentMonthRange()
  })
  handleSearch()
}

// 会员详情
const handleMemberDetail = (record) => {
  router.push(`/member/view/${record.memberId}`)
}

const handleEdit = (record) => {
  // 将当前搜索条件加密
  const encryptedFilters = encryptFilters({
    ...searchForm,
    current: pagination.current
  })
  router.push({
    name: 'AccountEdit',
    params: {
      id: record.id
    },
    query: {
      filters: encryptedFilters
    }
  })
}

// 打开老账号管理
const openOldAccount = () => {
  router.push('/account/old')
}

// 表格变化
const handleTableChange = (pag, filters, _sorter) => {
  Object.assign(pagination, pag)
  Object.assign(sorter, {
    sorterField: _sorter.field,
    sorterOrder: _sorter.order
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
        content: `成功 ${res.data.successCount} 条，失败 ${res.data.failedCount} 条，失败原因：${failed}`,
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
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      keyword: searchForm.keyword,
      channelId: searchForm.channelId,
      accountAuditStatus: searchForm.accountAuditStatus,
      waiterId: searchForm.waiterId,
      groupId: searchForm.groupId,
      memberId: searchForm.memberId,
      submitStartTime: searchForm.submitTimeRange?.[0],
      submitEndTime: searchForm.submitTimeRange?.[1],
    }
    const res = await get('account.list', {
      ...params,
      ...sorter
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

const loadWaiterOptions = async () => {
  if(waiterOptions.value.length) return
  const res = await get('waiter.list', {
    page: 1,
    pageSize: 100
  })
  if(res.code === 0){
    const defaultWaiter = {
      id: 0,
      username: '无'
    }
    waiterOptions.value = [defaultWaiter, ...res.data.list] || [defaultWaiter]
  }
}

// 初始化
onMounted(() => {
  // 获取并解密filters参数
  getRouteFilters()
  loadData()
  loadGroupOptions()
  loadChannelOptions()
  loadMemberOptions()
  loadWaiterOptions()
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
.count-container{
  margin-top: -48px;
  width: 250px;
}
</style> 