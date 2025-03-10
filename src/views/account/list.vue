<template>
  <div class="account content-container">
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
          <template v-if="column.key === 'accountInfo'">
            <div class="account-info">
              <div class="home-url">
                <div class="link-text-container">
                  <span class="label">主页：</span>
                  <a :href="record.homeUrl" target="_blank" class="link-text">{{ record.homeUrl }}</a>
                  <a-button type="link" size="small" @click="copyLink(record.homeUrl)">
                    复制
                  </a-button>
                </div>
              </div>
              <div class="stats">
                <div class="stat-item">粉丝数：{{ record.fansCount }}</div>
                <div class="stat-item">发帖数：{{ record.postsCount }}</div>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'member'">
            <div>
              <div>{{ record.memberNickname }}</div>
              <div class="group-name">{{ record.groupName }}</div>
            </div>
          </template>
          <template v-if="column.key === 'auditStatus'">
            <a-tag :color="getAccountAuditStatusColor(record.auditStatus)">
              {{ getAccountAuditStatusText(record.auditStatus) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
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
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import {
  AccountAuditStatus,
  AccountAuditStatusLang,
  AccountAuditStatusColor,
  getLangText
} from '@/constants/enums'
import { get } from '@/utils/request'

const { locale } = useI18n()
const loading = ref(false)
const selectedKeys = ref([])
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
const channelOptions = ref([])

// 群组选项
const groupOptions = ref([])

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
    title: '账号信息',
    key: 'accountInfo'
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
  return getLangText(AccountAuditStatusLang, status, locale.value)
}

// 获取状态颜色
const getAccountAuditStatusColor = (status) => {
  return AccountAuditStatusColor[status]
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
    const res = await get('account.list', {
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

// 复制链接
const copyLink = (url) => {
  navigator.clipboard.writeText(url).then(() => {
    message.success('复制成功')
  }).catch(() => {
    message.error('复制失败')
  })
}

// 初始化
onMounted(() => {
  loadData()
  loadGroupOptions()
  loadChannelOptions()
})
</script>

<style lang="less" scoped>
.account {
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

    .home-url {
      display: flex;
      align-items: center;
      
      .label {
        white-space: nowrap;
        margin-right: 4px;
      }
    }

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
  }
}
</style> 