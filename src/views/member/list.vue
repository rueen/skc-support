<template>
  <div class="member-list content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="会员昵称">
              <a-input
                v-model:value="searchForm.memberNickname"
                placeholder="请输入会员昵称"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="所属群组">
              <a-select
                v-model:value="searchForm.groupId"
                placeholder="请选择群组"
                allow-clear
                show-search
                :filter-option="false"
                @search="loadGroupOptions"
                style="width: 200px"
              >
                <a-select-option
                  v-for="item in groupOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.groupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleSearch">{{ $t('common.search') }}</a-button>
                <a-button @click="handleReset">{{ $t('common.reset') }}</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon><plus-outlined /></template>
              新增会员
            </a-button>
          </a-space>
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
          <template v-if="column.key === 'accountList'">
            <div style="display: inline-block;">
              <div v-for="item in record.accountList">
                <div>
                  <a-space>
                    账号：{{ item.account }}
                    <a-tag color="warning">{{ enumStore.getEnumText('AccountAuditStatus', item.accountAuditStatus) }}</a-tag>
                  </a-space>
                </div>
                <div class="link-text-container">
                  <span class="label">主页：</span>
                  <CopyContent :content="item.homeUrl">
                    <a :href="item.homeUrl" target="_blank" class="link-text">{{ item.homeUrl }}</a>
                  </CopyContent>
                </div>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'inviterNickname'">
            {{ record.inviterNickname || '--' }}
          </template>
          <template v-if="column.key === 'groups'">
            <div v-for="item in record.groups">
              <span>{{ item.groupName }}</span>
              <a-tag v-if="item.isOwner" color="blue" style="margin-left: 10px;">群主</a-tag>
            </div>
            <span v-if="!record.groups || record.groups.length === 0">--</span>
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
import { ref, reactive, onMounted } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { get, del } from '@/utils/request'
import { useEnumStore } from '@/stores'
import CopyContent from '@/components/CopyContent.vue'

const enumStore = useEnumStore()

const router = useRouter()
const route = useRoute()
const loading = ref(false)

// 查询参数
const searchForm = reactive({
  memberNickname: '',
  groupId: route.query.groupId
})

// 表格数据
const tableData = ref([])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 群组选项
const groupOptions = ref([])

// 表格列定义
const columns = [
  {
    title: '会员昵称',
    dataIndex: 'nickname',
    key: 'nickname'
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: '渠道账号信息',
    key: 'accountList'
  },
  {
    title: '邀请人',
    key: 'inviterNickname'
  },
  {
    title: '所属群组',
    key: 'groups'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 180
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150
  }
]

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

const handleReset = () => {
  Object.assign(searchForm, {
    memberNickname: '',
    groupId: undefined
  })
  handleSearch()
}

const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  loadData()
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
  const res = await del('member.delete', {}, {
    urlParams: {
      id: record.id
    }
  })
  if(res.code === 0){
    message.success('删除成功')
    loadData()
  } else {
    message.error(res.message)
  }
}

const loadData = async () => {
  loading.value = true
  try {
    // TODO: 实现数据加载逻辑
    const res = await get('member.list', {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...searchForm
    })
    if(res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
    } else {
      message.error(res.message)
    }
  } finally {
    loading.value = false
  }
}

// 获取群组列表
const loadGroupOptions = async (keyword = '') => {
  try {
    const res = await get('group.list', {
      page: 1,
      pageSize: 50,
      groupName: keyword
    })  
    if(res.code === 0){
      groupOptions.value = res.data.list || []
    }
  } catch (error) {
    message.error('获取群组列表失败')
  }
}

// 初始化
onMounted(() => {
  loadData()
  loadGroupOptions()
})
</script>

<style lang="less" scoped>
.member-list {
  .table-container {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
  }

  .table-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .left {
      flex: 1;
    }
  }

  .danger {
    color: #ff4d4f;
  }
}
</style> 