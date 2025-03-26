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
                v-model:value="searchForm.accountAuditStatus"
                placeholder="请选择审核状态"
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
            <a-form-item label="所属群组">
              <a-select
                v-model:value="searchForm.groupId"
                placeholder="请选择群组"
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
        :columns="searchForm.accountAuditStatus === 'rejected' ? columns2 : (searchForm.accountAuditStatus === 'pending' ? columns1 : columns)"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        rowKey="id"
        :row-selection="{ selectedRowKeys: selectedKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'account'">
            <a-space>
              <a-avatar :src="record.channelIcon" size="small" />
              <span>{{ record.account }}</span>
            </a-space>
          </template>
          <template v-if="column.key === 'accountInfo'">
            <div class="account-info">
              <div class="home-url">
                <div class="link-text-container">
                  <span class="label">主页：</span>
                  <a :href="record.homeUrl" target="_blank" class="link-text">{{ record.homeUrl }}</a>
                  <a-button type="link" size="small" @click="handleCopy(record.homeUrl)">
                    复制
                  </a-button>
                </div>
              </div>
              <div class="stats">
                <div class="stat-item" v-if="record.channelCustomFields.includes('fansCount')">粉丝数：{{ record.fansCount }}</div>
                <div class="stat-item" v-if="record.channelCustomFields.includes('friendsCount')">好友数：{{ record.friendsCount }}</div>
                <div class="stat-item" v-if="record.channelCustomFields.includes('postsCount')">发帖数：{{ record.postsCount }}</div>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'member'">
            <div>
              <div>{{ record.memberNickname }}</div>
              <div class="group-name">
                <span>{{ record.groupName }}</span>
                <a-tag v-if="record.isGroupOwner" color="blue" style="margin-left: 10px;">群主</a-tag>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'accountAuditStatus'">
            {{ enumStore.getEnumText('AccountAuditStatus', record.accountAuditStatus) }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-popconfirm
                title="确定要通过该账号吗？"
                @confirm="handleResolve(record)"
                v-if="record.accountAuditStatus === 'pending'"
              >
                <a>通过</a>
              </a-popconfirm>
              <a-popconfirm
                title="确定要拒绝该账号吗？"
                @confirm="handleReject(record)"
                v-if="record.accountAuditStatus === 'pending'"
              >
                <a class="danger">拒绝</a>
              </a-popconfirm>
            </a-space>
          </template>
          <template v-if="column.key === 'rejectReason'">
            {{ record.rejectReason }}
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
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { get, post } from '@/utils/request'
import { useEnumStore } from '@/stores'

const enumStore = useEnumStore()

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
const selectedKeys = ref([])
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')

// 搜索表单
const searchForm = reactive({
  account: '',
  channelId: undefined,
  accountAuditStatus: 'pending',
  groupId: undefined
})

// 渠道选项
const channelOptions = ref([])

// 群组选项
const groupOptions = ref([])

// 表格列配置
const columns = [
  {
    title: '账号名称',
    key: 'account'
  },
  {
    title: '账号详情',
    key: 'accountInfo'
  },
  {
    title: '会员信息',
    key: 'member'
  },
  {
    title: '审核状态',
    dataIndex: 'accountAuditStatus',
    key: 'accountAuditStatus'
  }
]
const columns1 = [
  ...columns,
  {
    title: '操作',
    key: 'action',
  }
]
const columns2 = [
  ...columns,
  {
    title: '拒绝原因',
    key: 'rejectReason',
  }
]

// 表格数据
const tableData = ref([])
// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 选择行变化
const onSelectChange = (keys) => {
  selectedKeys.value = keys
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
  searchForm.accountAuditStatus = undefined
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
const handleResolve = async (record) => {
  selectedKeys.value = [record.id]
  handleBatchResolve()
}

// 批量审核通过
const handleBatchResolve = async () => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要通过的账号')
    return
  }
  const res = await post('account.batchResolve', {
    ids: selectedKeys.value
  })
  if(res.code === 0) {
    const failed = res.data.failed.map(item => item.reason).join(',')
    if(failed) {
      Modal.error({
        title: '操作失败，失败原因',
        content: failed,
      });
    } else {
      message.success('操作成功')
      selectedKeys.value = []
      loadData()
    }
  } else {
    message.error(res.message)
  }
}

// 批量拒绝
const handleBatchReject = async() => {
  if (!selectedKeys.value.length) {
    message.warning('请选择要拒绝的账号')
    return
  }
  rejectReason.value = ''
  rejectVisible.value = true
}

// 审核拒绝
const handleReject = (record) => {
  selectedKeys.value = [record.id]
  rejectReason.value = ''
  rejectVisible.value = true
}

// 确认拒绝
const handleRejectConfirm = async () => {
  if (!rejectReason.value) {
    message.error('请输入拒绝原因')
    return
  }
  rejectLoading.value = true
  try {
    const res = await post('account.batchReject', {
      ids: selectedKeys.value,
      rejectReason: rejectReason.value
    })
    if(res.code === 0) {
      message.success('操作成功')
      selectedKeys.value = []
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

// 复制链接
const handleCopy = (url) => {
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