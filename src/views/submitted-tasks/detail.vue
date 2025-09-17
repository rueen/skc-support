<template>
  <div class="task-audit-detail content-container">
    <page-header
      :title="$t('submittedTasks.detail.title')"
      :back="true"
      :useDefaultBack="false"
      @back="handleGoBack"
    />
    <div class="detail-container">
      <!-- 任务信息 -->
      <a-collapse ghost class="collapse">
        <a-collapse-panel :header="$t('submittedTasks.detail.taskInfo')">
          <a-descriptions :column="{ xs: 1, sm: 1, md: 1, lg: 2 }">
            <a-descriptions-item :label="$t('submittedTasks.detail.taskName')">
              <a-space>
                <a-avatar :src="taskInfo.channelIcon" size="small" />
                <span>{{ taskInfo.taskName }}</span>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.category')">{{ taskInfo.category }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.taskType')">{{ enumStore.getEnumText('TaskType', taskInfo.taskType) }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.reward')">{{ taskInfo.reward }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.brand')">{{ taskInfo.brand }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.specifyGroup')">
              <span v-if="taskInfo.groupMode === 0">{{ $t('submittedTasks.detail.noSpecify') }}</span>
              <span v-else>{{ taskInfo.groupNames?.join('、') }}</span>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.taskTime')">
              {{ taskInfo.startTime }} {{ $t('submittedTasks.detail.to') }} {{ taskInfo.endTime }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.quota')">
              {{ taskInfo.unlimitedQuota ? $t('submittedTasks.detail.noLimit') : taskInfo.quota }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.fansRequired')">{{ taskInfo.fansRequired }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.contentRequirement')">{{ taskInfo.contentRequirement }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.taskInfo')">{{ taskInfo.taskInfo }}</a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
      </a-collapse>

      <!-- 会员信息 -->
      <div class="detail-section">
        <div class="section-title">{{ $t('submittedTasks.detail.memberInfo') }}</div>
        <a-descriptions :column="{ xs: 1, sm: 1, md: 1, lg: 2 }">
          <a-descriptions-item :label="$t('submittedTasks.detail.memberNickname')">
            <a-space>
              <span>{{ memberInfo.nickname }}</span>
              <a-tag color="green" v-if="memberInfo.isNew">new</a-tag>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.detail.account')">{{ memberInfo.account }}</a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.detail.group')">
            <a-space v-for="item in memberInfo.groups">
              <span>{{ item.groupName }}</span>
              <GroupOwner v-if="item.isOwner" />
            </a-space>
            <span v-if="!memberInfo.groups || memberInfo.groups.length === 0">--</span>
          </a-descriptions-item>
        </a-descriptions>
        <div v-for="account in accountList" :key="account.channelId">
          <a-descriptions :column="{ xs: 1, sm: 1, md: 1, lg: 2 }">
            <a-descriptions-item :label="$t('submittedTasks.detail.account')">
              <a-space>
                <a-avatar :src="account.channelIcon" size="small" />
                <span>{{ account.account }}</span>
                <a-tag color="warning">{{ enumStore.getEnumText('AccountAuditStatus', account.accountAuditStatus) }}</a-tag>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.homepage')">
              <CopyContent :content="account.homeUrl">
                <div class="link-text-container">
                  <a :href="account.homeUrl" target="_blank" class="link-text">{{ account.homeUrl }}</a>
                </div>
              </CopyContent>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.fansCount')" v-if="account.channelCustomFields.includes('fansCount')"  >{{ account.fansCount }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.friendsCount')" v-if="account.channelCustomFields.includes('friendsCount')">{{ account.friendsCount }}</a-descriptions-item>
            <a-descriptions-item :label="$t('submittedTasks.detail.postsCount')" v-if="account.channelCustomFields.includes('postsCount')">{{ account.postsCount }}</a-descriptions-item>
            <a-descriptions-item :label="account.channelName === 'Facebook' ? 'UID' : 'User Name'">{{ account.uid }}</a-descriptions-item>
          </a-descriptions>
        </div>
      </div>

      <!-- 提交信息 -->
      <div class="detail-section">
        <div class="section-title">{{ $t('submittedTasks.detail.submitInfo') }}</div>
        <a-descriptions :column="1">
          <a-descriptions-item label="Keywords">{{ taskInfo.showKeywords }}</a-descriptions-item>
          <template v-for="(field, index) in submittedInfo?.submitContent?.customFields" :key="index">
            <a-descriptions-item :label="field.title">
              <template v-if="field.type === 'image'">
                <a-image :src="item.url" :width="60" v-for="(item, _index) in field.value" :key="_index" />
              </template>
              <template v-else>
                <template v-if="isValidUrl(field.value)">
                  <CopyContent :content="field.value">
                    <div class="link-text-container">
                      <a :href="field.value" target="_blank" class="link-text">{{ field.value }}</a>
                    </div>
                  </CopyContent>
                  <div style="margin-left: 10px;" v-if="field.type === 'post'">
                    <a-tag color="green" v-if="accountList.find(item => item.uid === field.uid)">{{ $t('submittedTasks.detail.postUidCheckSuccess') }}</a-tag>
                    <a-tag color="red" v-if="accountList.length && field.uid != null && !accountList.find(item => item.uid === field.uid)">{{ $t('submittedTasks.detail.postUidCheckError') }}</a-tag>
                  </div>
                </template>
                <template v-else>
                  <span>{{ field.value }}</span>
                </template>
              </template>
            </a-descriptions-item>
          </template>
        </a-descriptions>
      </div>

      <!-- 审核信息 -->
      <div class="detail-section">
        <div class="section-title">{{ $t('submittedTasks.detail.auditInfo') }}</div>
        <a-descriptions :column="{ xs: 1, sm: 1, md: 1, lg: 2 }">
          <a-descriptions-item :label="$t('submittedTasks.detail.submitTime')">{{ submittedInfo.submitTime }}</a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.detail.preAuditStatus')">
            {{ enumStore.getEnumText('TaskPreAuditStatus', submittedInfo.taskPreAuditStatus) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.preAuditor')">
            {{ submittedInfo.preWaiterName }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.preAuditTime')">
            {{ submittedInfo.preAuditTime }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.detail.confirmAuditStatus')" v-if="submittedInfo.taskPreAuditStatus === 'approved'">
            {{ enumStore.getEnumText('TaskAuditStatus', submittedInfo.taskAuditStatus) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.confirmAuditor')" v-if="submittedInfo.taskPreAuditStatus === 'approved'">
            {{ submittedInfo.waiterName }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('submittedTasks.confirmAuditTime')" v-if="submittedInfo.taskPreAuditStatus === 'approved'">
            {{ submittedInfo.auditTime }}
          </a-descriptions-item>
          <template v-if="submittedInfo.auditStatus === 'rejected'">
            <a-descriptions-item :label="$t('submittedTasks.detail.rejectReason')">{{ submittedInfo.rejectReason }}</a-descriptions-item>
          </template>
        </a-descriptions>
      </div>

      <!-- 底部按钮 -->
      <div class="footer-btns">
        <div class="left">
          <a-space v-if="submittedInfo.auditStatus === 'pending'">
            <a-button
              type="primary"
              @click="handleResolve"
            >
              {{ $t('submittedTasks.detail.approve') }}
            </a-button>
            <a-button
              danger
              @click="handleReject"
            >
              {{ $t('submittedTasks.detail.reject') }}
            </a-button>
          </a-space>
        </div>
        <div class="right">
          <a-space>
            <a-button @click="handlePrev" v-if="submittedInfo.prevTaskId && submittedInfo.prevTaskId !== submittedInfo.nextTaskId">
              {{ $t('submittedTasks.detail.prev') }}
            </a-button>
            <a-button @click="handleNext" v-if="submittedInfo.nextTaskId">
              {{ $t('submittedTasks.detail.next') }}
            </a-button>
          </a-space>
        </div>
      </div>
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
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { get, post } from '@/utils/request'
import { useEnumStore } from '@/stores'
import CopyContent from '@/components/CopyContent.vue'
import GroupOwner from '@/components/GroupOwner.vue'
import { useI18n } from 'vue-i18n'
import { decryptFilters } from '@/utils/routeParamsEncryption'

const { t } = useI18n()
const enumStore = useEnumStore()

const route = useRoute()
const router = useRouter()
const pageType = route.query.type
const auditType = computed(() => {
  return submittedInfo.taskPreAuditStatus === 'approved' ? 'confirm' : 'pre'
})

// 弹窗状态
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')

// 判断是否为有效URL
const isValidUrl = (string) => {
  try {
    // 检查是否以http://或https://开头
    if (!string) return false
    return string.startsWith('http://') || string.startsWith('https://')
  } catch (err) {
    return false
  }
}

// 已提交任务id
const submittedId = ref(null)
// 已提交任务信息
const submittedInfo = reactive({
  submitContent: {}
})
// 任务信息
const taskInfo = reactive({})

// 会员信息
const memberInfo = reactive({})

// 获取并解密路由中的filters参数
const filtersParam = ref(null)
const getRouteFilters = () => {
  const encryptedFilters = route.query.filters
  if (encryptedFilters) {
    filtersParam.value = decryptFilters(encryptedFilters)
    // console.log('解密后的filters参数:', filtersParam.value)
  }
}

// 审核通过
const handleResolve = async () => {
  const url = auditType.value === 'confirm' ? 'taskSubmitted.batchConfirmAuditApprove' : 'taskSubmitted.batchPreAuditApprove'
  const res = await post(url, {
    ids: [submittedId.value]
  })
  if(res.code === 0) {
    message.success(t('submittedTasks.resolveSuccess'))
    getDetail()
  } else {
    message.error(res.message)
  }
}

// 审核拒绝
const handleReject = () => {
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
  try {
    const url = auditType.value === 'confirm' ? 'taskSubmitted.batchConfirmAuditReject' : 'taskSubmitted.batchPreAuditReject'
    await post(url, {
      ids: [submittedId.value],
      reason: rejectReason.value
    })
    message.success(t('submittedTasks.rejectSuccess'))
    rejectVisible.value = false
    getDetail()
  } catch (error) {
    message.error(error.message)
  } finally {
    rejectLoading.value = false
  }
}

// 自定义返回按钮事件
const handleGoBack = () => {
  // 根据页面类型返回对应的列表页
  const listPath = pageType === 'confirm' ? '/confirm-audit-tasks' : '/pre-audit-tasks';
  const queryParams = {};
  if(route.query.filters){
    queryParams.filters = route.query.filters;
  }
  router.push({
    path: listPath,
    query: queryParams
  })
}

// 上一个
const handlePrev = () => {
  const queryParams = { type: pageType }
  // 如果存在filters参数，则保留并传递
  if (route.query.filters) {
    queryParams.filters = route.query.filters
  }
  router.push({
    path: `/submitted-tasks/detail/${submittedInfo.prevTaskId}`,
    query: queryParams
  })
  submittedId.value = submittedInfo.prevTaskId
  getDetail()
}

// 下一个
const handleNext = () => {
  const queryParams = { type: pageType }
  // 如果存在filters参数，则保留并传递
  if (route.query.filters) {
    queryParams.filters = route.query.filters
  }
  router.push({
    path: `/submitted-tasks/detail/${submittedInfo.nextTaskId}`,
    query: queryParams
  })
  submittedId.value = submittedInfo.nextTaskId
  getDetail()
}

// 获取任务详情
const getTaskDetail = async (taskId, memberId) => {
  try {
    const res = await get('task.detail', {
      memberId: memberId
    }, {
      urlParams: {
        id: taskId
      }
    })
    if(res.code === 0) {
      Object.assign(taskInfo, res.data)
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error(error.message)
  }
}

// 获取会员详情
const getMemberDetail = async (memberId) => {
  try {
    const res = await get('member.detail', {}, {
      urlParams: {
        id: memberId
      }
    })
    if(res.code === 0) {
      Object.assign(memberInfo, res.data)
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error(t('submittedTasks.detail.getMemberDetailFailed'))
  }
}

// 获取详情
const getDetail = async () => {
  try {
    const params = {
      auditType: pageType,
      id: submittedId.value
    }
    if(filtersParam.value){
      params.filtersParam = filtersParam.value
    }
    const res = await post('taskSubmitted.detail', params)
    if(res.code === 0) {
      Object.assign(submittedInfo, res.data)
      // 获取关联的任务和会员信息
      if(res.data.taskId != null) {
        await getTaskDetail(res.data.taskId, res.data.memberId)
      }
      if(res.data.memberId != null) {
        await getMemberDetail(res.data.memberId)
      }
      if(res.data.taskId != null && res.data.memberId != null){
        await getAccountList()
      }
    }
  } catch (error) {
    message.error(error.message)
  }
}

// 获取账号列表
const accountList = ref([])
const getAccountList = async () => {
  const res = await get('account.list', {
    taskId: submittedInfo.taskId,
    memberId: submittedInfo.memberId,
    channelId: taskInfo.channelId
  })
  if(res.code === 0){
    accountList.value = res.data.list || []
  }
}

onMounted(async () => {
  submittedId.value = route.params.id
  // 获取并解密filters参数
  getRouteFilters()
  await getDetail()
})
</script>

<style lang="less" scoped>
.task-audit-detail {
  .collapse{
    :deep(.ant-collapse-header) {
      padding: 16px 0;
      .ant-collapse-header-text {
        font-size: 16px;
        font-weight: 500;
        text-align: left;
      }
    }
    :deep(.ant-collapse-content-box) {
      padding: 0;
    }
  }

  .detail-container {
    padding: 24px;
    background-color: #fff;
    border-radius: 2px;
  }

  .detail-section {
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

  .footer-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.ant-descriptions-item-label) {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }

  :deep(.ant-descriptions-item-content) {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style> 