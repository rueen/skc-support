<template>
  <div class="account-audit content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="账号">
              <a-input
                v-model:value="searchForm.account"
                placeholder="请输入账号"
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
                  v-for="status in Object.values(AccountAuditStatus)"
                  :key="status"
                  :value="status"
                >
                  {{ getAccountAuditStatusText(status) }}
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
            <a-button type="primary" @click="handleBatchApprove">批量通过</a-button>
            <a-button danger @click="handleBatchReject">批量拒绝</a-button>
          </a-space>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        :row-selection="{ selectedRowKeys: selectedKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'member'">
            <div>
              <div>{{ record.memberNickname }}</div>
              <div class="group-name">{{ record.groupName }}</div>
            </div>
          </template>
          <template v-if="column.key === 'homeUrl'">
            <a-tooltip :title="record.homeUrl">
              <a :href="record.homeUrl" target="_blank" class="link-text">
                {{ record.homeUrl }}
              </a>
            </a-tooltip>
          </template>
          <template v-if="column.key === 'auditStatus'">
            <a-tag :color="getAccountAuditStatusColor(record.auditStatus)">
              {{ getAccountAuditStatusText(record.auditStatus) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleView(record)">查看</a>
              <a-popconfirm
                title="确定要通过该账号吗？"
                @confirm="handleApprove(record)"
                v-if="record.auditStatus === AccountAuditStatus.PENDING"
              >
                <a>通过</a>
              </a-popconfirm>
              <a-popconfirm
                title="确定要拒绝该账号吗？"
                @confirm="handleReject(record)"
                v-if="record.auditStatus === AccountAuditStatus.PENDING"
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
      title="账号详情"
      :footer="null"
    >
      <a-descriptions :column="1">
        <a-descriptions-item label="账号">{{ currentRecord?.account }}</a-descriptions-item>
        <a-descriptions-item label="平台渠道">{{ currentRecord?.channelName }}</a-descriptions-item>
        <a-descriptions-item label="主页链接">
          <a :href="currentRecord?.homeUrl" target="_blank">{{ currentRecord?.homeUrl }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="粉丝数">{{ currentRecord?.fansCount }}</a-descriptions-item>
        <a-descriptions-item label="发帖数">{{ currentRecord?.postsCount }}</a-descriptions-item>
        <a-descriptions-item label="会员名称">
          {{ currentRecord?.memberNickname }}
          <a-tag v-if="currentRecord?.isGroupOwner" color="blue">群主</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="所属群组">{{ currentRecord?.groupName }}</a-descriptions-item>
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
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import {
  AccountAuditStatus,
  AccountAuditStatusLang,
  AccountAuditStatusColor,
  getLangText
} from '@/constants/enums'

const { locale } = useI18n()
const loading = ref(false)
const selectedKeys = ref([])
const detailVisible = ref(false)
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')
const currentRecord = ref(null)

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: total => `共 ${total} 条`
})

// 搜索表单
const searchForm = reactive({
  account: '',
  channelId: undefined,
  auditStatus: undefined,
  groupId: undefined
})

// 渠道选项
const channelOptions = [
  { id: 1, name: '抖音' },
  { id: 2, name: '快手' }
]

// 群组选项
const groupOptions = [
  { id: 1, name: '群组1' },
  { id: 2, name: '群组2' }
]

// 表格列配置
const columns = [
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: '平台渠道',
    dataIndex: 'channelName',
    key: 'channelName'
  },
  {
    title: '主页链接',
    key: 'homeUrl',
    width: 200,
    ellipsis: true
  },
  {
    title: '粉丝数',
    dataIndex: 'fansCount',
    key: 'fansCount'
  },
  {
    title: '发帖数',
    dataIndex: 'postsCount',
    key: 'postsCount'
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
const tableData = ref([
  {
    id: 1,
    account: 'test123',
    channelName: '抖音',
    channelId: 1,
    homeUrl: 'https://example.com/test123',
    fansCount: 1000,
    postsCount: 50,
    memberNickname: '测试会员1',
    groupName: '群组1',
    auditStatus: AccountAuditStatus.PENDING
  }
])

// 选择行变化
const onSelectChange = (keys) => {
  selectedKeys.value = keys
}

// 获取状态文本
const getAccountAuditStatusText = (status) => {
  const map = {
    [AccountAuditStatus.PENDING]: '待审核',
    [AccountAuditStatus.APPROVED]: '已通过',
    [AccountAuditStatus.REJECTED]: '已拒绝'
  }
  return map[status] || status
}

// 获取状态颜色
const getAccountAuditStatusColor = (status) => {
  const map = {
    [AccountAuditStatus.PENDING]: 'warning',
    [AccountAuditStatus.APPROVED]: 'success',
    [AccountAuditStatus.REJECTED]: 'error'
  }
  return map[status]
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.account = ''
  searchForm.channelId = undefined
  searchForm.auditStatus = undefined
  searchForm.groupId = undefined
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, {
    current: pag.current,
    pageSize: pag.pageSize
  })
  loadData()
}

// 查看详情
const handleView = (record) => {
  currentRecord.value = record
  detailVisible.value = true
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
const handleBatchApprove = () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要通过的账号')
    return
  }
  // TODO: 实现批量审核通过逻辑
}

// 批量拒绝
const handleBatchReject = () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要拒绝的账号')
    return
  }
  // TODO: 实现批量拒绝逻辑
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

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    pagination.total = tableData.value.length
  } finally {
    loading.value = false
  }
}

// 初始化
loadData()
</script>

<style lang="less" scoped>
.account-audit {
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

  .link-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style> 