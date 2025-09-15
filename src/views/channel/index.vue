<template>
  <div class="content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left"></div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            {{ $t('channel.add') }}
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'icon'">
            <a-image
              :width="40"
              :height="40"
              :src="record.icon"
            />
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">{{ $t('channel.edit') }}</a>
              <a-popconfirm
                :title="$t('channel.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
                <a><a-typography-text type="danger">{{ $t('channel.delete') }}</a-typography-text></a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 添加/编辑/查看渠道弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      :confirmLoading="modalLoading"
      @ok="handleModalOk"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item :label="$t('channel.channelIcon')" name="icon">
          <a-upload
            v-model:file-list="fileList"
            :action="uploadConfig.action"
            :headers="uploadConfig.headers"
            :before-upload="beforeUpload"
            @success="handleUploadSuccess"
            @error="handleUploadError"
            accept="image/*"
            list-type="picture-card"
            :max-count="1"
          >
            <div v-if="!fileList.length">
              <plus-outlined />
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :label="$t('channel.channelName')" name="name">
          <a-input
            v-model:value="formData.name"
            :placeholder="$t('channel.channelNamePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('channel.customFields')" name="customFields">
          <a-checkbox-group v-model:value="formData.customFields" :options="customFieldsOptions" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'
import config from '@/config/env'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit
const formRef = ref()
const fileList = ref([])
const customFieldsOptions = ref([
  { label: t('channel.fansCount'), value: 'fansCount' },
  { label: t('channel.friendsCount'), value: 'friendsCount' },
  { label: t('channel.postsCount'), value: 'postsCount' },
])
// 上传配置
const uploadConfig = {
  action: config.imageUploadUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

// 表单数据
const formData = reactive({
  name: '',
  icon: '',
  customFields: ['fansCount']
})
const currentId = ref()

// 表单校验规则
const rules = {
  name: [{ required: true, message: t('channel.nameRequired') }],
  icon: [{ required: true, message: t('channel.iconRequired') }]
}

// 表格列配置
const columns = computed(() => [
  {
    title: t('channel.channelIcon'),
    dataIndex: 'icon',
    key: 'icon',
    width: 120
  },
  {
    title: t('channel.channelName'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: t('channel.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: t('channel.action'),
    key: 'action',
    width: 200
  }
])

// 表格数据
const tableData = ref([])

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: t('channel.addTitle'),
    edit: t('channel.editTitle')
  }
  return titles[modalType.value]
})

// 添加渠道
const handleAdd = () => {
  modalType.value = 'add'
  formData.name = ''
  formData.icon = ''
  fileList.value = []
  modalVisible.value = true
}

// 编辑渠道
const handleEdit = (record) => {
  modalType.value = 'edit'
  currentId.value = record.id  // 保存 id 用于编辑请求
  formData.name = record.name
  formData.icon = record.icon
  fileList.value = record.icon ? [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: record.icon
    }
  ] : [];
  formData.customFields = record.customFields;
  modalVisible.value = true
}

// 删除渠道
const handleDelete = async (record) => {
  const res = await del('channel.delete', {}, {
    // 替换 URL 中的 :id 参数
    urlParams: {
      id: record.id
    }
  })
  if(res.code === 0){
    message.success(res.message)
    loadData()
  }else{
    message.error(res.message)
  }
}

// 上传成功回调
const handleUploadSuccess = (res) => {
  if (res.code === 0) {
    formData.icon = res.data.url
    fileList.value = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: formData.icon
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

const addChannel = async () => {
  const res = await post('channel.add', formData)
  if(res.code === 0){
    message.success('添加成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}

const editChannel = async () => {
  const res = await put('channel.edit', {
    ...formData,
    id: currentId.value
  }, {
    // 替换 URL 中的 :id 参数
    urlParams: {
      id: currentId.value
    }
  })
  if(res.code === 0){
    message.success('编辑成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}

// 确认弹窗
const handleModalOk = async () => {
  try {
    await formRef.value.validate()
    modalLoading.value = true
    switch(modalType.value){
      case 'add':
        addChannel()
        break
      case 'edit':
        editChannel()
        break
    }
  } catch (error) {
    console.error(error)
  } finally {
    modalLoading.value = false
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await get('channel.list', {
      page: 1,
      pageSize: 200
    })
    tableData.value = res.data.list
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="less" scoped>

</style> 