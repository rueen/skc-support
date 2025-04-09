<template>
  <div class="member-list content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('member.search.memberNickname')">
              <a-input
                v-model:value="searchForm.memberNickname"
                :placeholder="$t('member.search.memberNicknamePlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('member.search.group')">
              <a-select
                v-model:value="searchForm.groupId"
                :placeholder="$t('member.search.groupPlaceholder')"
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
              {{ $t('member.list.add') }}
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
                    {{ $t('member.list.account') }}：{{ item.account }}
                    <a-tag color="warning">{{ enumStore.getEnumText('AccountAuditStatus', item.accountAuditStatus) }}</a-tag>
                  </a-space>
                </div>
                <div class="link-text-container">
                  <span class="label">{{ $t('member.list.homepage') }}：</span>
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
            <a-space v-for="item in record.groups">
              <span>{{ item.groupName }}</span>
              <GroupOwner v-if="item.isOwner" />
            </a-space>
            <span v-if="!record.groups || record.groups.length === 0">--</span>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">{{ $t('member.list.edit') }}</a>
              <a @click="handleView(record)">{{ $t('member.list.view') }}</a>
              <a-popconfirm
                :title="$t('member.list.deleteConfirm')"
                @confirm="handleDelete(record)"
              >
                <a class="danger">{{ $t('member.list.delete') }}</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { get, del } from '@/utils/request'
import { useEnumStore } from '@/stores'
import CopyContent from '@/components/CopyContent.vue'
import { useI18n } from 'vue-i18n'
import GroupOwner from '@/components/GroupOwner.vue'

const enumStore = useEnumStore()
const { t } = useI18n()

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
const columns = computed(() => [
  {
    title: t('member.list.memberNickname'),
    dataIndex: 'nickname',
    key: 'nickname'
  },
  {
    title: t('member.list.memberAccount'),
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: t('member.list.accounts'),
    key: 'accountList'
  },
  {
    title: t('member.list.inviter'),
    key: 'inviterNickname'
  },
  {
    title: t('member.list.group'),
    key: 'groups'
  },
  {
    title: t('member.list.updateTime'),
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 180
  },
  {
    title: t('member.list.action'),
    key: 'action',
    fixed: 'right',
    width: 150
  }
])

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