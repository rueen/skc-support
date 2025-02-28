<template>
  <div class="task-detail content-container">
    <div class="form-container detail-container">
      <div class="page-header">
        <a-space>
          <a-button @click="$router.back()">
            <template #icon><left-outlined /></template>
            返回
          </a-button>
          <h2 class="page-title">任务详情</h2>
        </a-space>
      </div>

      <a-descriptions :column="2">
        <a-descriptions-item :label="$t('task.title')">
          {{ taskInfo.title }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('task.platform')">
          {{ getPlatformText(taskInfo.platform) }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('task.type')">
          {{ getTypeText(taskInfo.type) }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('task.reward')">
          ¥{{ taskInfo.reward?.toFixed(2) }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('task.startTime')">
          {{ taskInfo.startTime }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('task.endTime')">
          {{ taskInfo.endTime }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('task.status')" :span="2">
          <a-tag :color="getStatusColor(taskInfo.status)">
            {{ getStatusText(taskInfo.status) }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <a-divider orientation="left">{{ $t('task.description') }}</a-divider>
      <div class="description">{{ taskInfo.description }}</div>

      <a-divider orientation="left">{{ $t('task.requirements') }}</a-divider>
      <div class="requirements">{{ taskInfo.requirements }}</div>

      <a-divider />

      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="members" tab="参与会员">
          <a-table
            :columns="memberColumns"
            :data-source="memberData"
            :loading="memberLoading"
            :pagination="memberPagination"
            @change="handleMemberTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-tag :color="getMemberStatusColor(record.status)">
                  {{ getMemberStatusText(record.status) }}
                </a-tag>
              </template>
              <template v-if="column.key === 'action'">
                <a-space>
                  <a @click="handleViewMember(record)">查看</a>
                  <a-button
                    v-if="record.status === 'pending'"
                    type="link"
                    @click="handleApprove(record)"
                  >
                    通过
                  </a-button>
                  <a-button
                    v-if="record.status === 'pending'"
                    type="link"
                    danger
                    @click="handleReject(record)"
                  >
                    拒绝
                  </a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- 拒绝原因弹窗 -->
    <a-modal
      v-model:visible="rejectVisible"
      title="拒绝原因"
      @ok="handleRejectConfirm"
      :confirmLoading="rejectLoading"
    >
      <a-form>
        <a-form-item label="拒绝原因" required>
          <a-textarea
            v-model:value="rejectReason"
            :rows="4"
            placeholder="请输入拒绝原因"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { LeftOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()

// 任务信息
const taskInfo = ref({})

// 标签页
const activeTab = ref('members')

// 会员列表
const memberLoading = ref(false)
const memberData = ref([])
const memberPagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 拒绝弹窗
const rejectVisible = ref(false)
const rejectLoading = ref(false)
const rejectReason = ref('')
const currentMember = ref(null)

// 会员表格列
const memberColumns = [
  {
    title: '会员名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    key: 'applyTime',
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
    width: 200
  }
]

// 获取平台文本
const getPlatformText = (platform) => {
  const map = {
    douyin: '抖音',
    kuaishou: '快手',
    xiaohongshu: '小红书'
  }
  return map[platform] || platform
}

// 获取类型文本
const getTypeText = (type) => {
  const map = {
    grass: '种草',
    live: '直播',
    video: '短视频'
  }
  return map[type] || type
}

// 获取状态颜色
const getStatusColor = (status) => {
  const map = {
    pending: 'default',
    processing: 'processing',
    completed: 'success',
    cancelled: 'error'
  }
  return map[status]
}

// 获取状态文本
const getStatusText = (status) => {
  const map = {
    pending: '未开始',
    processing: '进行中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return map[status]
}

// 获取会员状态颜色
const getMemberStatusColor = (status) => {
  const map = {
    pending: 'warning',
    approved: 'success',
    rejected: 'error'
  }
  return map[status]
}

// 获取会员状态文本
const getMemberStatusText = (status) => {
  const map = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return map[status]
}

// 加载任务详情
const loadTaskDetail = async () => {
  try {
    // TODO: 实现加载任务详情的逻辑
    taskInfo.value = {
      title: '测试任务',
      platform: 'douyin',
      type: 'grass',
      reward: 100,
      startTime: '2024-03-01 00:00:00',
      endTime: '2024-03-31 23:59:59',
      status: 'processing',
      description: '测试描述',
      requirements: '测试要求'
    }
  } catch (error) {
    message.error('加载任务详情失败')
    router.back()
  }
}

// 加载会员列表
const loadMemberList = async () => {
  memberLoading.value = true
  try {
    // TODO: 实现加载会员列表的逻辑
    memberData.value = []
    memberPagination.total = 0
  } finally {
    memberLoading.value = false
  }
}

// 表格分页变化
const handleMemberTableChange = (pag) => {
  Object.assign(memberPagination, pag)
  loadMemberList()
}

// 查看会员
const handleViewMember = (record) => {
  router.push(`/member/view/${record.id}`)
}

// 审核通过
const handleApprove = async (record) => {
  try {
    // TODO: 实现审核通过逻辑
    message.success('审核通过成功')
    loadMemberList()
  } catch (error) {
    message.error('审核通过失败')
  }
}

// 审核拒绝
const handleReject = (record) => {
  currentMember.value = record
  rejectReason.value = ''
  rejectVisible.value = true
}

const handleRejectConfirm = async () => {
  if (!rejectReason.value) {
    message.error('请输入拒绝原因')
    return
  }

  try {
    rejectLoading.value = true
    // TODO: 实现审核拒绝逻辑
    message.success('审核拒绝成功')
    rejectVisible.value = false
    loadMemberList()
  } catch (error) {
    message.error('审核拒绝失败')
  } finally {
    rejectLoading.value = false
  }
}

// 初始化
onMounted(() => {
  loadTaskDetail()
  loadMemberList()
})
</script>

<style lang="less" scoped>
.task-detail {
  .page-header {
    margin-bottom: 24px;
    
    .page-title {
      margin: 0;
      font-size: 20px;
      line-height: 32px;
    }
  }

  .description,
  .requirements {
    white-space: pre-wrap;
    line-height: 1.5;
  }
}
</style> 