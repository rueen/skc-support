<template>
  <div class="task-form content-container">
    <page-header
      :title="getPageTitle"
      :back="true"
      class="page-header"
    >
      <template #right>
        <a-button
          v-if="isView"
          type="primary"
          @click="handleEdit"
        >
          编辑
        </a-button>
      </template>
    </page-header>
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 20 }"
        layout="horizontal"
      >
        <a-form-item label="任务名称" name="taskName">
          <a-input
            v-model:value="formData.taskName"
            placeholder="请输入任务名称"
            :disabled="isView"
          />
        </a-form-item>

        <a-form-item label="平台渠道" name="channelId">
          <a-select
            v-model:value="formData.channelId"
            placeholder="请选择平台渠道"
            :disabled="isView"
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

        <a-form-item label="达人领域" name="categoryId">
          <a-select
            v-model:value="formData.categoryId"
            placeholder="请选择达人领域"
            :disabled="isView"
          >
            <a-select-option
              v-for="category in Object.values(CreatorCategory)"
              :key="category"
              :value="category"
            >
              {{ getCreatorCategoryText(category) }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="任务类型" name="type">
          <a-select
            v-model:value="formData.type"
            placeholder="请选择任务类型"
            :disabled="isView"
          >
            <a-select-option
              v-for="type in Object.values(TaskType)"
              :key="type"
              :value="type"
            >
              {{ getTaskTypeText(type) }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="任务奖励" name="reward">
          <a-input-number
            v-model:value="formData.reward"
            :min="0"
            :precision="2"
            :step="0.1"
            placeholder="请输入任务奖励"
            addon-after="元"
            :disabled="isView"
          />
        </a-form-item>

        <a-form-item label="品牌" name="brand">
          <a-input
            v-model:value="formData.brand"
            placeholder="请输入品牌名称"
            :disabled="isView"
          />
        </a-form-item>

        <a-form-item label="指定群组" name="groupIds">
          <div class="group-select">
            <a-select
              v-model:value="formData.groupIds"
              mode="multiple"
              placeholder="请选择指定群组"
              :disabled="isView"
            >
              <a-select-option
                v-for="item in groupOptions"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </div>
        </a-form-item>

        <a-form-item label="自定义字段">
          <div class="custom-fields">
            <div v-for="(field, index) in formData.customFields" :key="index" class="field-item">
              <a-space align="baseline">
                <a-form-item
                  :name="['customFields', index, 'title']"
                  :rules="[{ required: true, message: '请输入字段标题' }]"
                >
                  <a-input
                    v-model:value="field.title"
                    placeholder="请输入字段标题"
                    :disabled="isView"
                  />
                </a-form-item>
                <a-select
                  v-model:value="field.type"
                  style="width: 120px"
                  :disabled="isView"
                >
                  <a-select-option value="input">输入框</a-select-option>
                  <a-select-option value="image">上传图片</a-select-option>
                </a-select>
                <a-button
                  type="link"
                  danger
                  @click="removeField(index)"
                  :disabled="isView"
                >
                  删除
                </a-button>
              </a-space>
            </div>
            <a-button
              v-if="formData.customFields.length < 10 && !isView"
              type="dashed"
              block
              @click="addField"
            >
              <plus-outlined />添加字段
            </a-button>
          </div>
        </a-form-item>

        <a-form-item label="任务时间" required>
          <a-row :gutter="8">
            <a-col :span="11">
              <a-form-item name="startTime" :rules="[{ required: true, message: '请选择开始时间' }]" :disabled="isView">
                <a-date-picker
                  v-model:value="formData.startTime"
                  show-time
                  style="width: 100%"
                  placeholder="开始时间"
                />
              </a-form-item>
            </a-col>
            <a-col :span="2" class="text-center">
              <span>至</span>
            </a-col>
            <a-col :span="11">
              <a-form-item name="endTime" :rules="[{ required: true, message: '请选择结束时间' }]" :disabled="isView">
                <a-date-picker
                  v-model:value="formData.endTime"
                  show-time
                  style="width: 100%"
                  placeholder="结束时间"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item label="任务名额">
          <a-space align="baseline">
            <a-form-item name="quota">
              <a-input-number
                v-model:value="formData.quota"
                :min="0"
                :precision="0"
                :disabled="formData.unlimitedQuota || isView"
                placeholder="请输入任务名额"
              />
            </a-form-item>
            <a-checkbox
              v-model:checked="formData.unlimitedQuota"
              :disabled="isView"
            >
              不限制
            </a-checkbox>
          </a-space>
        </a-form-item>

        <a-form-item label="粉丝要求" name="fansRequired">
          <a-input-number
            v-model:value="formData.fansRequired"
            :min="0"
            :precision="0"
            :step="1000"
            placeholder="请输入最低粉丝数要求"
            addon-after="粉丝"
            :disabled="isView"
          />
        </a-form-item>

        <a-form-item label="作品要求" name="contentRequirement">
          <a-textarea
            v-model:value="formData.contentRequirement"
            :rows="4"
            placeholder="请输入作品要求"
            :disabled="isView"
          />
        </a-form-item>

        <a-form-item label="任务信息" name="taskInfo">
          <a-textarea
            v-model:value="formData.taskInfo"
            :rows="4"
            placeholder="请输入任务信息"
            :disabled="isView"
          />
        </a-form-item>

        <a-form-item label="温馨提示" name="notice">
          <a-textarea
            v-model:value="formData.notice"
            :rows="4"
            placeholder="请输入温馨提示"
            :disabled="isView"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 16, offset: 4 }" v-if="!isView">
          <a-space>
            <a-button type="primary" @click="handleSubmit">提交</a-button>
            <a-button @click="handleCancel">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
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
const formRef = ref()

// 页面模式
const isEdit = computed(() => route.name === 'TaskEdit')
const isView = computed(() => route.name === 'TaskView')

// 页面标题
const getPageTitle = computed(() => {
  if (isView.value) return '任务详情'
  if (isEdit.value) return '编辑任务'
  return '新建任务'
})

// 表单数据
const formData = reactive({
  taskName: '',
  channelId: undefined,
  categoryId: undefined,
  type: undefined,
  reward: undefined,
  brand: '',
  groupIds: [],
  customFields: [{ title: '', type: 'input' }],
  startTime: null,
  endTime: null,
  quota: undefined,
  unlimitedQuota: true,
  fansRequired: undefined,
  contentRequirement: '',
  taskInfo: '',
  notice: `1.请尽快完成发布，填写发布链接。
2.任务结束后无法填写，不能结算。
3.发布内容不符合要求，将无法审核通过。
4.填写链接无法访问或其他无关链接，视为放弃结算。`
})

// 表单校验规则
const rules = {
  taskName: [{ required: true, message: '请输入任务名称' }],
  channelId: [{ required: true, message: '请选择平台渠道' }],
  categoryId: [{ required: true, message: '请选择达人领域' }],
  type: [{ required: true, message: '请选择任务类型' }],
  reward: [{ required: true, message: '请输入任务奖励' }],
  fansRequired: [{ required: true, message: '请输入粉丝要求' }]
}

// 选项数据
const channelOptions = [
  { id: 1, name: '抖音' },
  { id: 2, name: '快手' }
]

const groupOptions = [
  { id: 1, name: '群组1' },
  { id: 2, name: '群组2' },
  { id: 3, name: '群组3' }
]

// 自定义字段方法
const addField = () => {
  if (formData.customFields.length < 10) {
    formData.customFields.push({ title: '', type: 'input' })
  }
}

const removeField = (index) => {
  formData.customFields.splice(index, 1)
}

// 获取达人领域文本
const getCreatorCategoryText = (category) => {
  return getLangText(CreatorCategoryLang, category, locale.value)
}

// 获取任务类型文本
const getTaskTypeText = (type) => {
  return getLangText(TaskTypeLang, type, locale.value)
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate().then(() => {
    // TODO: 实现提交逻辑
    message.success('提交成功')
    router.push('/task/list')
  })
}

// 取消
const handleCancel = () => {
  router.back()
}

// 切换到编辑模式
const handleEdit = () => {
  router.push(`/task/edit/${route.params.id}`)
}

// 获取任务详情
const getTaskDetail = async (id) => {
  try {
    // TODO: 实现获取任务详情逻辑
  } catch (error) {
    message.error('获取任务详情失败')
  }
}

onMounted(() => {
  if (isEdit.value || isView.value) {
    getTaskDetail(route.params.id)
  }
})
</script>

<style lang="less" scoped>
.task-form {
  .page-header {
    :deep(.ant-page-header-heading-left) {
      flex: 1;
    }
  }

  .form-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
  }

  .group-select {
    .group-tip {
      margin-top: 4px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }
  }

  .custom-fields {
    .field-item {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 8px;
      }
    }
  }

  .text-center {
    text-align: center;
    line-height: 32px;
  }
}
</style> 