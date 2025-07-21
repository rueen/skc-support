<template>
  <div class="content-container">
    <page-header
      :title="isEdit ? $t('messages.detail.editTitle') : $t('messages.detail.createTitle')"
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
        <a-form-item :label="$t('messages.detail.title')" name="title">
          <a-input
            v-model:value="formData.title"
            :placeholder="$t('common.inputPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('messages.detail.content')" name="content">
          <a-textarea
            v-model:value="formData.content"
            :rows="10"
            :placeholder="$t('common.inputPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('messages.detail.time')" required>
          <a-row :gutter="8">
            <a-col :span="11">
              <a-form-item name="startTime">
                <a-date-picker
                  v-model:value="formData.startTime"
                  show-time
                  style="width: 100%"
                  :placeholder="$t('messages.detail.startTime')"
                  :format="'YYYY-MM-DD HH:mm:ss'"
                />
              </a-form-item>
            </a-col>
            <a-col :span="2" style="text-align: center;line-height: 32px;">
              <span>至</span>
            </a-col>
            <a-col :span="11">
              <a-form-item name="endTime">
                <a-date-picker
                  v-model:value="formData.endTime"
                  show-time
                  style="width: 100%"
                  :placeholder="$t('messages.detail.endTime')"
                  :format="'YYYY-MM-DD HH:mm:ss'"
                />
              </a-form-item>
            </a-col>
          </a-row>
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const formRef = ref()

// 页面状态
const isEdit = computed(() => route.name === 'MessagesEdit')

// 表单数据
const formData = reactive({
  title: '',
  content: '',
  startTime: undefined,
  endTime: undefined,
})

// 表单校验规则
const rules = {
  title: [{ required: true, message: t('messages.detail.validation.titleRequired') }],
  content: [{ required: true, message: t('messages.detail.validation.contentRequired') }],
  startTime: [{ required: true, message: t('messages.detail.validation.startTimeRequired') }],
  endTime: [{ required: true, message: t('messages.detail.validation.endTimeRequired') }]
}

const handleAdd = async (submitData) => {
  try {
    submitLoading.value = true
    // TODO: 实现提交逻辑
    const res = await post('messages.add', submitData)
    if(res.code === 0) {
      message.success(t('common.submitSuccess'))
      router.back()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log(error)
    message.error(t('common.submitFailed'))
  } finally {
    submitLoading.value = false
  }
}

const handleEdit = async (submitData) => {
  try {
    submitLoading.value = true
    // TODO: 实现提交逻辑
    const res = await put('messages.edit', {
      ...submitData,
    }, {
      urlParams: {
        id: route.params.id
      }
    })
    if(res.code === 0) {
      message.success(t('common.submitSuccess'))
      router.back()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log(error)
    message.error(t('common.submitFailed'))
  } finally {
    submitLoading.value = false
  }
}
// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    // 构建提交数据
    const submitData = {
      ...formData,
      startTime: formData.startTime ? dayjs(formData.startTime).format('YYYY-MM-DD HH:mm:ss') : null,
      endTime: formData.endTime ? dayjs(formData.endTime).format('YYYY-MM-DD HH:mm:ss') : null,
    }
    if(isEdit.value) {
      await handleEdit(submitData)
    } else {
      await handleAdd(submitData)
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
    const res = await get('messages.detail', {}, {
      urlParams: {
        id
      }
    })
    if(res.code === 0){
      const data = res.data;
      Object.assign(formData, data, {
        startTime: dayjs(data.startTime),
        endTime: dayjs(data.endTime)
      })
    }
  } catch (error) {
    console.log(error)
    message.error(error)
  }
}

onMounted(() => {
  if (isEdit.value) {
    getTaskDetail(route.params.id)
  }
})
</script>

<style lang="less" scoped>

</style> 