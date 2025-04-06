<template>
  <div class="member-view content-container">
    <page-header
      title="会员详情"
      :back="true"
    />
    <div class="detail-container">
      <!-- 会员信息 -->
      <div class="section">
        <div class="section-title">会员信息</div>
        <a-descriptions :column="2">
          <a-descriptions-item label="会员昵称">
            {{ memberInfo.nickname }}
          </a-descriptions-item>
          <a-descriptions-item label="会员账号">
            {{ memberInfo.account }}
          </a-descriptions-item>
          <a-descriptions-item label="会员头像">
            <a-avatar :src="memberInfo.avatar" size="small">
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </a-descriptions-item>
          <a-descriptions-item label="性别">
            {{ enumStore.getEnumText('GenderType', memberInfo.gender) }}
          </a-descriptions-item>
          <a-descriptions-item label="职业">
            {{ enumStore.getEnumText('OccupationType', memberInfo.occupation) }}
            <span v-if="memberInfo.occupation === null"> - </span>
          </a-descriptions-item>
          <a-descriptions-item label="电子邮箱">
            {{ memberInfo.email || '-' }}
          </a-descriptions-item>
          <a-descriptions-item label="手机号码">
            {{ memberInfo.phone || '-' }}
          </a-descriptions-item>
          <a-descriptions-item label="Telegram">
            {{ memberInfo.telegram || '-' }}
          </a-descriptions-item>
          <a-descriptions-item label="所属群组">
            <div v-for="item in memberInfo.groups" :key="item.id">
              {{ item.groupName }}
              <a-tag v-if="item.isOwner" color="blue" style="margin-left: 8px">群主</a-tag>
            </div>
            <span v-if="!memberInfo.groups || !memberInfo.groups.length">未加入群组</span>
          </a-descriptions-item>
          <a-descriptions-item label="邀请人">
            {{ memberInfo.inviterNickname || '-' }}
          </a-descriptions-item>
          <a-descriptions-item label="邀请链接">
            <span>{{ inviteUrl }}</span>
            <a-button type="link" size="small" @click="handleCopy(inviteUrl)">
              复制
            </a-button>
          </a-descriptions-item>
          <a-descriptions-item label="账户余额">
            <a-space>
              <span>{{ memberInfo.balance }}</span>
              <a-button type="link" size="small" @click="handleReward()">
                奖励发放
              </a-button>
              <a-button type="link" size="small" @click="handleDeduct()">
                奖励扣除
              </a-button>
            </a-space>
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <!-- 账号信息 -->
      <div class="section">
        <div class="section-title">账号信息</div>
        <div class="account-list">
          <div v-for="account in accountList" :key="account.channelId">
            <a-descriptions :column="1">
              <a-descriptions-item label="账号">
                <a-space>
                  <a-avatar :src="account.channelIcon" size="small" />
                  <span>{{ account.account }}</span>
                  <a-tag color="warning">{{ enumStore.getEnumText('AccountAuditStatus', account.accountAuditStatus) }}</a-tag>
                </a-space>
              </a-descriptions-item>
              <a-descriptions-item label="主页">
                <div class="link-text-container">
                  <a :href="account.homeUrl" target="_blank" class="link-text">{{ account.homeUrl }}</a>
                  <a-button type="link" size="small" @click="handleCopy(account.homeUrl)">
                    复制
                  </a-button>
                </div>
              </a-descriptions-item>
              <a-descriptions-item label="粉丝数" v-if="account.channelCustomFields.includes('fansCount')"  >{{ account.fansCount }}</a-descriptions-item>
              <a-descriptions-item label="好友数" v-if="account.channelCustomFields.includes('friendsCount')">{{ account.friendsCount }}</a-descriptions-item>
              <a-descriptions-item label="发帖数" v-if="account.channelCustomFields.includes('postsCount')">{{ account.postsCount }}</a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </div>

      <!-- 任务信息 -->
      <div class="section" style="padding-bottom: 24px;">
        <div class="section-title">任务信息</div>
        <a-row :gutter="16">
          <a-col :span="6">
            <a-statistic title="完成任务次数" :value="taskStats.completedTaskCount" />
          </a-col>
          <a-col :span="6">
            <a-statistic 
              title="任务奖励" 
              :value="taskStats.totalTaskReward" 
              :precision="2"
              prefix="¥"
            />
          </a-col>
        </a-row>
      </div>

      <!-- 邀请信息 -->
      <div class="section" style="padding-bottom: 24px;">
        <div class="section-title">邀请信息</div>
        <a-row>
          <a-col :span="6">
            <a-statistic
              title="累计邀请"
              :value="inviteStats.inviteCount"
            />
          </a-col>
          <a-col :span="6">
            <a-statistic
              title="邀请奖励"
              :value="inviteStats.totalReward"
              prefix="¥"
            />
          </a-col>
        </a-row>
      </div>

      <!-- 群组信息 -->
      <div class="section">
        <div class="section-title">群组信息</div>
        <a-row>
          <a-col :span="6">
            <a-statistic
              title="管理群数量"
              :value="groupsStats.groupCount"
            />
          </a-col>
          <a-col :span="6">
            <a-statistic
              title="群收益"
              :value="groupsStats.totalEarnings"
              prefix="¥"
            />
          </a-col>
        </a-row>
      </div>

    </div>
    <!-- 奖励发放弹窗 -->
    <a-modal
      v-model:open="rewardVisible"
      :title="rewardType === 'grant' ? '奖励发放' : '奖励扣除'"
      @ok="handleRewardConfirm"
      :confirmLoading="rewardLoading"
    > 
      <a-form
        ref="rewardFormRef"
        :model="rewardForm"
        :rules="rewardRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item :label="rewardType === 'grant' ? '奖励金额' : '扣除金额'" name="amount">
          <a-input v-model:value="rewardForm.amount" />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea v-model:value="rewardForm.remark" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/index.vue'
