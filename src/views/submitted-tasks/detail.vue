<template>
  <div class="task-audit-detail content-container">
    <page-header
      title="任务审核详情"
      :back="true"
    />
    <div class="detail-container">
      <!-- 任务信息 -->
      <a-collapse ghost class="collapse">
        <a-collapse-panel header="任务信息">
          <a-descriptions :column="2">
            <a-descriptions-item label="任务名称">
              <a-space>
                <a-avatar :src="taskInfo.channelIcon" size="small" />
                <span>{{ taskInfo.taskName }}</span>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="达人领域">{{ taskInfo.category }}</a-descriptions-item>
            <a-descriptions-item label="任务类型">{{ enumStore.getEnumText('TaskType', taskInfo.taskType) }}</a-descriptions-item>
            <a-descriptions-item label="任务奖励">{{ taskInfo.reward }} 元</a-descriptions-item>
            <a-descriptions-item label="品牌">{{ taskInfo.brand }}</a-descriptions-item>
            <a-descriptions-item label="指定群组">
              <span v-if="taskInfo.groupMode === 0">不指定</span>
              <span v-else>{{ taskInfo.groupNames?.join('、') }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="任务时间">
              {{ taskInfo.startTime }} 至 {{ taskInfo.endTime }}
            </a-descriptions-item>
            <a-descriptions-item label="任务名额">
              {{ taskInfo.unlimitedQuota ? '不限制' : taskInfo.quota }}
            </a-descriptions-item>
            <a-descriptions-item label="粉丝要求">{{ taskInfo.fansRequired }} 粉丝</a-descriptions-item>
            <a-descriptions-item label="作品要求">{{ taskInfo.contentRequirement }}</a-descriptions-item>
            <a-descriptions-item label="任务信息">{{ taskInfo.taskInfo }}</a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
      </a-collapse>

      <!-- 会员信息 -->
      <div class="detail-section">
        <div class="section-title">会员信息</div>
        <a-descriptions :column="2">
          <a-descriptions-item label="会员昵称">
            {{ memberInfo.nickname }}
          </a-descriptions-item>
          <a-descriptions-item label="账号">{{ memberInfo.account }}</a-descriptions-item>
          <a-descriptions-item label="所属群">
            <div v-for="item in memberInfo.groups">
              <span>{{ item.groupName }}</span>
              <a-tag v-if="item.isOwner" color="blue" style="margin-left: 10px;">群主</a-tag>
            </div>
            <span v-if="!memberInfo.groups || memberInfo.groups.length === 0">--</span>
          </a-descriptions-item>
        </a-descriptions>
        <div v-for="account in accountList" :key="account.channelId">
          <a-descriptions :column="2">
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

      <!-- 提交信息 -->
      <div class="detail-section">
        <div class="section-title">提交信息</div>
        <a-descriptions :column="2">
          <template v-for="(field, index) in submittedInfo?.submitContent?.customFields" :key="index">
            <a-descriptions-item :label="field.title">
              <template v-if="field.type === 'image'">
                <a-image :src="item.url" :width="60" v-for="(item, _index) in field.value" :key="_index" />
              </template>
              <template v-else>{{ field.value }}</template>
            </a-descriptions-item>
          </template>
        </a-descriptions>
      </div>

      <!-- 审核信息 -->
      <div class="detail-section">
        <div class="section-title">审核信息</div>
        <a-descriptions :column="2">
          <a-descriptions-item label="提交时间">{{ submittedInfo.submitTime }}</a-descriptions-item>
          <a-descriptions-item label="初审状态">
            {{ enumStore.getEnumText('TaskPreAuditStatus', submittedInfo.taskPreAuditStatus) }}
          </a-descriptions-item>
          <a-descriptions-item label="初审员">
            {{ submittedInfo.preWaiterName }}
          </a-descriptions-item>
          <a-descriptions-item label="复审状态" v-if="submittedInfo.taskPreAuditStatus === 'approved'">
            {{ enumStore.getEnumText('TaskAuditStatus', submittedInfo.taskAuditStatus) }}
          </a-descriptions-item>
          <a-descriptions-item label="复审员" v-if="submittedInfo.taskPreAuditStatus === 'approved'">
            {{ submittedInfo.waiterName }}
          </a-descriptions-item>
          <template v-if="submittedInfo.auditStatus === 'rejected'">
            <a-descriptions-item label="拒绝原因">{{ submittedInfo.rejectReason }}</a-descriptions-item>
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
              审核通过
            </a-button>
            <a-button
              danger
              @click="handleReject"
            >
              审核拒绝
            </a-button>
          </a-space>
        </div>
        <div class="right">
          <a-space>
            <a-button @click="handlePrev" v-if="submittedInfo.prevTaskId && submittedInfo.prevTaskId !== submittedInfo.nextTaskId">上一个</a-button>
            <a-button @click="handleNext" v-if="submittedInfo.nextTaskId">下一个</a-button>
          </a-space>
        </div>
      </div>
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
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/index.vue'
import { get, post } from '@/utils/request'
import { useEnumStore } from '@/stores'

const enumStore = useEnumStore()

const route = useRoute()
const router = useRouter()
const pageType = route.query.type
const auditType = computed(() => {
  return submittedInfo.value.taskPreAuditStatus === 'approved' ? 'confirm' : 'pre'
})

// 弹窗状态
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')

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

// 审核通过
const handleResolve = async () => {
  const url = auditType.value === 'confirm' ? 'taskSubmitted.batchConfirmAuditApprove' : 'taskSubmitted.batchPreAuditApprove'
  const res = await post(url, {
    ids: [submittedId.value]
  })
  if(res.code === 0) {
    message.success('审核通过成功')
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
    message.error('请输入拒绝原因')
    return
  }

  rejectLoading.value = true
  const url = auditType.value === 'confirm' ? 'taskSubmitted.batchConfirmAuditReject' : 'taskSubmitted.batchPreAuditReject'
  const res = await post(url, {
    ids: [submittedId.value],
    reason: rejectReason.value
  })
  if(res.code === 0) {
    message.success('审核拒绝成功')
    rejectVisible.value = false
    getDetail()
  } else {
    message.error(res.message)
  }
}

// 上一个
const handlePrev = () => {
  // TODO: 实现上一个逻辑
  router.push(`/submitted-tasks/detail/${submittedInfo.prevTaskId}`)
  submittedId.value = submittedInfo.prevTaskId
  getDetail()
}

// 下一个
const handleNext = () => {
  // TODO: 实现下一个逻辑
  router.push(`/submitted-tasks/detail/${submittedInfo.nextTaskId}`)
  submittedId.value = submittedInfo.nextTaskId
  getDetail()
}

// 获取任务详情
const getTaskDetail = async (taskId) => {
  try {
    const res = await get('task.detail', {}, {
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
    message.error('获取任务详情失败')
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
    message.error('获取会员详情失败')
  }
}

// 获取详情
const getDetail = async () => {
  try {
    const res = await get('taskSubmitted.detail', {
      auditType: pageType
    }, {
      urlParams: {
        id: submittedId.value
      }
    })
    if(res.code === 0) {
      Object.assign(submittedInfo, res.data)
      // 获取关联的任务和会员信息
      if(res.data.taskId != null) {
        await getTaskDetail(res.data.taskId)
      }
      if(res.data.memberId != null) {
        await getMemberDetail(res.data.memberId)
      }
      if(res.data.taskId != null && res.data.memberId != null){
        await getAccountList()
      }
    }
  } catch (error) {
    message.error('获取详情失败')
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