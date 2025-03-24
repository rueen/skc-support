<template>
  <div class="waiter content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left"></div>
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
              <a @click="handleEdit(record)">编辑</a>
              <a-popconfirm
                title="确定要删除该账号吗？"
                @confirm="handleDelete(record)"
                v-if="!record.is_admin"
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
      v-model:open="formVisible"
      :title="formTitle"
      :confirmLoading="formLoading"
      @ok="handleFormOk"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input
            v-model:value="formData.username"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: formType === 'add', message: '请输入密码' }]"
        >
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label="备注" name="remarks">
          <a-textarea
            v-model:value="formData.remarks"
            placeholder="请输入备注"
            :rows="3"
          />
        </a-form-item>
        <a-form-item label="权限" name="permissions">
          <a-checkbox-group v-model:value="formData.permissions">
            <a-checkbox v-for="option in permissionsOptions" :key="option.title" :value="option.permissions">
              {{ $t('menu.' + option.title) }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { get, post, del, put } from '@/utils/request'

const loading = ref(false)
const formVisible = ref(false)
const formLoading = ref(false)
const formType = ref('add') // add, edit
const formRef = ref()
const currentId = ref(null)

// 表单数据
const formData = reactive({
  username: '',
  password: '',
  remarks: '',
  permissions: []
})

// 权限选项
const permissionsOptions = [
  { title: 'task', permissions: 'task:list' },
  { title: 'taskCreate', permissions: 'task:create' },
  { title: 'taskEdit', permissions: 'task:edit' },
  { title: 'account', permissions: 'account:list' },
  { title: 'taskSubmitted', permissions: 'task:submitted' },
  { title: 'taskSubmittedDetail', permissions: 'task:submittedDetail' },
  { title: 'member', permissions: 'member:list' },
  { title: 'memberCreate', permissions: 'member:create' },
  { title: 'memberEdit', permissions: 'member:edit' },
  { title: 'memberView', permissions: 'member:view' },
  { title: 'channel', permissions: 'channel:list' },
  { title: 'group', permissions: 'group:list' },
  { title: 'withdrawal', permissions: 'finance:withdrawal' },
  { title: 'bills', permissions: 'finance:bills' },
  { title: 'waiter', permissions: 'waiter:list' },
  { title: 'article', permissions: 'article:list' },
  { title: 'systemConfig', permissions: 'system:config' }
]

// 表格列配置
const columns = [
  {
    title: '账号名称',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks'
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
  formData.remarks = ''
  formData.permissions = []
  formVisible.value = true
}

// 编辑账号
const handleEdit = (record) => {
  currentId.value = record.id
  formType.value = 'edit'
  formData.username = record.username
  formData.password = ''
  formData.remarks = record.remarks
  formData.permissions = record.permissions.split(',')
  formVisible.value = true
}

// 删除账号
const handleDelete = async (record) => {
  try {
    const res = await del('waiter.delete', { id: record.id }, {
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

const addWaiter = async () => {
  try {
    formLoading.value = true
    const res = await post('waiter.add', {
      ...formData,
      permissions: formData.permissions.join(',')
    })
    if(res.code === 0){
      message.success('添加成功')
      formVisible.value = false
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('添加失败')
  } finally {
    formLoading.value = false
  }
}

const editWaiter = async () => {
  try {
    formLoading.value = true
    const params = {
      id: currentId.value,
      username: formData.username,
      remarks: formData.remarks,
      permissions: formData.permissions.join(',')
    }
    // 只有当密码不为空时才添加密码字段
    if (formData.password) {
      params.password = formData.password
    }
    const res = await put('waiter.edit', params, {
      urlParams: {
        id: currentId.value
      }
    })
    if(res.code === 0){
      message.success('编辑成功')
      formVisible.value = false
      loadData()
    } else {
      message.error(res.message)
    }
  } catch (error) {
    message.error('编辑失败')
  } finally {
    formLoading.value = false
  }
}

// 确认表单
const handleFormOk = async () => {
  await formRef.value.validate()
  switch(formType.value){
    case 'add':
      addWaiter()
      break
    case 'edit':
      editWaiter()
      break
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await get('waiter.list', {
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
.waiter {
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