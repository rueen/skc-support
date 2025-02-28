<template>
  <div class="account content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="账号名称">
              <a-input
                v-model:value="searchForm.username"
                placeholder="请输入账号名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleSearch">
                  {{ $t('common.search') }}
                </a-button>
                <a-button @click="handleReset">
                  {{ $t('common.reset') }}
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            添加账号
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
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handlePermission(record)" v-if="!record.isAdmin">权限设置</a>
              <a @click="handleEdit(record)" v-if="!record.isAdmin">编辑</a>
              <a-popconfirm
                title="确定要删除该账号吗？"
                @confirm="handleDelete(record)"
                v-if="!record.isAdmin"
              >
                <a class="danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <!-- 添加/编辑账号弹窗 -->
    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      :confirmLoading="formLoading"
      @ok="handleFormOk"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="formData.username"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :required="formType === 'add'"
        >
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label="账号说明" name="description">
          <a-textarea
            v-model:value="formData.description"
            placeholder="请输入账号说明"
            :rows="4"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 权限设置弹窗 -->
    <a-modal
      v-model:visible="permissionVisible"
      title="权限设置"
      :width="700"
      :confirmLoading="permissionLoading"
      @ok="handlePermissionOk"
    >
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="导航权限">
          <a-checkbox-group v-model:value="permissionData.menus">
            <a-checkbox v-for="menu in menuOptions" :key="menu.key" :value="menu.key">
              {{ menu.title }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="任务权限">
          <a-checkbox-group v-model:value="permissionData.task">
            <a-checkbox value="create">新增任务</a-checkbox>
            <a-checkbox value="edit">编辑任务</a-checkbox>
            <a-checkbox value="view">查看任务</a-checkbox>
            <a-checkbox value="delete">删除任务</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="任务审核">
          <a-checkbox-group v-model:value="permissionData.taskAudit">
            <a-checkbox value="view">查看任务</a-checkbox>
            <a-checkbox value="approve">审核通过</a-checkbox>
            <a-checkbox value="reject">审核拒绝</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="会员权限">
          <a-checkbox-group v-model:value="permissionData.member">
            <a-checkbox value="create">添加会员</a-checkbox>
            <a-checkbox value="view">查看会员</a-checkbox>
            <a-checkbox value="edit">编辑会员</a-checkbox>
            <a-checkbox value="delete">删除会员</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="账号审核">
          <a-checkbox-group v-model:value="permissionData.accountAudit">
            <a-checkbox value="approve">审核通过</a-checkbox>
            <a-checkbox value="reject">审核拒绝</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="群组权限">
          <a-checkbox-group v-model:value="permissionData.group">
            <a-checkbox value="create">添加群组</a-checkbox>
            <a-checkbox value="view">查看群组</a-checkbox>
            <a-checkbox value="edit">编辑群组</a-checkbox>
            <a-checkbox value="delete">删除群组</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const formVisible = ref(false)
const formLoading = ref(false)
const formType = ref('add') // add, edit
const formRef = ref()
const permissionVisible = ref(false)
const permissionLoading = ref(false)
const currentRecord = ref(null)

// 搜索表单
const searchForm = reactive({
  username: ''
})

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  description: ''
})

// 权限数据
const permissionData = reactive({
  menus: [],
  task: [],
  taskAudit: [],
  member: [],
  accountAudit: [],
  group: []
})

// 表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }]
}

// 导航菜单选项
const menuOptions = [
  { key: 'task', title: '任务管理' },
  { key: 'taskAudit', title: '任务审核' },
  { key: 'accountAudit', title: '账号审核' },
  { key: 'member', title: '会员管理' },
  { key: 'settlement', title: '结算管理' },
  { key: 'channel', title: '渠道管理' },
  { key: 'group', title: '群组管理' },
  { key: 'account', title: '账号管理' },
  { key: 'article', title: '文章管理' }
]

// 表格列配置
const columns = [
  {
    title: '账号名称',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '账号说明',
    dataIndex: 'description',
    key: 'description'
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
const formTitle = computed(() => formType.value === 'add' ? '添加账号' : '编辑账号')

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.username = ''
  handleSearch()
}

// 表格变化
const handleTableChange = (pag) => {
  Object.assign(pagination, pag)
  loadData()
}

// 添加账号
const handleAdd = () => {
  formType.value = 'add'
  formData.username = ''
  formData.password = ''
  formData.description = ''
  formVisible.value = true
}

// 编辑账号
const handleEdit = (record) => {
  formType.value = 'edit'
  formData.username = record.username
  formData.password = ''
  formData.description = record.description
  formVisible.value = true
}

// 删除账号
const handleDelete = async (record) => {
  try {
    // TODO: 实现删除逻辑
    message.success('删除成功')
    loadData()
  } catch (error) {
    message.error('删除失败')
  }
}

// 权限设置
const handlePermission = (record) => {
  currentRecord.value = record
  // TODO: 获取当前账号的权限设置
  permissionVisible.value = true
}

// 确认权限设置
const handlePermissionOk = async () => {
  try {
    permissionLoading.value = true
    // TODO: 实现权限保存逻辑
    message.success('权限设置成功')
    permissionVisible.value = false
  } catch (error) {
    message.error('权限设置失败')
  } finally {
    permissionLoading.value = false
  }
}

// 确认表单
const handleFormOk = async () => {
  try {
    await formRef.value.validate()
    formLoading.value = true
    // TODO: 实现保存逻辑
    message.success(formType.value === 'add' ? '添加成功' : '编辑成功')
    formVisible.value = false
    loadData()
  } catch (error) {
    console.error(error)
  } finally {
    formLoading.value = false
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    tableData.value = [{
  username: 'admin',
  description: '管理员',
  isAdmin: true
}, {
  username: 'user',
  description: '用户',
  isAdmin: false  
}]
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

// 初始化
loadData()
</script>

<style lang="less" scoped>
.account {
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