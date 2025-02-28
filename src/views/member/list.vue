<template>
  <div class="member-list content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="会员名称">
              <a-input
                v-model:value="searchForm.memberName"
                placeholder="请输入会员名称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="手机号">
              <a-input
                v-model:value="searchForm.phone"
                placeholder="请输入手机号"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="所属群">
              <a-select
                v-model:value="searchForm.groupId"
                placeholder="请选择所属群"
                style="width: 200px"
                allow-clear
              >
                <a-select-option v-for="item in groupOptions" :key="item.value">
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
        </div>
        <div class="right">
          <a-button type="primary" @click="handleAdd">
            <template #icon><plus-outlined /></template>
            新增会员
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'groupName'">
            <span>{{ record.groupName }}</span>
            <a-tag v-if="record.isGroupOwner" color="blue" style="margin-left: 10px;">群主</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a @click="handleView(record)">查看</a>
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

// 查询参数
const searchForm = reactive({
  memberName: '',
  phone: '',
  groupId: undefined
})

// 表格数据
const dataSource = ref([
  {
    id: 1,
    memberName: '张三',
    phone: '13800138001',
    groupName: '群组1',
    isGroupOwner: true,
    createTime: '2024-02-28 10:00:00'
  },
  {
    id: 2,
    memberName: '李四',
    phone: '13800138002',
    groupName: '群组2',
    isGroupOwner: false,
    createTime: '2024-02-28 11:00:00'
  }
])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 群组选项
const groupOptions = [
  { label: '群组1', value: '1' },
  { label: '群组2', value: '2' },
  { label: '群组3', value: '3' }
]

// 表格列定义
const columns = [
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '所属群',
    key: 'groupName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180
  },
  {
    title: '账户余额',
    dataIndex: 'balance',
    key: 'balance',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200
  }
]

// 方法定义
const handleQuery = () => {
  // TODO: 实现查询逻辑
  pagination.total = dataSource.value.length
}

const handleReset = () => {
  Object.assign(searchForm, {
    memberName: '',
    phone: '',
    groupId: undefined
  })
  handleQuery()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  handleQuery()
}

const handleAdd = () => {
  router.push('/member/create')
}

const handleEdit = (record) => {
  router.push(`/member/edit/${record.id}`)
}

const handleView = (record) => {
  router.push(`/member/view/${record.id}`)
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

// 初始化
handleQuery()
</script>

<style lang="less" scoped>
.member-list {
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