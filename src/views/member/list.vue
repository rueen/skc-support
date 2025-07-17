<template>
  <div class="member-list content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item :label="$t('member.search.keyword')">
              <a-input
                v-model:value="searchForm.keyword"
                :placeholder="$t('member.search.keywordPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('common.channel')">
              <a-select
                v-model:value="searchForm.channelId"
                :placeholder="$t('common.selectPlaceholder')"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="item in channelOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
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
            <a-form-item :label="$t('member.search.inviter')">
              <a-input
                v-model:value="searchForm.inviter"
                :placeholder="$t('common.inputPlaceholder')"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="$t('member.list.completedTaskCount')">
              <a-input-number
                v-model:value="searchForm.completedTaskCount"
                :min="0"
                :max="9999"
                style="width: 100px!important"
              />
            </a-form-item>
            <a-form-item :label="$t('member.search.createTime')">
              <a-range-picker
                v-model:value="searchForm.createTimeRange"
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 280px;"
              />
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
            <a-button
              @click="handleExport"
              v-if="tableData.length"
            >
              <template #icon><DownloadOutlined /></template>
              {{ $t('common.export') }}
            </a-button>
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
          <template v-if="column.key === 'nickname'">
            <a-space>
              <span>{{ record.nickname }}</span>
              <a-tag color="green" v-if="record.isNew">new</a-tag>
            </a-space>
          </template>
          <template v-if="column.key === 'accountList'">
            <a-space direction="vertical">
              <div v-for="item in record.accountList">
                <div>
                  <a-space>
                    {{ $t('member.list.account') }}：<a-avatar :src="item.channelIcon" size="small" /> {{ item.account }}
                    <a-tag color="warning">{{ enumStore.getEnumText('AccountAuditStatus', item.accountAuditStatus) }}</a-tag>
                  </a-space>
                </div>
                <div class="link-text-container">
                  <span class="label">{{ $t('member.list.homepage') }}：</span>
                  <CopyContent :content="item.homeUrl">
                    <a :href="item.homeUrl" target="_blank" class="link-text">{{ item.homeUrl }}</a>
                  </CopyContent>
                </div>
                <div>
                  <span class="label">uid：</span>
                  <CopyContent :content="item.uid" />
                </div>
              </div>
            </a-space>
          </template>
          <template v-if="column.key === 'inviterNickname'">
            <a-typography-link @click="handleMemberDetail(record.inviterId)" v-if="record.inviterId">{{ record.inviterNickname }}</a-typography-link>
            <span v-else>--</span>
          </template>
          <template v-if="column.key === 'groups'">
            <div v-for="item in record.groups">
              <a-space>
                <span>{{ item.groupName }}</span>
                <GroupOwner v-if="item.isOwner" />
              </a-space>
              <div style="color: #999; font-size: 12px;">{{ item.joinTime }}</div>
            </div>
            <span v-if="!record.groups || record.groups.length === 0">--</span>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">{{ $t('member.list.edit') }}</a>
              <a @click="handleMemberDetail(record.id)">{{ $t('member.list.view') }}</a>
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

      <div class="count-container" v-if="pagination.total">
        <a-descriptions :column="2">
          <a-descriptions-item :label="$t('common.totalCount')" style="width: 125px;">
            {{ pagination.total }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.list.totalApproved')">
            {{ totalApproved }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { get, del } from '@/utils/request'
import { useEnumStore } from '@/stores'
import CopyContent from '@/components/CopyContent.vue'
import { useI18n } from 'vue-i18n'
import GroupOwner from '@/components/GroupOwner.vue'
import { downloadByApi } from '@/utils/download'

const enumStore = useEnumStore()
const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const loading = ref(false)

// 查询参数
const searchForm = reactive({
  keyword: '',
  channelId: undefined,
  groupId: route.query.groupId,
  inviter: '',
  completedTaskCount: undefined,
  createTimeRange: []
})

// 表格数据
const tableData = ref([])
const totalApproved = ref(0)

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
    title: t('member.list.completedTaskCount'),
    dataIndex: 'completedTaskCount',
    key: 'completedTaskCount'
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
    title: t('member.list.createTime'),
    dataIndex: 'createTime',
    key: 'createTime',
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
    keyword: '',
    channelId: undefined,
    groupId: undefined,
    inviter: '',
    completedTaskCount: undefined,
    createTimeRange: []
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

const handleMemberDetail = (id) => {
  router.push(`/member/view/${id}`)
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
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      keyword: searchForm.keyword,
      channelId: searchForm.channelId,
      groupId: searchForm.groupId,
      inviter: searchForm.inviter,
      completedTaskCount: searchForm.completedTaskCount,
      createStartTime: searchForm.createTimeRange?.[0],
      createEndTime: searchForm.createTimeRange?.[1]
    }
    const res = await get('member.list', params)
    if(res.code === 0) {
      tableData.value = res.data.list
      pagination.total = res.data.total
      totalApproved.value = res.data.totalApproved
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

const handleExport = () => {
  Modal.confirm({
    title: t('common.export'),
    content: t('common.confirmExportContent'),
    onOk: async () => {
      try {
        // 显示加载中提示
        const loadingMessage = message.loading(t('common.exporting'), 0)
        
        // 构建导出参数，使用当前的筛选条件
        const params = {
          keyword: searchForm.keyword,
          channelId: searchForm.channelId,
          groupId: searchForm.groupId,
          inviter: searchForm.inviter,
          completedTaskCount: searchForm.completedTaskCount,
          createStartTime: searchForm.createTimeRange?.[0],
          createEndTime: searchForm.createTimeRange?.[1]
        }
        // 调用下载API
        await downloadByApi('member.export', params, `会员列表_${new Date().toLocaleDateString()}.xlsx`)
        
        // 关闭加载提示
        loadingMessage()
        
        // 显示成功提示
        message.success(t('common.exportSuccess'))
      } catch (error) {
        console.error('导出失败:', error)
        message.error(t('common.exportFailed'))
      }
    }
  })
}

const memberOptions = ref([])
const loadMemberOptions = async (keyword = '') => {
  const res = await get('member.list', {
    page: 1,
    pageSize: 50,
    memberNickname: keyword
  })
  if(res.code === 0){
    memberOptions.value = res.data.list || []
  }
}

const channelOptions = ref([])
const loadChannelOptions = async () => {
  if(channelOptions.value.length) return
  try { 
    const res = await get('channel.list')
    if(res.code === 0){
      channelOptions.value = res.data.list
    } 
  } catch (error) {
    console.error(error)
  }
}

// 初始化
onMounted(() => {
  loadData()
  loadGroupOptions()
  loadChannelOptions()
  loadMemberOptions()
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
.count-container{
  margin-top: -48px;
  width: 300px;
}
</style> 