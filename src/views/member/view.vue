<template>
  <div class="member-view content-container">
    <page-header
      :title="$t('member.view.pageTitle')"
      :back="true"
      :useDefaultBack="false"
      @back="handleGoBack"
    />
    <div class="detail-container">
      <!-- 会员信息 -->
      <div class="section">
        <div class="section-title">{{ $t('member.view.memberInfo') }}</div>
        <a-descriptions :column="{ xs: 1, sm: 1, md: 1, lg: 2 }">
          <a-descriptions-item :label="$t('member.view.memberNickname')">
            <a-space>
              <a-avatar :src="memberInfo.avatar" size="small">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <span>{{ memberInfo.nickname }}</span>
              <a-tag color="green" v-if="memberInfo.isNew">new</a-tag>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.memberAccount')">
            {{ memberInfo.account }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.gender')">
            {{ enumStore.getEnumText('GenderType', memberInfo.gender) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.occupation')">
            {{ enumStore.getEnumText('OccupationType', memberInfo.occupation) }}
            <span v-if="memberInfo.occupation === null"> - </span>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.email')">
            {{ memberInfo.email || '-' }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.phone')">
            {{ memberInfo.phone || '-' }}
          </a-descriptions-item>
          <a-descriptions-item label="Line" v-if="site === 'Japan'">
            {{ memberInfo.line || '-' }}
          </a-descriptions-item>
          <a-descriptions-item label="Telegram" v-else>
            {{ memberInfo.telegram || '-' }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.group')">
            <a-space v-for="item in memberInfo.groups" :key="item.id">
              {{ item.groupName }}
              <GroupOwner v-if="item.isOwner" />
            </a-space>
            <span v-if="!memberInfo.groups || !memberInfo.groups.length"> - </span>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.inviter')">
            {{ memberInfo.inviterNickname || '-' }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.inviteUrl')">
            <CopyContent :content="inviteUrl" />
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.withdrawalsAccount')">  
            <a-space>
              <span>{{ memberInfo?.withdrawalsAccount?.paymentChannelName || '-' }}</span>
              <span>{{ memberInfo?.withdrawalsAccount?.account || '-' }}</span>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.view.balance')">
            <div style="display: flex;flex-wrap: wrap;align-items: center;">
              <span>{{ memberInfo.balance }}</span>
              <a-button type="link" size="small" @click="viewBalanceLogs()">
                {{ $t('member.view.balanceLogs.view') }}
              </a-button>
              <a-button type="primary" size="small" @click="handleReward()" style="margin-left: 16px;">
                <PlusOutlined />
                {{ $t('member.view.rewardGrant') }}
              </a-button>
              <a-button size="small" danger @click="handleDeduct()" style="margin-left: 16px;">
                <MinusOutlined />
                {{ $t('member.view.rewardDeduct') }}
              </a-button>
            </div>
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <!-- 账号信息 -->
      <div class="section">
        <div class="section-title">{{ $t('member.view.accountInfo') }}</div>
        <div class="account-list">
          <div v-for="account in accountList" :key="account.channelId">
            <a-descriptions :column="1">
              <a-descriptions-item :label="$t('member.view.account')">
                <a-space :size="24">
                  <a-space>
                    <a-avatar :src="account.channelIcon" size="small" />
                    <span>{{ account.account }}</span>
                    <a-tag color="warning">{{ enumStore.getEnumText('AccountAuditStatus', account.accountAuditStatus) }}</a-tag>
                  </a-space>
                  <EditOutlined @click="handleEditAccount(account)" />
                  <DeleteOutlined @click="handleDeleteAccount(account)" />
                </a-space>
              </a-descriptions-item>
              <a-descriptions-item :label="$t('member.view.homepage')">
                <CopyContent :content="account.homeUrl">
                  <div class="link-text-container" style="max-width: 300px;">
                    <a :href="account.homeUrl" target="_blank" class="link-text">{{ account.homeUrl }}</a>
                  </div>  
                </CopyContent>
              </a-descriptions-item>
              <a-descriptions-item :label="account.channelName === 'Facebook' ? 'UID' : 'User Name'">
                <CopyContent :content="account.uid" />
              </a-descriptions-item>
              <a-descriptions-item :label="$t('member.view.fansCount')" v-if="account.channelCustomFields.includes('fansCount')"  >{{ account.fansCount }}</a-descriptions-item>
              <a-descriptions-item :label="$t('member.view.friendsCount')" v-if="account.channelCustomFields.includes('friendsCount')">{{ account.friendsCount }}</a-descriptions-item>
              <a-descriptions-item :label="$t('member.view.postsCount')" v-if="account.channelCustomFields.includes('postsCount')">{{ account.postsCount }}</a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </div>

      <!-- 任务信息 -->
      <div class="section" style="padding-bottom: 24px;">
        <div class="section-title">{{ $t('member.view.taskStats') }}</div>
        <a-row>
          <a-col :span="6" :xs="{ span: 12 }" :sm="{ span: 8 }">
            <a-statistic :title="$t('member.view.completedTaskCount')" :value="taskStats.completedTaskCount" />
          </a-col>
          <a-col :span="6" :xs="{ span: 12 }" :sm="{ span: 8 }">
            <a-statistic 
              :title="$t('member.view.taskReward')" 
              :value="taskStats.totalTaskReward" 
              :precision="2"
            />
          </a-col>
        </a-row>
      </div>

      <!-- 邀请信息 -->
      <div class="section" style="padding-bottom: 24px;">
        <div class="section-title">{{ $t('member.view.inviteStats') }}</div>
        <a-row>
          <a-col :span="6" :xs="{ span: 12 }" :sm="{ span: 8 }">
            <a-statistic
              :title="$t('member.view.inviteCount')"
              :value="inviteStats.inviteCount"
            />
          </a-col>
          <a-col :span="6" :xs="{ span: 12 }" :sm="{ span: 8 }">
            <a-statistic
              :title="$t('member.view.inviteReward')"
              :value="inviteStats.totalReward"
            />
          </a-col>
        </a-row>
      </div>

      <!-- 群组信息 -->
      <div class="section">
        <div class="section-title">{{ $t('member.view.groupStats') }}</div>
        <a-row>
          <a-col :span="6" :xs="{ span: 12 }" :sm="{ span: 8 }">
            <a-statistic
              :title="$t('member.view.groupCount')"
              :value="groupsStats.groupCount"
            />
          </a-col>
          <a-col :span="6" :xs="{ span: 12 }" :sm="{ span: 8 }">
            <a-statistic
              :title="$t('member.view.groupEarnings')"
              :value="groupsStats.totalCommission"
            />
          </a-col>
        </a-row>
      </div>

    </div>
    <!-- 奖励发放弹窗 -->
    <a-modal
      v-model:open="rewardVisible"
      :title="rewardType === 'grant' ? $t('member.view.rewardGrant') : $t('member.view.rewardDeduct')"
      @ok="handleRewardConfirm"
      :confirmLoading="rewardLoading"
    > 
      <a-form
        ref="rewardFormRef"
        :model="rewardForm"
        :rules="rewardRules"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item :label="rewardType === 'grant' ? $t('member.view.rewardAmount') : $t('member.view.deductAmount')" name="amount">
          <a-input v-model:value="rewardForm.amount" />
        </a-form-item>
        <a-form-item :label="$t('member.view.relatedTask')">
          <a-select
            v-model:value="rewardForm.relatedTaskId"
            :placeholder="$t('common.selectPlaceholder')"
            allow-clear
            show-search
            :filter-option="false"
            @search="getRelatedTaskOptions"
          >
            <a-select-option
              v-for="item in relatedTaskOptions"
              :key="item.taskId"
              :value="item.taskId"
            >
              {{ item.taskName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('member.view.remark')" name="remark">
          <a-textarea v-model:value="rewardForm.remark" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 余额变动记录弹窗 -->
    <a-modal
      v-model:open="balanceLogsVisible"
      :title="$t('member.view.balanceLogs.title')"
      :width="800"
    >
      <a-table
        size="small"
        :columns="balanceLogsColumns"
        :data-source="balanceLogsData"
        :pagination="pagination"
        :scroll="{ y: 400 }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'transactionType'">
            <a-typography-text type="danger" v-if="record.transactionType === 'withdrawal_refund'">余额退还</a-typography-text>
            <span v-else>{{ record.transactionType }}</span>
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { get, post, del } from '@/utils/request'
import { useEnumStore } from '@/stores'
import config from '@/config/env'
import CopyContent from '@/components/CopyContent.vue'
import { useI18n } from 'vue-i18n'
import GroupOwner from '@/components/GroupOwner.vue'

const siteConfig = __SITE_CONFIG__;
const site = siteConfig.site;

const { t } = useI18n()
const enumStore = useEnumStore()
const route = useRoute()
const router = useRouter()
// 会员信息
const memberId = ref('')
const memberInfo = reactive({})
const accountList = ref([])
const inviteUrl = computed(() => {
  return `${config.h5Url}?inviteCode=${memberInfo.inviteCode}`
})

// 任务信息
const taskStats = reactive({})
// 邀请信息
const inviteStats = reactive({})
// 群组信息
const groupsStats = reactive({})

// 奖励发放弹窗
const rewardFormRef = ref()
const rewardVisible = ref(false)
const rewardType = ref('grant')
const rewardForm = reactive({
  amount: '',
  remark: '',
  relatedTaskId: null
})
const rewardLoading = ref(false)
const rewardRules = ref({
  amount: [{ required: true, message: t('member.view.amountRequired') }],
  remark: [{ required: true, message: t('member.view.remarkRequired') }]
})

// 自定义返回按钮事件
const handleGoBack = () => {
  const queryParams = {};
  if(route.query.filters){
    queryParams.filters = route.query.filters;
  }
  router.push({
    name: 'MemberList',
    query: queryParams
  })
}

// 获取会员详情
const getMemberDetail = async () => {
  const res = await get('member.detail', {}, {
    urlParams: {
      id: memberId.value
    }
  })
  if(res.code === 0){
    Object.assign(memberInfo, res.data || {})
  }
}

// 获取会员余额
const getMemberBalance = async () => {
  const res = await get('member.balance', {}, {
    urlParams: {
      memberId: memberId.value
    }
  })
  if(res.code === 0){
    memberInfo.balance = res.data.balance
  }
}

// 获取会员提现账号
const getMemberWithdrawalsAccount = async () => {
  const res = await get('member.withdrawalsAccount', {}, {
    urlParams: {
      memberId: memberId.value
    }
  })
  if(res.code === 0){
    memberInfo.withdrawalsAccount = res.data[0] || {}
  }
}
// 获取账号列表
const getAccountList = async () => {
  const res = await get('account.list', {
    memberId: memberId.value
  })
  if(res.code === 0){
    accountList.value = res.data.list || []
  }
}

// 编辑账号
const handleEditAccount = (account) => {
  router.push({
    name: 'AccountEdit',
    params: { id: account.id }
  })
}
// 删除账号
const handleDeleteAccount = (account) => {
  Modal.confirm({
    content: t('common.deleteConfirm'),
    onOk: async () => {
      const res = await del('account.delete', {}, {
        urlParams: {
          id: account.id
        }
      })
      if(res.code === 0) {
        message.success(res.message)
        getAccountList()
      } else {
        message.error(res.message)
      }
    }
  })
}
// 获取任务信息
const getTaskStats = async () => {
  const res = await get('member.taskStats', {}, {
    urlParams: {
      memberId: memberId.value
    }
  })
  if(res.code === 0){
    Object.assign(taskStats, res.data || {})
  }
}
// 获取邀请信息
const getInviteInfo = async () => {
  const res = await get('member.inviteStats', {}, {
    urlParams: {
      memberId: memberId.value
    }
  })
  if(res.code === 0){
    Object.assign(inviteStats, res.data || {})
  }
}

// 获取群组信息
const getGroupsStats = async () => {
  const res = await get('member.groupsStats', {}, {
    urlParams: {
      memberId: memberId.value
    }
  })
  if(res.code === 0){
    Object.assign(groupsStats, res.data || {})
  }
}

// 获取关联任务列表
const relatedTaskOptions = ref([])
const getRelatedTaskOptions = async (taskName = '') => {
  const res = await get('taskSubmitted.preAuditList', {
    page: 1,
    pageSize: 30,
    keyword: memberInfo.account,
    taskName: taskName,
    sorterField: 'preAuditTime',
    sorterOrder: 'descend'
  })
  if(res.code === 0){
    relatedTaskOptions.value = res.data.list || []
  }
}

// 奖励发放
const handleReward = () => {
  rewardVisible.value = true
  rewardType.value = 'grant';
  getRelatedTaskOptions()
}

// 奖励扣除
const handleDeduct = () => {
  rewardVisible.value = true
  rewardType.value = 'deduct';
  getRelatedTaskOptions()
}

// 查看余额变动记录
const balanceLogsVisible = ref(false)
const balanceLogsColumns = ref([
  {
    title: t('member.view.balanceLogs.beforeBalance'),
    dataIndex: 'beforeBalance',
    key: 'beforeBalance',
    width: 120
  },
  {
    title: t('member.view.balanceLogs.amount'),
    dataIndex: 'amount',
    key: 'amount',
    width: 120
  },
  {
    title: t('member.view.balanceLogs.afterBalance'),
    dataIndex: 'afterBalance',
    key: 'afterBalance',
    width: 120
  },
  {
    title: t('member.view.balanceLogs.transactionType'),
    key: 'transactionType'
  },
  {
    title: t('member.view.balanceLogs.createTime'),
    dataIndex: 'createTime',
    key: 'createTime'
  }
])
const balanceLogsData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  viewBalanceLogs()
}

const viewBalanceLogs = async () => {
  balanceLogsVisible.value = true
  const res = await get('member.balanceLogs', {
    page: pagination.current,
    pageSize: pagination.pageSize
  }, {
    urlParams: {
      memberId: memberId.value
    }
  })
  if(res.code === 0){
    balanceLogsData.value = res.data.list || [];
    pagination.total = res.data.total || 0;
  }
}

// 奖励发放
const handleGrantReward = async () => {
  rewardLoading.value = true
  try {
    const params = {
      memberId: memberId.value,
      amount: rewardForm.amount,
      remark: rewardForm.remark,
    }
    if(rewardForm.relatedTaskId){
      params.taskId = rewardForm.relatedTaskId
    }
    const res = await post('member.grantReward', {
      ...params
    })
    if(res.code === 0){
      message.success('奖励发放成功')
      rewardVisible.value = false;
      getMemberBalance()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('奖励发放失败')
  } finally {
    rewardLoading.value = false
  }
}

// 奖励扣除
const handleDeductReward = async () => {
  rewardLoading.value = true
  try {
    const params = {
      memberId: memberId.value,
      amount: rewardForm.amount,
      remark: rewardForm.remark,
    }
    if(rewardForm.relatedTaskId){
      params.taskId = rewardForm.relatedTaskId
    }
    const res = await post('member.deductReward', {
      ...params
    }, {
      urlParams: {
        memberId: memberId.value
      }
    })
    if(res.code === 0){
      message.success('奖励扣除成功')
      rewardVisible.value = false
      getMemberBalance()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('奖励扣除失败')
  } finally {
    rewardLoading.value = false
  }
}

// 奖励发放确认
const handleRewardConfirm = async () => {
  try {
    await rewardFormRef.value.validate()
    switch(rewardType.value){
      case 'grant':
      handleGrantReward()
      break
    case 'deduct':
      handleDeductReward()
        break
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  memberId.value = route.params.id
  getMemberDetail()
  getMemberBalance()
  getAccountList()
  getTaskStats()
  getInviteInfo()
  getGroupsStats()
  getMemberWithdrawalsAccount()
})
</script>

<style lang="less" scoped>
.member-view {
  .detail-container {
    padding: 24px;
    background-color: #fff;
    border-radius: 2px;
  }

  .section {
    margin-bottom: 24px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    .section-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 16px;
      text-align: left;
    }
  }

  :deep(.ant-descriptions-item-label) {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }

  :deep(.ant-descriptions-item-content) {
    color: rgba(0, 0, 0, 0.65);
  }

  .account-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }
}
</style> 