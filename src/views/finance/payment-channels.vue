<template>
  <div class="channel content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left"></div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            {{ $t('financial.paymentChannels.add') }}
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
              <a @click="handleEdit(record)">{{ $t('financial.paymentChannels.edit') }}</a>
              <a-popconfirm
                :title="$t('financial.paymentChannels.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
                <a-typography-text type="danger">{{ $t('financial.paymentChannels.delete') }}</a-typography-text>
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
        <a-form-item :label="$t('financial.paymentChannels.channelName')" name="name">
          <a-input
            v-model:value="formData.name"
            :placeholder="$t('financial.paymentChannels.channelNamePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('financial.paymentChannels.bankName')" name="bank">
          <a-input
            v-model:value="formData.bank"
            :placeholder="$t('financial.paymentChannels.bankNamePlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('financial.paymentChannels.merchantId')" name="merchantId">
          <a-input
            v-model:value="formData.merchantId"
            :placeholder="$t('financial.paymentChannels.merchantIdPlaceholder')"
          />
        </a-form-item>
        <a-form-item :label="$t('financial.paymentChannels.secretKey')" name="secretKey">
          <a-input
            v-model:value="formData.secretKey"
            :placeholder="$t('financial.paymentChannels.secretKeyPlaceholder')"
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
  name: [{ required: true, message: t('financial.paymentChannels.channelNamePlaceholder') }],
  bank: [{ required: true, message: t('financial.paymentChannels.bankNamePlaceholder') }],
  merchantId: [{ required: true, message: t('financial.paymentChannels.merchantIdPlaceholder') }]
}

// 表格列配置
const columns = computed(() => [
  {
    title: t('financial.paymentChannels.channelName'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: t('financial.paymentChannels.bankName'),
    dataIndex: 'bank',
    key: 'bank',
  },
  {
    title: t('financial.paymentChannels.merchantId'),
    dataIndex: 'merchantId',
    key: 'merchantId',
  },
  {
    title: t('financial.paymentChannels.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: t('financial.paymentChannels.action'),
    key: 'action',
    width: 200
  }
])

// 表格数据
const tableData = ref([])

// 计算弹窗标题
const modalTitle = computed(() => {
  const titles = {
    add: t('financial.paymentChannels.addTitle'),
    edit: t('financial.paymentChannels.editTitle')
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

</style> 