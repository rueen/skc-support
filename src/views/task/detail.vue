<template>
  <div class="task-form content-container">
    <page-header
      :title="isEdit ? $t('task.detail.editTitle') : $t('task.detail.createTitle')"
      :back="true"
      class="page-header"
    >
    </page-header>
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
        layout="horizontal"
      >
        <a-form-item :label="$t('task.detail.taskName')" name="taskName">
          <a-input
            v-model:value="formData.taskName"
            :placeholder="$t('task.detail.taskNamePlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('task.detail.channelId')" name="channelId">
          <a-select
            v-model:value="formData.channelId"
            :placeholder="$t('task.detail.channelPlaceholder')"
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

        <a-form-item :label="$t('task.detail.category')" name="category">
          <a-input
            v-model:value="formData.category"
            :placeholder="$t('task.detail.categoryPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('task.detail.taskType')" name="taskType">
          <a-select
            v-model:value="formData.taskType"
            :placeholder="$t('task.detail.taskTypePlaceholder')"
          >
            <a-select-option
              v-for="option in taskTypeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label="$t('task.detail.reward')" name="reward">
          <a-input-number
            v-model:value="formData.reward"
            :min="0"
            :precision="2"
            :step="0.1"
            :placeholder="$t('task.detail.rewardPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('task.detail.fansRequired')" name="fansRequired">
          <a-input-number
            v-model:value="formData.fansRequired"
            :min="0"
            :step="1"
            :placeholder="$t('task.detail.fansRequiredPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('task.detail.taskTime')" required>
          <a-row :gutter="8">
            <a-col :span="11">
              <a-form-item name="startTime" :rules="[{ required: true, message: $t('task.detail.validation.startTimeRequired') }]">
                <a-date-picker
                  v-model:value="formData.startTime"
                  show-time
                  style="width: 100%"
                  :placeholder="$t('task.detail.startTime')"
                  :format="'YYYY-MM-DD HH:mm:ss'"
                />
              </a-form-item>
            </a-col>
            <a-col :span="2" class="text-center">
              <span>至</span>
            </a-col>
            <a-col :span="11">
              <a-form-item name="endTime" :rules="[{ required: true, message: $t('task.detail.validation.endTimeRequired') }]">
                <a-date-picker
                  v-model:value="formData.endTime"
                  show-time
                  style="width: 100%"
                  :placeholder="$t('task.detail.endTime')"
                  :format="'YYYY-MM-DD HH:mm:ss'"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item :label="$t('task.detail.specifyGroup')" name="groupIds">
          <div class="group-select">
            <a-radio-group v-model:value="formData.groupMode" @change="handleGroupModeChange">
              <a-radio :value="0">{{ $t('task.detail.noSpecify') }}</a-radio>
              <a-radio :value="1">{{ $t('task.detail.specifyGroups') }}</a-radio>
            </a-radio-group>
            
            <a-form-item-rest>
              <a-select
                v-if="formData.groupMode === 1"
                v-model:value="formData.groupIds"
                show-search
                :filter-option="false"
                mode="multiple"
                :placeholder="$t('task.detail.groupPlaceholder')"
                style="width: 100%; margin-top: 8px"
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
              <div v-else class="group-tip">
                {{ $t('task.detail.groupTip') }}
              </div>
            </a-form-item-rest>
          </div>
        </a-form-item>

        <a-form-item :label="$t('task.detail.userRange')" name="userRange">
          <div class="user-range">
            <a-radio-group v-model:value="formData.userRange">
              <a-radio :value="0">{{ $t('task.detail.allUsers') }}</a-radio>
              <a-radio :value="1">{{ $t('task.detail.taskCompletionCount') }}</a-radio>
            </a-radio-group>
            
            <a-form-item-rest>
              <div v-if="formData.userRange === 1" class="task-count">
                <a-form-item name="taskCount">
                  <a-input-number
                    v-model:value="formData.taskCount"
                    :min="0"
                    :precision="0"
                    :placeholder="$t('task.detail.countPlaceholder')"
                    :addon-after="$t('task.detail.times')"
                  />
                </a-form-item>
                <a-tooltip>
                  <template #title>
                    <div v-html="$t('task.detail.countTip')"></div>
                  </template>
                  <question-circle-outlined />
                </a-tooltip>
              </div>
            </a-form-item-rest>
          </div>
        </a-form-item>

        <a-form-item :label="$t('task.detail.quota')">
          <div class="quota-container">
            <a-space align="baseline">
              <a-form-item name="quota">
                <a-input-number
                v-model:value="formData.quota"
                :min="0"
                :precision="0"
                :disabled="formData.unlimitedQuota"
                :placeholder="$t('task.detail.quotaPlaceholder')"
              />
            </a-form-item>
            <a-checkbox
              v-model:checked="formData.unlimitedQuota"
            >
              {{ $t('task.detail.unlimited') }}
              </a-checkbox>
            </a-space>
          </div>
        </a-form-item>

        <a-form-item :label="$t('task.detail.brand')" name="brand">
          <a-input
            v-model:value="formData.brand"
            :placeholder="$t('task.detail.brandPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('task.detail.customFields')">
          <div class="custom-fields">
            <div v-for="(field, index) in formData.customFields" :key="index" class="field-item">
              <a-space align="baseline">
                <a-form-item
                  :name="['customFields', index, 'title']"
                  :rules="[{ required: true, message: $t('task.detail.validation.fieldTitleRequired') }]"
                >
                  <a-input
                    v-model:value="field.title"
                    :placeholder="$t('task.detail.fieldTitlePlaceholder')"
                  />
                </a-form-item>
                <a-select
                  v-model:value="field.type"
                  style="width: 120px"
                >
                  <a-select-option value="post">{{ $t('task.detail.fieldType.post') }}</a-select-option>
                  <a-select-option value="group">{{ $t('task.detail.fieldType.group') }}</a-select-option>
                  <a-select-option value="input">{{ $t('task.detail.fieldType.input') }}</a-select-option>
                  <a-select-option value="image">{{ $t('task.detail.fieldType.image') }}</a-select-option>
                </a-select>
                <a-button
                  type="link"
                  danger
                  @click="removeField(index)"
                >
                  {{ $t('task.detail.deleteField') }}
                </a-button>
              </a-space>
            </div>
            <a-button
              v-if="formData.customFields.length < 10"
              type="dashed"
              block
              @click="addField"
            >
              <plus-outlined />{{ $t('task.detail.addField') }}
            </a-button>
          </div>
        </a-form-item>

        <a-form-item :label="$t('task.detail.contentRequirement')" name="contentRequirement">
          <a-textarea
            v-model:value="formData.contentRequirement"
            :rows="4"
            :placeholder="$t('task.detail.contentRequirementPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('task.detail.taskInfo')" name="taskInfo">
          <a-textarea
            v-model:value="formData.taskInfo"
            :rows="4"
            :placeholder="$t('task.detail.taskInfoPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('task.detail.notice')" name="notice">
          <a-textarea
            v-model:value="formData.notice"
            :rows="4"
            :placeholder="$t('task.detail.noticePlaceholder')"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
          <a-space>
            <a-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</a-button>
            <a-button @click="handleCancel">{{ $t('common.cancel') }}</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import { get, post, put } from '@/utils/request'
