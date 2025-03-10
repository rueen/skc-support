<template>
  <div class="task-audit-detail content-container">
    <page-header
      title="任务审核详情"
      :back="true"
    />
    <div class="detail-container">
      <!-- 任务信息 -->
      <div class="detail-section">
        <div class="section-title">任务信息</div>
        <a-descriptions :column="2">
          <a-descriptions-item label="任务名称">{{ taskInfo.taskName }}</a-descriptions-item>
          <a-descriptions-item label="平台渠道">{{ taskInfo.channelName }}</a-descriptions-item>
          <a-descriptions-item label="达人领域">{{ taskInfo.category }}</a-descriptions-item>
          <a-descriptions-item label="任务类型">{{ getTaskTypeText(taskInfo.type) }}</a-descriptions-item>
          <a-descriptions-item label="任务奖励">{{ taskInfo.reward }} 元</a-descriptions-item>
          <a-descriptions-item label="品牌">{{ taskInfo.brand }}</a-descriptions-item>
          <a-descriptions-item label="指定群组">{{ taskInfo.groupNames?.join('、') }}</a-descriptions-item>
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
      </div>

      <!-- 会员信息 -->
      <div class="detail-section">
        <div class="section-title">会员信息</div>
        <a-descriptions :column="2">
          <a-descriptions-item label="会员名称">
            {{ memberInfo.nickname }}
            <a-tag v-if="memberInfo.isGroupOwner" color="blue">群主</a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="账号">{{ memberInfo.account }}</a-descriptions-item>
          <a-descriptions-item label="所属群">{{ memberInfo.groupName }}</a-descriptions-item>
        </a-descriptions>
      </div>

      <!-- 提交信息 -->
      <div class="detail-section">
        <div class="section-title">提交信息</div>
        <a-descriptions :column="2">
          <template v-for="field in taskInfo.customFields" :key="field.title">
            <a-descriptions-item :label="field.title">
              <template v-if="field.type === 'image'">
                <a-image :src="field.value" :width="120" />
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
          <a-descriptions-item label="报名时间">{{ auditInfo.applyTime }}</a-descriptions-item>
          <a-descriptions-item label="审核状态">
            <a-tag :color="getTaskAuditStatusColor(auditInfo.status)">
              {{ getTaskAuditStatusText(auditInfo.status) }}
            </a-tag>
          </a-descriptions-item>
          <template v-if="auditInfo.status === TaskAuditStatus.REJECTED">
            <a-descriptions-item label="拒绝原因">{{ auditInfo.rejectReason }}</a-descriptions-item>
          </template>
        </a-descriptions>
      </div>

      <!-- 底部按钮 -->
      <div class="footer-btns">
        <div class="left">
          <a-space>
            <a-button
              type="primary"
              @click="handleResolve"
              v-if="auditInfo.status === TaskAuditStatus.PENDING"
            >
              审核通过
            </a-button>
            <a-button
              danger
              @click="handleReject"
              v-if="auditInfo.status === TaskAuditStatus.PENDING"
            >
              审核拒绝
            </a-button>
          </a-space>
        </div>
        <div class="right">
          <a-space>
            <a-button @click="handlePrev">上一个</a-button>
            <a-button @click="handleNext">下一个</a-button>
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
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/index.vue'
import {
  TaskType,
  TaskTypeLang,
  TaskAuditStatus,
  TaskAuditStatusLang,
  TaskAuditStatusColor,
  getLangText
} from '@/constants/enums'
import { get, post } from '@/utils/request'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

// 弹窗状态
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')

// 任务信息
const taskInfo = reactive({})

// 会员信息
const memberInfo = reactive({
  nickname: '测试会员',
  account: 'test123',
  groupName: '群组1',
  isGroupOwner: true
})

// 审核信息
const auditInfo = reactive({
  applyTime: '2024-03-01 10:00:00',
  status: TaskAuditStatus.PENDING,
  rejectReason: ''
})

// 获取文本方法
const getTaskTypeText = (type) => {
  return getLangText(TaskTypeLang, type, locale.value)
}

const getTaskAuditStatusText = (status) => {
  return getLangText(TaskAuditStatusLang, status, locale.value)
}

const getTaskAuditStatusColor = (status) => {
  return TaskAuditStatusColor[status]
}

// 审核通过
const handleResolve = async () => {
  try {
    // TODO: 实现审核通过逻辑
    const res = await post('taskAudit.batchResolve', {
      ids: [route.params.id]
    })
    if(res.success) {
      message.success('审核通过成功')
      router.back()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('审核通过失败')
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

  try {
    rejectLoading.value = true
    // TODO: 实现审核拒绝逻辑
    const res = await post('taskAudit.batchReject', {
      ids: [route.params.id],
      reason: rejectReason.value
    })
    if(res.success) {
      message.success('审核拒绝成功')
      rejectVisible.value = false
      router.back()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('审核拒绝失败')
  } finally {
    rejectLoading.value = false
  }
}

// 上一个
const handlePrev = () => {
  // TODO: 实现上一个逻辑
}

// 下一个
const handleNext = () => {
  // TODO: 实现下一个逻辑
}

// 获取详情
const getDetail = async (id) => {
  try {
    // TODO: 实现获取详情逻辑
    const res = await get('taskAudit.detail', {
      params: {
        id
      }
    })
    if(res.success) {
      Object.assign(taskInfo, res.data)
    }
  } catch (error) {
    message.error('获取详情失败')
  }
}

onMounted(() => {
  getDetail(route.params.id)
})
</script>

<style lang="less" scoped>
.task-audit-detail {
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