<template>
  <div class="article content-container">
    <div class="table-container">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 编辑文章弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      title="编辑文章"
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
        <a-form-item label="文章标题" name="title">
          <a-input
            v-model:value="formData.title"
            placeholder="请输入文章标题"
          />
        </a-form-item>
        <a-form-item label="文章内容" name="content">
          <div class="editor-wrapper">
            <a-textarea
              v-model:value="formData.content"
              placeholder="请输入文章内容"
              :auto-size="{ minRows: 10, maxRows: 20 }"
            />
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const formRef = ref()

// 表单数据
const formData = reactive({
  id: null,
  title: '',
  content: ''
})

// 表单校验规则
const rules = {
  title: [{ required: true, message: '请输入文章标题' }],
  content: [{ required: true, message: '请输入文章内容' }]
}

// 表格列配置
const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: '操作',
    key: 'action',
    width: 100
  }
]

// 表格数据
const tableData = ref([
  {
    id: 1,
    title: '用户协议',
    content: '这是用户协议的内容...',
    updateTime: '2024-02-28 10:00:00'
  },
  {
    id: 2,
    title: '隐私政策',
    content: '这是隐私政策的内容...',
    updateTime: '2024-02-28 11:00:00'
  }
])

// 编辑文章
const handleEdit = (record) => {
  formData.id = record.id
  formData.title = record.title
  formData.content = record.content
  modalVisible.value = true
}

// 确认编辑
const handleModalOk = async () => {
  try {
    await formRef.value.validate()
    modalLoading.value = true

    // TODO: 实现保存逻辑
    const index = tableData.value.findIndex(item => item.id === formData.id)
    if (index !== -1) {
      tableData.value[index] = {
        ...tableData.value[index],
        title: formData.title,
        content: formData.content,
        updateTime: new Date().toLocaleString()
      }
    }

    message.success('保存成功')
    modalVisible.value = false
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
    // TODO: 实现数据加载逻辑
  } finally {
    loading.value = false
  }
}

// 初始化
loadData()
</script>

<style lang="less" scoped>
.article {
  .editor-wrapper {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    padding: 8px;
    background: #fff;

    :deep(.ant-input) {
      border: none;
      
      &:focus {
        box-shadow: none;
      }
    }
  }
}
</style> 