import dayjs from 'dayjs'
import { useEnumStore } from '@/stores'
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const enumStore = useEnumStore()
const { t } = useI18n()

// 计算任务类型选项 
const taskTypeOptions = computed(() => {
  // 如果枚举数据还未加载完成，则返回空数组
  if (!enumStore.loaded) {
    return []
  }

  // 使用store提供的方法获取选项列表
  return enumStore.getEnumOptions('TaskType')
})

const route = useRoute()
const router = useRouter()
const formRef = ref()

// 页面状态
const isEdit = computed(() => route.name === 'TaskEdit')

// 表单数据
const formData = reactive({
  taskName: '',
  channelId: undefined,
  category: undefined,
  taskType: undefined,
  reward: undefined,
  brand: '',
  groupIds: [],
  groupMode: 0,
  customFields: [{ title: '', type: 'post' }],
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
4.填写链接无法访问或其他无关链接，视为放弃结算。`,
  userRange: 0,
  taskCount: 0
})

// 表单校验规则
const rules = {
  taskName: [{ required: true, message: t('task.detail.validation.taskNameRequired') }],
  channelId: [{ required: true, message: t('task.detail.validation.channelRequired') }],
  category: [{ required: true, message: t('task.detail.validation.categoryRequired') }],
  taskType: [{ required: true, message: t('task.detail.validation.taskTypeRequired') }],
  reward: [{ required: true, message: t('task.detail.validation.rewardRequired') }],
  fansRequired: [{ required: true, message: t('task.detail.validation.fansRequired') }],
  groupIds: [
    { 
      validator: (_, value) => {
        if (formData.groupMode === 1 && (!value || value.length === 0)) {
          return Promise.reject(t('task.detail.validation.groupRequired'))
        }
        return Promise.resolve()
      }
    }
  ],
  taskCount: [
    {
      validator: (_, value) => {
        if (formData.userRange === 1 && (value === undefined || value === null)) {
          return Promise.reject(t('task.detail.validation.taskCountRequired'))
        }
        return Promise.resolve()
      }
    }
  ]
}

// 选项数据
const channelOptions = ref([])

const groupOptions = ref([])

// 自定义字段方法
const addField = () => {
  if (formData.customFields.length < 10) {
    formData.customFields.push({ title: '', type: 'group' })
  }
}

const removeField = (index) => {
  formData.customFields.splice(index, 1)
}

// 群组模式变更处理
const handleGroupModeChange = (e) => {
  if (e.target.value === 0) {
    formData.groupIds = []
  }
}

const addTask = async () => {
  try {
    submitLoading.value = true
    // 构建提交数据
    const submitData = {
      ...formData,
      groupIds: formData.groupMode === 0 ? [] : formData.groupIds,
      startTime: formData.startTime ? dayjs(formData.startTime).format('YYYY-MM-DD HH:mm:ss') : null,
      endTime: formData.endTime ? dayjs(formData.endTime).format('YYYY-MM-DD HH:mm:ss') : null
    }
    // TODO: 实现提交逻辑
    const res = await post('task.add', submitData)
    if(res.code === 0) {
      message.success(t('task.detail.submitSuccess'))
      router.back()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log(error)
    message.error(t('task.detail.submitFailed'))
  } finally {
    submitLoading.value = false
  }
}

const editTask = async () => {
  try {
    submitLoading.value = true
    // 构建提交数据
    const submitData = {
      ...formData,
      groupIds: formData.groupMode === 0 ? [] : formData.groupIds,
      startTime: formData.startTime ? dayjs(formData.startTime).format('YYYY-MM-DD HH:mm:ss') : null,
      endTime: formData.endTime ? dayjs(formData.endTime).format('YYYY-MM-DD HH:mm:ss') : null
    }
    // TODO: 实现提交逻辑
    const res = await put('task.edit', {
      ...submitData,
    }, {
      urlParams: {
        id: route.params.id
      }
    })
    if(res.code === 0) {
      message.success(t('task.detail.submitSuccess'))
      router.back()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log(error)
    message.error(t('task.detail.submitFailed'))
  } finally {
    submitLoading.value = false
  }
}
// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    if(isEdit.value) {
      await editTask()
    } else {
      await addTask()
    }
  })
}

// 取消
const handleCancel = () => {
  router.back()
}

// 获取任务详情
const getTaskDetail = async (id) => {
  try {
    // TODO: 实现获取任务详情逻辑
    const res = await get('task.detail', {}, {
      urlParams: {
        id
      }
    })
    if(res.code === 0){
      let data = {};
      for(let key in res.data) {
        if(key !== 'groups') {
          data[key] = res.data[key]
        }
      }
      // 转换日期字符串为日期对象
      if (data.startTime) {
        data.startTime = dayjs(data.startTime)
      }
      if (data.endTime) {
        data.endTime = dayjs(data.endTime)
      }
      Object.assign(formData, data)
    }
  } catch (error) {
    console.log(error)
    message.error(error)
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
    message.error(t('task.detail.loadGroupFailed'))
  }
}

onMounted(() => {
  loadChannelOptions()
  loadGroupOptions()
  if (isEdit.value) {
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
      margin-top: 8px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }
  }

  .text-center {
    text-align: center;
    line-height: 32px;
  }

  .quota-container {
    .ant-space-horizontal {
      display: flex;
      align-items: center;
    }
    .ant-form-item{
      margin-bottom: 0;
    }
  }

  .user-range {
    .task-count {
      margin-top: 8px;
      display: flex;
      align-items: center;
      
      .ant-form-item {
        margin-bottom: 0;
        margin-right: 8px;
      }
      
      .anticon {
        color: rgba(0, 0, 0, 0.45);
        cursor: pointer;
      }
    }
  }
}
</style> 