import { get, post } from '@/utils/request'
import { UserOutlined } from '@ant-design/icons-vue'
import { useEnumStore } from '@/stores'
import config from '@/config/env'
const enumStore = useEnumStore()
const route = useRoute()

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
  remark: ''
})
const rewardLoading = ref(false)
const rewardRules = ref({
  amount: [{ required: true, message: '请输入奖励金额' }],
  remark: [{ required: true, message: '请输入备注' }]
})

// 复制文本
const handleCopy = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success('复制成功')
  }).catch(() => {
    message.error('复制失败')
  })
}

// 获取会员详情
const getMemberDetail = async (id) => {
  const res = await get('member.detail', {}, {
    urlParams: {
      id: route.params.id
    }
  })
  if(res.code === 0){
    Object.assign(memberInfo, res.data || {})
  }
}

// 获取账号列表
const getAccountList = async (id) => {
  const res = await get('account.list', {
    memberId: id
  })
  if(res.code === 0){
    accountList.value = res.data.list || []
  }
}

// 获取任务信息
const getTaskStats = async (id) => {
  const res = await get('member.taskStats', {}, {
    urlParams: {
      memberId: id  
    }
  })
  if(res.code === 0){
    Object.assign(taskStats, res.data || {})
  }
}
// 获取邀请信息
const getInviteInfo = async (id) => {
  const res = await get('member.inviteStats', {}, {
    urlParams: {
      memberId: id  
    }
  })
  if(res.code === 0){
    Object.assign(inviteStats, res.data || {})
  }
}

// 获取群组信息
const getGroupsStats = async (id) => {
  const res = await get('member.groupsStats', {}, {
    urlParams: {
      memberId: id  
    }
  })
  if(res.code === 0){
    Object.assign(groupsStats, res.data || {})
  }
}

// 奖励发放
const handleReward = () => {
  rewardVisible.value = true
  rewardType.value = 'grant'
}

// 奖励扣除
const handleDeduct = () => {
  rewardVisible.value = true
  rewardType.value = 'deduct'
}

// 奖励发放
const handleGrantReward = async () => {
  rewardLoading.value = true
  const res = await post('member.grantReward', {
    memberId: memberId.value,
    amount: rewardForm.amount,
    remark: rewardForm.remark
  })
  if(res.code === 0){
    message.success('奖励发放成功')
    rewardVisible.value = false
  } else {
    message.error(res.message)
  }
  rewardLoading.value = false
}

// 奖励扣除
const handleDeductReward = async () => {
  rewardLoading.value = true
  const res = await post('member.deductReward', {
    memberId: memberId.value,
    amount: rewardForm.amount,
    remark: rewardForm.remark
  }, {
    urlParams: {
      memberId: memberId.value
    }
  })
  if(res.code === 0){
    message.success('奖励扣除成功')
    rewardVisible.value = false
  } else {
    message.error(res.message)
  }
  rewardLoading.value = false
}

// 奖励发放确认
const handleRewardConfirm = async () => {
  await rewardFormRef.value.validate()
  switch(rewardType.value){
    case 'grant':
      handleGrantReward()
      break
    case 'deduct':
      handleDeductReward()
      break
  }
}
onMounted(() => {
  memberId.value = route.params.id
  getMemberDetail(route.params.id)
  getAccountList(route.params.id)
  getTaskStats(route.params.id)
  getInviteInfo(route.params.id)
  getGroupsStats(route.params.id)
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