<template>
  <div class="member-list content-container">
    <div class="table-container">
      <div class="table-header">
        <div class="left">
          <a-form layout="inline" :model="searchForm">
            <a-form-item label="会员名称">
              <a-input
                v-model:value="searchForm.memberNickname"
                placeholder="请输入会员名称"
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
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button @click="handleReset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="right">
          <a-space>
            <a-button @click="handleConfigInviteReward">
              <template #icon><gift-outlined /></template>
              邀请有礼
            </a-button>
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
                <div>账号：{{ item.account }}</div>
                <div class="link-text-container">
                  <span class="label">主页：</span>
                  <a :href="item.homeUrl" target="_blank" class="link-text">{{ item.homeUrl }}</a>
                  <a-button type="link" size="small" @click="handleCopy(item.homeUrl)">
                    复制
                  </a-button>
                </div>
              </div>
            </div>
          </template>
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

    <!-- 邀请有礼配置弹窗 -->
    <a-modal
      v-model:open="configVisible"
      title="邀请有礼配置"
      @ok="handleConfigSave"
      :confirmLoading="configLoading"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item
          label="奖励金额"
          extra="设置每成功邀请一位新会员的奖励金额"
        >
          <a-input-number
            v-model:value="inviteRewardAmount"
            :min="0"
            :precision="2"
            :step="1"
            :formatter="value => `¥ ${value}`"
            :parser="value => value.replace('¥ ', '')"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { PlusOutlined, GiftOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { get, del } from '@/utils/request'

const router = useRouter()
const loading = ref(false)
const configVisible = ref(false)
const configLoading = ref(false)
const inviteRewardAmount = ref(10.00)

// 查询参数
const searchForm = reactive({
  memberNickname: '',
  groupId: undefined
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
    title: '会员名称',
    dataIndex: 'memberNickname',
    key: 'memberNickname'
  },
  {
    title: '账号信息',
    key: 'accountList'
  },
  {
    title: '所属群组',
    dataIndex: 'groupName',
    key: 'groupName'
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
    width: 200
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
  try {
    // TODO: 实现删除逻辑
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
  } catch (error) {
    message.error('删除失败')
  }
}

// 打开邀请有礼配置弹窗
const handleConfigInviteReward = async () => {
  configVisible.value = true
  await getInviteRewardConfig()
}

// 保存邀请有礼配置
const handleConfigSave = async () => {
  try {
    configLoading.value = true
    // TODO: 实现保存配置逻辑
    message.success('保存成功')
    configVisible.value = false
  } catch (error) {
    message.error('保存失败')
  } finally {
    configLoading.value = false
  }
}

// 获取邀请有礼配置
const getInviteRewardConfig = async () => {
  try {
    // TODO: 实现获取配置逻辑
    inviteRewardAmount.value = 10.00
  } catch (error) {
    message.error('获取配置失败')
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

// 复制链接
const handleCopy = (link) => {
  navigator.clipboard.writeText(link)
    .then(() => {
      message.success('链接已复制到剪贴板')
    })
    .catch(() => {
      message.error('复制失败，请手动复制')
    })
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