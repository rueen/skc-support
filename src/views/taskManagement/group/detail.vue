<template>
  <div class="task-form content-container">
    <page-header
      :title="isEdit ? $t('task.group.editTitle') : $t('task.group.createTitle')"
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
        <a-form-item :label="$t('task.group.name')" name="taskGroupName">
          <a-input
            v-model:value="formData.taskGroupName"
            :placeholder="$t('common.inputPlaceholder')"
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const formRef = ref()

// 页面状态
const isEdit = computed(() => route.name === 'TaskEdit')

// 表单数据
const formData = reactive({
  taskGroupName: '',
})

// 表单校验规则
const rules = {
  taskGroupName: [{ required: true, message: t('task.group.validation.taskGroupNameRequired') }],
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

onMounted(() => {
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