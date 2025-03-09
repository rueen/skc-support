<template>
  <div class="channel content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left"></div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            添加渠道
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
          <template v-if="column.key === 'icon'">
            <img :src="record.icon" alt="渠道图标" class="channel-icon" />
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除该渠道吗？"
                @confirm="handleDelete(record)"
              >
                <a class="danger">删除</a>
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
        <a-form-item label="渠道图标" name="icon">
          <a-upload
            v-model:file-list="fileList"
            :before-upload="beforeUpload"
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
        <a-form-item label="渠道名称" name="name">
          <a-input
            v-model:value="formData.name"
            placeholder="请输入渠道名称"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { get, post } from '@/utils/request'
const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit
const formRef = ref()
const fileList = ref([])

// 表单数据
const formData = reactive({
  name: '',
  icon: ''
})

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入渠道名称' }],
  icon: [{ required: true, message: '请上传渠道图标' }]
}

// 表格列配置
const columns = [
  {
    title: '渠道图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 100
  },
  {
    title: '渠道名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '操作',
    key: 'action',
    width: 200
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
    add: '添加渠道',
    edit: '编辑渠道'
  }
  return titles[modalType.value]
})

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

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
  formData.name = record.name
  formData.icon = record.icon
  fileList.value = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: record.icon
    }
  ]
  modalVisible.value = true
}

// 删除渠道
const handleDelete = async (record) => {
  try {
    const res = await post('channel.delete', { id: record.id })
    if(res.success){
      message.success('删除成功')
      loadData()
    }else{
      message.error(res.message)
    }
  } catch (error) {
    message.error('删除失败')
  }
}

// 上传前校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('只能上传图片文件！')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片必须小于 2MB！')
  }
  return isImage && isLt2M
}

const addChannel = async () => {
  const res = await post('channel.add', formData)
  if(res.success){
    message.success('添加成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}

const editChannel = async () => {
  const res = await post('channel.edit', formData)
  if(res.success){
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
      page: pagination.current,
      pageSize: pagination.pageSize
    })
    tableData.value = res.data.list
    pagination.total = res.data.total
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
.channel {
  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .channel-icon {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
  }

  .danger {
    color: #ff4d4f;
  }
}
</style> 