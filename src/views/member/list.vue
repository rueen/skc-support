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
            <a-form-item label="账号">
              <a-input
                v-model:value="searchForm.account"
                placeholder="请输入账号"
                allow-clear
              />
            </a-form-item>
            <a-form-item label="职业">
              <a-select
                v-model:value="searchForm.occupation"
                placeholder="请选择职业"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="type in Object.values(OccupationType)"
                  :key="type"
                  :value="type"
                >
                  {{ getOccupationTypeText(type) }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="所属群组">
              <a-select
                v-model:value="searchForm.groupId"
                placeholder="请选择群组"
                style="width: 120px"
                allow-clear
              >
                <a-select-option
                  v-for="item in groupOptions"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
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
import { ref, reactive } from 'vue'
import { PlusOutlined, GiftOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { OccupationType, OccupationTypeLang } from '@/constants/enums'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t, locale } = useI18n()
const loading = ref(false)
const configVisible = ref(false)
const configLoading = ref(false)
const inviteRewardAmount = ref(10.00)

// 查询参数
const searchForm = reactive({
  memberName: '',
  account: '',
  occupation: undefined,
  groupId: undefined
})

// 表格数据
const dataSource = ref([
  {
    id: 1,
    memberName: '张三',
    account: 'test123',
    groupName: '群组1',
    isGroupOwner: true,
    createTime: '2024-02-28 10:00:00'
  },
  {
    id: 2,
    memberName: '李四',
    account: 'test456',
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
  { id: 1, name: '群组1' },
  { id: 2, name: '群组2' },
  { id: 3, name: '群组3' }
]

// 表格列定义
const columns = [
  {
    title: '会员名称',
    dataIndex: 'memberName',
    key: 'memberName'
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: '所属群组',
    dataIndex: 'groupName',
    key: 'groupName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180
  },
  {
    title: '职业',
    dataIndex: 'occupation',
    key: 'occupation',
    width: 120,
    customRender: ({ text }) => getOccupationTypeText(text)
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
    account: '',
    occupation: undefined,
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

// 获取职业类型文本
const getOccupationTypeText = (type) => {
  return OccupationTypeLang[type]?.[locale.value] || type
}

// 初始化
handleQuery()
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