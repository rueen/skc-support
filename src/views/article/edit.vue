<template>
  <div class="article-edit">
    <a-page-header
      :title="isEdit ? '编辑文章' : '新建文章'"
      @back="goBack"
    />
    
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="文章标题" name="title">
          <a-input
            v-model:value="formState.title"
            placeholder="请输入文章标题"
          />
        </a-form-item>

        <a-form-item label="文章内容" name="content">
          <div class="editor-wrapper">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              mode="default"
            />
            <Editor
              style="height: 500px"
              v-model="formState.content"
              :defaultConfig="editorConfig"
              mode="default"
              @onCreated="handleEditorCreated"
            />
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-space>
            <a-button type="primary" @click="handleSubmit(true)">发布</a-button>
            <a-button @click="handleSubmit(false)">保存草稿</a-button>
            <a-button @click="goBack">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, shallowRef, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import '@wangeditor/editor-for-vue/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const router = useRouter()
const route = useRoute()
const formRef = ref()
const isEdit = ref(false)
const loading = ref(false)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 表单数据
const formState = reactive({
  title: '',
  content: ''
})

// 表单校验规则
const rules = {
  title: [
    { required: true, message: '请输入文章标题' }
  ],
  content: [
    { required: true, message: '请输入文章内容' }
  ]
}

// 编辑器配置
const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入文章内容'
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleEditorCreated = (editor) => {
  editorRef.value = editor
}

// 获取文章详情
const getArticleDetail = async (id) => {
  try {
    loading.value = true
    // TODO: 实现获取文章详情逻辑
    const data = {
      title: '测试文章',
      content: '<p>测试内容</p>'
    }
    Object.assign(formState, data)
  } catch (error) {
    message.error('获取文章详情失败')
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = (isPublish) => {
  formRef.value.validate().then(async () => {
    try {
      loading.value = true
      // TODO: 实现提交逻辑
      message.success('提交成功')
      goBack()
    } catch (error) {
      message.error('提交失败')
    } finally {
      loading.value = false
    }
  })
}

// 返回列表页
const goBack = () => {
  router.push('/article')
}

// 初始化
const id = route.params.id
if (id) {
  isEdit.value = true
  getArticleDetail(id)
}
</script>

<style lang="less" scoped>
.article-edit {
  background: #fff;
  padding: 24px;
  
  .form-container {
    max-width: 1200px;
    margin: 24px auto;
  }

  .editor-wrapper {
    border: 1px solid #ccc;
    z-index: 100;
  }

  :deep(.w-e-text-container) {
    min-height: 500px;
  }
}
</style> 