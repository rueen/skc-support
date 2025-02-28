<template>
  <div class="task-form content-container">
    <div class="form-container">
      <div class="page-header">
        <a-space>
          <a-button @click="$router.back()">
            <template #icon><left-outlined /></template>
            返回
          </a-button>
          <h2 class="page-title">{{ isEdit ? '编辑任务' : '新增任务' }}</h2>
        </a-space>
      </div>

      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item :label="$t('task.title')" name="title">
          <a-input v-model:value="formState.title" :placeholder="$t('task.title')" />
        </a-form-item>
        
        <a-form-item :label="$t('task.platform')" name="platform">
          <a-select
            v-model:value="formState.platform"
            :placeholder="$t('task.platform')"
            :options="platformOptions"
          />
        </a-form-item>
        
        <a-form-item :label="$t('task.type')" name="type">
          <a-select
            v-model:value="formState.type"
            :placeholder="$t('task.type')"
            :options="typeOptions"
          />
        </a-form-item>
        
        <a-form-item :label="$t('task.reward')" name="reward">
          <a-input-number
            v-model:value="formState.reward"
            :min="0"
            :precision="2"
            :step="0.1"
            style="width: 200px"
          />
        </a-form-item>
        
        <a-form-item :label="$t('task.startTime')" name="startTime">
          <a-date-picker
            v-model:value="formState.startTime"
            show-time
            style="width: 200px"
          />
        </a-form-item>
        
        <a-form-item :label="$t('task.endTime')" name="endTime">
          <a-date-picker
            v-model:value="formState.endTime"
            show-time
            style="width: 200px"
          />
        </a-form-item>
        
        <a-form-item :label="$t('task.description')" name="description">
          <a-textarea
            v-model:value="formState.description"
            :rows="4"
            :placeholder="$t('task.description')"
          />
        </a-form-item>
        
        <a-form-item :label="$t('task.requirements')" name="requirements">
          <a-textarea
            v-model:value="formState.requirements"
            :rows="4"
            :placeholder="$t('task.requirements')"
          />
        </a-form-item>
        
        <a-form-item :wrapper-col="{ offset: 4 }">
          <a-space>
            <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
              {{ $t('common.confirm') }}
            </a-button>
            <a-button @click="$router.back()">{{ $t('common.cancel') }}</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const submitLoading = ref(false)

const isEdit = computed(() => !!route.params.id)

// 表单数据
const formState = reactive({
  title: '',
  platform: undefined,
  type: undefined,
  reward: 0,
  startTime: null,
  endTime: null,
  description: '',
  requirements: ''
})

// 表单校验规则
const rules = {
  title: [
    { required: true, message: '请输入任务标题' }
  ],
  platform: [
    { required: true, message: '请选择平台' }
  ],
  type: [
    { required: true, message: '请选择任务类型' }
  ],
  reward: [
    { required: true, message: '请输入任务奖励' }
  ],
  startTime: [
    { required: true, message: '请选择开始时间' }
  ],
  endTime: [
    { required: true, message: '请选择结束时间' }
  ],
  description: [
    { required: true, message: '请输入任务描述' }
  ],
  requirements: [
    { required: true, message: '请输入任务要求' }
  ]
}

// 选项数据
const platformOptions = [
  { label: '抖音', value: 'douyin' },
  { label: '快手', value: 'kuaishou' },
  { label: '小红书', value: 'xiaohongshu' }
]

const typeOptions = [
  { label: '种草', value: 'grass' },
  { label: '直播', value: 'live' },
  { label: '短视频', value: 'video' }
]

// 加载任务详情
const loadTaskDetail = async (id) => {
  try {
    // TODO: 实现加载任务详情的逻辑
    Object.assign(formState, {
      title: '测试任务',
      platform: 'douyin',
      type: 'grass',
      reward: 100,
      startTime: null,
      endTime: null,
      description: '测试描述',
      requirements: '测试要求'
    })
  } catch (error) {
    message.error('加载任务详情失败')
    router.back()
  }
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    try {
      submitLoading.value = true
      // TODO: 实现提交逻辑
      message.success('提交成功')
      router.back()
    } catch (error) {
      message.error('提交失败')
    } finally {
      submitLoading.value = false
    }
  })
}

// 初始化
onMounted(() => {
  if (isEdit.value) {
    loadTaskDetail(route.params.id)
  }
})
</script>

<style lang="less" scoped>
.task-form {
  .page-header {
    margin-bottom: 24px;
    
    .page-title {
      margin: 0;
      font-size: 20px;
      line-height: 32px;
    }
  }
}
</style> 