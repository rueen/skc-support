<template>
  <div class="channel-management">
    <div class="table-operations">
      <a-form layout="inline" :model="queryParams">
        <a-form-item label="渠道名称">
          <a-input
            v-model:value="queryParams.name"
            placeholder="请输入渠道名称"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="queryParams.status"
            placeholder="请选择状态"
            style="width: 120px"
            allow-clear
          >
            <a-select-option v-for="item in statusOptions" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleQuery">查询</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <div class="table-operations-right">
        <a-button type="primary" @click="handleAdd">
          <plus-outlined /> 添加渠道
        </a-button>
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-switch
            :checked="record.status === 'enabled'"
            :loading="record.statusLoading"
            @change="(checked) => handleStatusChange(record, checked)"
          />
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="handleEdit(record)">编辑</a>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="handleDelete(record)"
            >
              <a class="danger">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- 添加/编辑渠道弹窗 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      :confirmLoading="modalLoading"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="渠道名称" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入渠道名称"
          />
        </a-form-item>
        <a-form-item label="渠道标识" name="code">
          <a-input
            v-model:value="formState.code"
            placeholder="请输入渠道标识"
            :disabled="isEdit"
          />
        </a-form-item>
        <a-form-item label="渠道图标" name="icon">
          <a-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleIconChange"
          >
            <img v-if="formState.icon" :src="formState.icon" alt="icon" />
            <div v-else>
              <plus-outlined />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="排序" name="sort">
          <a-input-number
            v-model:value="formState.sort"
            :min="0"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea
            v-model:value="formState.remark"
            :rows="4"
            placeholder="请输入备注信息"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const isEdit = ref(false)
const formRef = ref()
const fileList = ref([])

// 查询参数
const queryParams = reactive({
  name: '',
  status: undefined
})

// 表格数据
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 表单数据
const formState = reactive({
  name: '',
  code: '',
  icon: '',
  sort: 0,
  remark: ''
})

// 表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入渠道名称' }
  ],
  code: [
    { required: true, message: '请输入渠道标识' },
    { pattern: /^[a-z][a-z0-9_]*$/, message: '渠道标识只能包含小写字母、数字和下划线，且必须以字母开头' }
  ],
  sort: [
    { required: true, message: '请输入排序值' }
  ]
}

// 状态选项
const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' }
]

// 表格列定义
const columns = [
  {
    title: '渠道名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '渠道标识',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '渠道图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 80,
    customRender: ({ text }) => (
      text ? <img src={text} alt="icon" style="width: 32px; height: 32px;" /> : null
    )
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 80
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150
  }
]

// 计算属性
const modalTitle = computed(() => isEdit.value ? '编辑渠道' : '添加渠道')

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    name: '',
    status: undefined
  })
  handleQuery()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleQuery()
}

const resetForm = () => {
  formRef.value?.resetFields()
  Object.assign(formState, {
    name: '',
    code: '',
    icon: '',
    sort: 0,
    remark: ''
  })
  fileList.value = []
}

const handleAdd = () => {
  isEdit.value = false
  resetForm()
  modalVisible.value = true
}

const handleEdit = (record) => {
  isEdit.value = true
  resetForm()
  Object.assign(formState, record)
  if (record.icon) {
    fileList.value = [{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: record.icon
    }]
  }
  modalVisible.value = true
}

const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    message.success('删除成功')
    handleQuery()
  } catch (error) {
    message.error('删除失败')
  }
}

const handleStatusChange = async (record, checked) => {
  try {
    record.statusLoading = true
    // TODO: 实现状态更新逻辑
    message.success('更新成功')
    record.status = checked ? 'enabled' : 'disabled'
  } catch (error) {
    message.error('更新失败')
  } finally {
    record.statusLoading = false
  }
}

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('只能上传图片文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!')
  }
  return isImage && isLt2M
}

const handleIconChange = (info) => {
  if (info.file.status === 'uploading') {
    return
  }
  if (info.file.status === 'done') {
    // TODO: 处理上传成功后的逻辑
    formState.icon = info.file.response.url
  }
}

const handleModalOk = () => {
  formRef.value.validate().then(async () => {
    try {
      modalLoading.value = true
      // TODO: 实现提交逻辑
      message.success('提交成功')
      modalVisible.value = false
      handleQuery()
    } catch (error) {
      message.error('提交失败')
    } finally {
      modalLoading.value = false
    }
  })
}
</script>

<style lang="less" scoped>
.channel-management {
  .table-operations {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .danger {
    color: #ff4d4f;
  }
  
  :deep(.ant-upload-select-picture-card) {
    width: 100px;
    height: 100px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style> 