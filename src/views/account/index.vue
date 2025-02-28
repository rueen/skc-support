<template>
  <div class="account-list">
    <a-empty description="开发中..." />
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

// 查询参数
const queryParams = reactive({
  username: '',
  roleId: undefined,
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
  username: '',
  password: '',
  roleId: undefined,
  remark: ''
})

// 表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ],
  roleId: [
    { required: true, message: '请选择角色' }
  ]
}

// 角色选项
const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '财务', value: 'finance' }
]

// 状态选项
const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '禁用', value: 'disabled' }
]

// 表格列定义
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    key: 'roleId',
    customRender: ({ text }) => {
      const option = roleOptions.find(item => item.value === text)
      return option ? option.label : text
    }
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
    width: 180
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
    width: 250
  }
]

// 重置密码相关
const resetPwdVisible = ref(false)
const resetPwdLoading = ref(false)
const resetPwdFormRef = ref()
const resetPwdForm = reactive({
  password: '',
  confirmPassword: ''
})
const resetPwdRules = {
  password: [
    { required: true, message: '请输入新密码' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码' },
    {
      validator: (rule, value) => {
        if (value && value !== resetPwdForm.password) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      }
    }
  ]
}

// 计算属性
const modalTitle = computed(() => isEdit.value ? '编辑账号' : '新增账号')

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
}

const handleReset = () => {
  Object.assign(queryParams, {
    username: '',
    roleId: undefined,
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
    username: '',
    password: '',
    roleId: undefined,
    remark: ''
  })
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

const handleResetPwd = (record) => {
  resetPwdForm.password = ''
  resetPwdForm.confirmPassword = ''
  resetPwdVisible.value = true
}

const handleResetPwdConfirm = () => {
  resetPwdFormRef.value.validate().then(async () => {
    try {
      resetPwdLoading.value = true
      // TODO: 实现重置密码逻辑
      message.success('重置密码成功')
      resetPwdVisible.value = false
    } catch (error) {
      message.error('重置密码失败')
    } finally {
      resetPwdLoading.value = false
    }
  })
}
</script>

<style lang="less" scoped>
.account-management {
  .table-operations {
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