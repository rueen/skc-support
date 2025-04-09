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
          <div class="editor-wrapper">
            <textarea ref="editorEl"></textarea>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onBeforeUnmount, watch, nextTick } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'
import config from '@/config/env'
// 直接导入Froala Editor
import 'froala-editor/js/froala_editor.pkgd.min.js'
import FroalaEditor from 'froala-editor'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit
const formRef = ref()
const currentId = ref(null)
const editorEl = ref(null)
let editor = null

// Froala 编辑器配置
const froalaConfig = {
  placeholderText: '请输入文章内容',
  height: 300,
  toolbarButtons: ['fontSize', 'textColor', 'backgroundColor', 'formatOL', 'html'],
  // toolbarButtons: {
  //   moreText: {
  //     buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting'],
  //     buttonsVisible: 5
  //   },
  //   moreParagraph: {
  //     buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'lineHeight', 'outdent', 'indent'],
  //     buttonsVisible: 5
  //   },
  //   moreRich: {
  //     buttons: ['insertLink', 'insertImage', 'insertTable', 'emoticons', 'specialCharacters', 'insertHR'],
  //     buttonsVisible: 5
  //   },
  //   moreMisc: {
  //     buttons: ['undo', 'redo', 'fullscreen', 'html'],
  //     align: 'right',
  //     buttonsVisible: 4
  //   }
  // },
  language: 'zh_cn',
  imageUploadURL: config.imageUploadUrl,
  imageUploadParams: {
    type: 'article'
  },
  imageUploadMethod: 'POST',
  imageUploadHeaders: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  imageMaxSize: 5 * 1024 * 1024, // 5MB
  imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
  events: {
    'image.uploaded': function(response) {
      // 图片上传成功回调
      const responseObj = JSON.parse(response);
      if (responseObj.code === 0 && responseObj.data && responseObj.data.url) {
        return responseObj.data.url;
      }
      return false;
    },
    'image.error': function(error, response) {
      // 图片上传失败回调
      message.error('图片上传失败: ' + (error.message || '未知错误'));
    }
  }
}

// 表单数据
const formData = reactive({
  title: '',
  location: '',
  content: ''
})

// 表单校验规则
const rules = {
  title: [{ required: true, message: '请输入文章标题' }],
  content: [{ required: true, message: '请输入文章内容' }]
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
      message.success('删除成功')
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
  
  // 编辑时确保内容更新到编辑器
  nextTick(() => {
    if (editor) {
      editor.html.set(formData.content || '')
    }
  })
}

const addArticle = async () => {
  modalLoading.value = true
  try {
    const res = await post('article.add', {
      ...formData
    })
    if (res.code === 0) {
      message.success('添加成功')
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
      message.success('保存成功')
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
  
  // 监听模态框可见性变化
  watch(modalVisible, (newVal) => {
    if (newVal) {
      // 模态框显示后初始化编辑器
      nextTick(() => {
        if (editorEl.value && !editor) {
          initEditor()
        }
      })
    }
  })
})

// 初始化编辑器
const initEditor = () => {
  if (editor) {
    editor.destroy()
  }
  
  editor = new FroalaEditor(editorEl.value, {
    ...froalaConfig,
    events: {
      ...froalaConfig.events,
      'contentChanged': function() {
        formData.content = this.html.get()
      },
      'initialized': function() {
        this.html.set(formData.content || '')
      }
    }
  })
}

// 销毁编辑器
onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})
</script>

<style lang="less" scoped>
.article {
  .editor-wrapper {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    background: #fff;
    
    :deep(.fr-wrapper) {
      min-height: 300px;
    }
    
    :deep(.fr-box) {
      border: none;
    }
    
    :deep(.fr-toolbar) {
      border-top: none;
      border-left: none;
      border-right: none;
    }
  }
}
</style> 