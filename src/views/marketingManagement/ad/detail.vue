<template>
  <div class="content-container">
    <page-header
      :title="isEdit ? $t('ad.detail.editTitle') : $t('ad.detail.createTitle')"
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
        <a-form-item :label="$t('ad.detail.title')" name="title">
          <a-input
            v-model:value="formData.title"
            :placeholder="$t('common.inputPlaceholder')"
          />
        </a-form-item>

        <a-form-item :label="$t('ad.detail.location')" name="location">
          <a-select
            v-model:value="formData.location"
            :placeholder="$t('common.selectPlaceholder')"
          >
            <a-select-option
              v-for="item in locationOptions"
              :key="item.code"
              :value="item.code"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label="$t('ad.detail.adTime')" required>
          <a-row :gutter="8">
            <a-col :span="11">
              <a-form-item name="startTime">
                <a-date-picker
                  v-model:value="formData.startTime"
                  show-time
                  style="width: 100%"
                  :placeholder="$t('ad.detail.startTime')"
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
                  :placeholder="$t('ad.detail.endTime')"
                  :format="'YYYY-MM-DD HH:mm:ss'"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item :label="$t('ad.detail.adImage')" required>
          <a-upload
            v-model:file-list="fileList"
            :action="uploadConfig.action"
            :headers="uploadConfig.headers"
            :before-upload="beforeUpload"
            @success="handleUploadSuccess"
            @error="handleUploadError"
            @change="handleUploadChange"
            accept="image/*"
            list-type="picture-card"
            :max-count="1"
          >
            <div v-if="!fileList.length">
              <plus-outlined />
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item :label="$t('ad.detail.link')" required>
          <a-radio-group v-model:value="formData.content.linkType" name="linkType">
            <a-radio value="none">{{ $t('ad.detail.linkType.none') }}</a-radio>
            <a-radio value="article">{{ $t('ad.detail.linkType.article') }}</a-radio>
            <a-radio value="task">{{ $t('ad.detail.linkType.task') }}</a-radio>
            <a-radio value="taskGroup">{{ $t('ad.detail.linkType.taskGroup') }}</a-radio>
          </a-radio-group>
          <!-- 选择文章 -->
          <a-button
            type="primary"
            @click="handleSelectArticle"
            v-if="formData.content.linkType === 'article'"
          >
            <span v-if="formData.content.articleId != null">{{ $t('ad.detail.selectArticleBtnText', {name: formData.content.articleName}) }}</span>
            <span v-else>{{ $t('ad.detail.selectArticleBtnText1') }}</span>
          </a-button>
          <!-- 选择任务 -->
          <a-button
            type="primary"
            @click="handleSelectTask"
            v-if="formData.content.linkType === 'task'"
          >
            <span v-if="formData.content.taskId != null">{{ $t('ad.detail.selectTaskBtnText', {name: formData.content.taskName}) }}</span>
            <span v-else>{{ $t('ad.detail.selectTaskBtnText1') }}</span>
          </a-button>
          <!-- 选择任务组 -->
          <a-button
            type="primary"
            @click="handleSelectTaskGroup"
            v-if="formData.content.linkType === 'taskGroup'"
          >
            <span v-if="formData.content.taskGroupId != null">{{ $t('ad.detail.selectTaskGroupBtnText', {name: formData.content.taskGroupName}) }}</span>
            <span v-else>{{ $t('ad.detail.selectTaskGroupBtnText1') }}</span>
          </a-button>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
          <a-space>
            <a-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</a-button>
            <a-button @click="handleCancel">{{ $t('common.cancel') }}</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <!-- 选择任务组件 -->
    <SelectTask
      v-model:visible="selectTaskVisible"
      :selectedId="formData.content.taskId"
      @confirm="handleTaskSelectConfirm"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader.vue'
import SelectTask from '@/components/SelectTask.vue'
import { get, post, put } from '@/utils/request'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import config from '@/config/env'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const formRef = ref()

const fileList = ref([])
// 上传配置
const uploadConfig = {
  action: config.imageUploadUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

// 页面状态
const isEdit = computed(() => route.name === 'AdEdit')

// 表单数据
const formData = reactive({
  title: '',
  location: 'home_banner',
  startTime: undefined,
  endTime: undefined,
  content: {
    adImage: '',
    linkType: 'none',
    articleId: null,
    articleName: null,
    taskId: null,
    taskName: null,
    taskGroupId: null,
    taskGroupName: null,
  }
})

// 表单校验规则
const rules = {
  title: [{ required: true, message: t('ad.detail.validation.titleRequired') }],
  location: [{ required: true, message: t('ad.detail.validation.locationRequired') }],
  startTime: [{ required: true, message: t('ad.detail.validation.startTimeRequired') }],
  endTime: [{ required: true, message: t('ad.detail.validation.endTimeRequired') }]
}

const handleUploadChange = (info) => {
  if(info.file.status === 'removed') {
    formData.content.adImage = '';
  }
}

// 上传成功回调
const handleUploadSuccess = (res) => {
  if (res.code === 0) {
    formData.content.adImage = res.data.url
    fileList.value = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: formData.content.adImage
      }
    ];
    message.success('上传成功')
  } else {
    message.error(response.message || '上传失败')
    // 移除失败的文件
    fileList.value = fileList.value.filter(item => item.uid !== file.uid)
  }
}

// 上传失败回调
const handleUploadError = () => {
  message.error('上传失败')
  // 清空文件列表
  fileList.value = []
}

// 上传前校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('只能上传图片文件！')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 1
  if (!isLt2M) {
    message.error('图片必须小于 1MB！')
    return false
  }
  return true
}

const selectTaskVisible = ref(false)
// 选择任务
const handleSelectTask = () => {
  selectTaskVisible.value = true
}
// 处理任务选择确认
const handleTaskSelectConfirm = ({ taskIds }) => {

}

const selectArticleVisible = ref(false)
const handleSelectArticle = () => {
  selectArticleVisible.value = true
}

const selectTaskGroupVisible = ref(false)
const handleSelectTaskGroup = () => {
  selectTaskGroupVisible.value = true
}

const handleAdd = async (submitData) => {
  try {
    submitLoading.value = true
    // TODO: 实现提交逻辑
    const res = await post('ad.add', submitData)
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
    const res = await put('ad.edit', {
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
    if(!formData.content.adImage) {
      message.error(t('ad.detail.validation.adImageRequired'))
      return
    }
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
    const res = await get('ad.detail', {}, {
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
      fileList.value = [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: data.content.adImage
        }
      ]
    }
  } catch (error) {
    console.log(error)
    message.error(error)
  }
}

const locationOptions = ref([])
const loadLocationOptions = async () => {
  try {
    const res = await get('public.location', {})  
    if(res.code === 0){
      locationOptions.value = res.data || []
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  loadLocationOptions()
  if (isEdit.value) {
    getTaskDetail(route.params.id)
  }
})
</script>

<style lang="less" scoped>

</style> 