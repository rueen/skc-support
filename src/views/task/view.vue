<template>
  <div class="task-view content-container">
    <page-header
      title="任务详情"
      :back="true"
      class="page-header"
    />
    <div class="detail-container">
      <a-descriptions :column="2">
        <a-descriptions-item label="任务名称">{{ taskInfo.taskName }}</a-descriptions-item>
        <a-descriptions-item label="平台渠道">{{ taskInfo.channelName }}</a-descriptions-item>
        <a-descriptions-item label="达人领域">{{ getCreatorCategoryText(taskInfo.categoryId) }}</a-descriptions-item>
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

      <template v-if="taskInfo.customFields?.length">
        <a-divider />
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/index.vue'
import {
  CreatorCategory,
  CreatorCategoryLang,
  TaskType,
  TaskTypeLang,
  getLangText
} from '@/constants/enums'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const taskId = route.params.id

// 任务信息
const taskInfo = reactive({
  taskName: '',
  channelName: '',
  categoryId: undefined,
  type: undefined,
  reward: 0,
  brand: '',
  groupNames: [],
  startTime: '',
  endTime: '',
  quota: undefined,
  unlimitedQuota: false,
  fansRequired: undefined,
  contentRequirement: '',
  taskInfo: '',
  customFields: []
})

// 获取文本方法
const getCreatorCategoryText = (category) => {
  return getLangText(CreatorCategoryLang, category, locale.value)
}

const getTaskTypeText = (type) => {
  return getLangText(TaskTypeLang, type, locale.value)
}

// 获取任务详情
const getTaskDetail = async (id) => {
  try {
    // TODO: 实现获取任务详情逻辑
    // 模拟数据
    Object.assign(taskInfo, {
      taskName: '测试任务1',
      channelName: '抖音',
      categoryId: CreatorCategory.FOOD,
      type: TaskType.IMAGE_TEXT,
      reward: 100,
      brand: '测试品牌',
      groupNames: ['群组1', '群组2'],
      startTime: '2024-03-01 00:00:00',
      endTime: '2024-03-31 23:59:59',
      quota: 10,
      unlimitedQuota: false,
      fansRequired: 1000,
      contentRequirement: '作品要求内容',
      taskInfo: '任务信息内容',
      customFields: [
        { title: '字段1', type: 'input', value: '测试内容1' },
        { title: '字段2', type: 'image', value: 'https://example.com/image.jpg' }
      ]
    })
  } catch (error) {
    message.error('获取任务详情失败')
  }
}

onMounted(() => {
  getTaskDetail(taskId)
})
</script>

<style lang="less" scoped>
.task-view {
  .page-header {
    :deep(.ant-page-header-heading-left) {
      flex: 1;
    }
  }

  .detail-container {
    padding: 24px;
    background-color: #fff;
    border-radius: 2px;
  }

  h3 {
    margin: 16px 0;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style> 