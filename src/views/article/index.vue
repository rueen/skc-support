<template>
  <div class="article content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left"></div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            添加文章
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
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除该文章吗？"
                @confirm="handleDelete(record)"
              >
                <a class="danger">删除</a>
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
        <a-form-item label="文章标题" name="title">
          <a-input
            v-model:value="formData.title"
            placeholder="请输入文章标题"
          />
        </a-form-item>
        <a-form-item label="location" name="location">
          <a-input
            v-model:value="formData.location"
            placeholder="英文字母、数字（不要以数字开头）、下划线"
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
import { ref, reactive, onMounted, computed } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'

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
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: '添加文章',
    edit: '编辑文章'
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
})
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