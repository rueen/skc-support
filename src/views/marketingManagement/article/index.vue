<template>
  <div class="article content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left"></div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            <plus-outlined />
            {{ $t('article.add') }}
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handlePreview(record)">{{ $t('article.preview') }}</a>
              <a @click="handleEdit(record)">{{ $t('article.edit') }}</a>
              <a-popconfirm
                :title="$t('article.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
                <a><a-typography-text type="danger">{{ $t('article.delete') }}</a-typography-text></a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 编辑文章弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      :width="800"
      :confirmLoading="modalLoading"
      @ok="handleModalOk"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-form-item :label="$t('article.title')" name="title">
          <a-input
            v-model:value="formData.title"
            :placeholder="$t('article.titlePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('article.location')" name="location">
          <a-input
            v-model:value="formData.location"
            :placeholder="$t('article.locationPlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('article.content')" name="content">
          <quill-editor 
            v-model:content="formData.content"
            theme="snow"
            contentType="html"
            :toolbar="toolbarOptions"
            style="height: 300px;"
            :placeholder="$t('article.contentPlaceholder')"
            @ready="onQuillReady"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'
import config from '@/config/env'
import { useI18n } from 'vue-i18n'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { uploadImage } from '@/utils/upload'

const { t } = useI18n()

// 自定义工具栏配置，确保包含图片按钮
const toolbarOptions = [
  [{ 'header': [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link', 'image'], // 确保包含图片按钮
  ['clean']
]

// 图片上传函数
const uploadImageToServer = async (file) => {
  const result = await uploadImage(file, {
    params: {
      directory: 'article'
    }
  }, {
    imageRequired: t('common.upload.imageRequired'),
    imageSize: t('common.upload.imageSize'),
    uploadFailed: t('common.upload.uploadFailed')
  })
  if(result && result.url){
    return result.url
  }
  return null;
}

// Quill编辑器准备完成后的处理
const onQuillReady = (quill) => {
  // 获取工具栏的图片按钮
  const toolbar = quill.getModule('toolbar')
  if (toolbar) {
    // 重写图片按钮的点击事件
    toolbar.addHandler('image', () => {
      // 创建文件选择器
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()
      
      input.onchange = async () => {
        const file = input.files[0]
        if (!file) return
        
        try {
          // 显示上传中提示
          message.loading({ content: '图片上传中...', key: 'upload' })
          
          // 上传图片
          const imageUrl = await uploadImageToServer(file)
          console.log(imageUrl)
          
          // 获取当前光标位置
          const range = quill.getSelection(true)
          
          // 插入图片
          quill.insertEmbed(range.index, 'image', imageUrl)
          
          // 移动光标到图片后面
          quill.setSelection(range.index + 1)
          
          message.success({ content: '图片上传成功！', key: 'upload' })
        } catch (error) {
          console.error('图片上传失败:', error)
          message.error({ content: '图片上传失败，请重试', key: 'upload' })
        }
      }
    })
  }
}

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit
const formRef = ref()
const currentId = ref(null)

// 表单数据
const formData = reactive({
  title: '',
  location: '',
  content: ''
})

// 表单校验规则
const rules = {
  title: [{ required: true, message: t('article.titleRequired') }],
  content: [{ required: true, message: t('article.contentRequired') }]
}

// 表格列配置
const columns = computed(() => [
  {
    title: t('article.title'),
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: t('article.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: t('article.action'),
    key: 'action',
    width: 200
  }
])

// 表格数据
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: t('article.addTitle'),
    edit: t('article.editTitle')
  }
  return titles[modalType.value]
})

const handleDelete = async (record) => {
  try {
    const res = await del('article.delete', {
      id: record.id
    }, {
      urlParams: {
        id: record.id
      }
    })
    if (res.code === 0) {
      message.success(res.message)
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.error(error)
  }
}

// 添加文章
const handleAdd = () => {
  modalType.value = 'add'
  formData.title = ''
  formData.location = ''
  formData.content = ''
  modalVisible.value = true
}

const handlePreview = (record) => {
  window.open(`${config.h5Url}/article/${record.id}`, '_blank')
}

// 编辑文章
const handleEdit = (record) => {
  modalType.value = 'edit'
  formData.title = record.title
  formData.location = record.location
  formData.content = record.content
  modalVisible.value = true
  currentId.value = record.id
}

const addArticle = async () => {
  modalLoading.value = true
  try {
    const res = await post('article.add', {
      ...formData
    })
    if (res.code === 0) {
      message.success(res.message)
      modalVisible.value = false
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.error(error)
  } finally {
    modalLoading.value = false
  }
}

const editArticle = async () => {
  modalLoading.value = true
  try {
    const res = await put('article.edit', {
      id: currentId.value,
      ...formData
    }, {
      urlParams: {
        id: currentId.value
      }
    })
    if (res.code === 0) {
      message.success(res.message)
      modalVisible.value = false
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.error(error)
  } finally {
    modalLoading.value = false
  }
}

// 确认编辑
const handleModalOk = async () => {
  await formRef.value.validate()
  switch (modalType.value) {
    case 'add':
      await addArticle()
      break
    case 'edit':
      await editArticle()
      break
  }
}
const loadData = async () => {
  loading.value = true
  try {
    const res = await get('article.list', {
      page: pagination.current,
      pageSize: pagination.pageSize
    })
    if(res.code === 0){
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
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