<template>
  <div class="channel content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left"></div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            添加支付渠道
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
        <a-form-item label="支付渠道名称" name="name">
          <a-input
            v-model:value="formData.name"
            placeholder="请输入支付渠道名称"
          />
        </a-form-item>
        <a-form-item label="银行名称" name="bank">
          <a-input
            v-model:value="formData.bank"
            placeholder="请输入银行名称"
          />
        </a-form-item>
        <a-form-item label="商户ID" name="merchantId">
          <a-input
            v-model:value="formData.merchantId"
            placeholder="请输入商户ID"
          />
        </a-form-item>
        <a-form-item label="密钥" name="secretKey">
          <a-input
            v-model:value="formData.secretKey"
            placeholder="请输入密钥"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, put, del } from '@/utils/request'

const loading = ref(false)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('add') // add, edit
const formRef = ref()

// 表单数据
const formData = reactive({
  name: '',
  bank: '',
  merchantId: '',
  secretKey: ''
})
const currentId = ref()

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入支付渠道名称' }],
  bank: [{ required: true, message: '请输入银行名称' }],
  merchantId: [{ required: true, message: '请输入商户ID' }]
}

// 表格列配置
const columns = [
  {
    title: '渠道名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '银行名称',
    dataIndex: 'bank',
    key: 'bank',
    width: 100
  },
  {
    title: '商户ID',
    dataIndex: 'merchantId',
    key: 'merchantId',
    width: 100
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: '操作',
    key: 'action',
    width: 200
  }
]

// 表格数据
const tableData = ref([])

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: '添加支付渠道',
    edit: '编辑支付渠道'
  }
  return titles[modalType.value]
})

// 添加渠道
const handleAdd = () => {
  modalType.value = 'add'
  formData.name = ''
  formData.bank = ''
  formData.merchantId = ''
  formData.secretKey = ''
  modalVisible.value = true
}

// 编辑渠道
const handleEdit = (record) => {
  modalType.value = 'edit'
  currentId.value = record.id  // 保存 id 用于编辑请求
  formData.name = record.name
  formData.bank = record.bank
  formData.merchantId = record.merchantId
  formData.secretKey = null
  modalVisible.value = true
}

// 删除渠道
const handleDelete = async (record) => {
  try {
    const res = await del('paymentChannels.delete', {}, {
    // 替换 URL 中的 :id 参数
    urlParams: {
      id: record.id
    }
  })
    if(res.code === 0){
      message.success('删除成功')
      loadData()
    }else{
      message.error(res.message)
    }
  } catch (error) {
    message.error('删除失败')
  }
}

const addChannel = async () => {
  if(!formData.secretKey){
    message.error('请输入密钥')
    return
  }
  const res = await post('paymentChannels.add', formData)
  if(res.code === 0){
    message.success('添加成功')
    modalVisible.value = false
    loadData()
  } else {
    message.error(res.message)
  }
}

const editChannel = async () => {
  const res = await put('paymentChannels.edit', {
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
    const res = await get('paymentChannels.list')
    tableData.value = res.data
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

  .danger {
    color: #ff4d4f;
  }
}
</style> 