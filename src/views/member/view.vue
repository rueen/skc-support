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
          <a-descriptions-item label="会员名称">
            {{ memberInfo.memberNickname }}
          </a-descriptions-item>
          <a-descriptions-item label="会员账号">
            {{ memberInfo.memberAccount }}
          </a-descriptions-item>
          <a-descriptions-item label="所属群组">
            {{ memberInfo.groupName }}
            <a-tag v-if="memberInfo.isGroupOwner" color="blue" style="margin-left: 8px">群主</a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="邀请人">
            {{ memberInfo.inviterName }}
          </a-descriptions-item>
          <a-descriptions-item label="邀请码">
            {{ memberInfo.inviteCode }}
          </a-descriptions-item>
          <a-descriptions-item label="邀请链接">
            <span>{{ memberInfo.inviteUrl }}</span>
            <a-button type="link" size="small" @click="handleCopy(memberInfo.inviteUrl)">
              复制
            </a-button>
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <!-- 账号信息 -->
      <div class="section">
        <div class="section-title">账号信息</div>
        <div class="account-list">
          <div v-for="account in accountList" :key="account.channelId">
            <a-descriptions :column="1">
              <a-descriptions-item label="账号">{{ account.username }}</a-descriptions-item>
              <a-descriptions-item label="平台">{{ account.channelName }}</a-descriptions-item>
              <a-descriptions-item label="主页">
                <div class="link-text-container">
                  <a :href="account.homeUrl" target="_blank" class="link-text">{{ account.homeUrl }}</a>
                  <a-button type="link" size="small" @click="handleCopy(account.homeUrl)">
                    复制
                  </a-button>
                </div>
              </a-descriptions-item>
              <a-descriptions-item label="粉丝数">{{ account.followers }}</a-descriptions-item>
              <a-descriptions-item label="好友数">{{ account.friends }}</a-descriptions-item>
              <a-descriptions-item label="发帖数">{{ account.posts }}</a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </div>

      <!-- 任务信息 -->
      <div class="section" style="padding-bottom: 24px;">
        <div class="section-title">任务信息</div>
        <a-row :gutter="16">
          <a-col :span="6">
            <a-statistic title="完成任务次数" :value="memberInfo.taskCount" />
          </a-col>
          <a-col :span="6">
            <a-statistic 
              title="累计获得奖励" 
              :value="memberInfo.totalReward" 
              :precision="2"
              prefix="¥"
            />
          </a-col>
          <a-col :span="6">
            <a-statistic 
              title="账户余额" 
              :value="memberInfo.balance"
              :precision="2"
              prefix="¥"
            />
          </a-col>
        </a-row>
      </div>

      <!-- 邀请信息 -->
      <div class="section">
        <div class="section-title">邀请信息</div>
        <a-row>
          <a-col :span="6">
            <a-statistic title="邀请好友数" :value="memberInfo.invitedCount" />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/index.vue'
import { get } from '@/utils/request'

const route = useRoute()

// 会员信息
const memberInfo = reactive({})
const accountList = ref([])

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
  try {
    const res = await get('member.detail', {
      params: {
        id: route.params.id
      }
    })
    if(res.code === 0){
      Object.assign(memberInfo, res.data || {})
    }
  } catch (error) {
    message.error('获取会员详情失败')
  }
}

// 获取账号列表
const getAccountList = async (id) => {
  try {
    const res = await get('account.list', {
      params: {
        memberId: id
      }
    })
    if(res.code === 0){
      accountList.value = res.data.list || []
    }
  } catch (error) {
    message.error('获取账号列表失败')
  }
}

onMounted(() => {
  getMemberDetail(route.params.id)
  getAccountList(route.params.id)
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