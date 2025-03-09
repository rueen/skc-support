<template>
  <div class="member-view content-container">
    <page-header
      title="会员详情"
      :back="true"
      class="page-header"
    />
    <div class="detail-container">
      <a-descriptions :column="2">
        <a-descriptions-item label="会员名称">
          {{ memberInfo.name }}
        </a-descriptions-item>
        <a-descriptions-item label="账号">
          {{ memberInfo.account }}
        </a-descriptions-item>
        <a-descriptions-item label="所属群组">
          {{ memberInfo.groupName }}
          <a-tag v-if="memberInfo.isGroupOwner" color="blue" style="margin-left: 8px">群主</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="账户余额">
          {{ memberInfo.balance }} 元
        </a-descriptions-item>
        <a-descriptions-item label="邀请码">
          {{ memberInfo.inviteCode }}
        </a-descriptions-item>
        <a-descriptions-item label="邀请链接">
          <a-input-group compact>
            <a-input
              v-model:value="memberInfo.inviteUrl"
              readonly
              style="width: calc(100% - 80px)"
            />
            <a-button type="primary" @click="handleCopy">复制</a-button>
          </a-input-group>
        </a-descriptions-item>
        <a-descriptions-item label="备注" :span="2">
          {{ memberInfo.remark || '暂无备注' }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import PageHeader from '@/components/PageHeader/index.vue'
import { get } from '@/utils/request'

const route = useRoute()

// 会员信息
const memberInfo = ref({})

// 复制邀请链接
const handleCopy = () => {
  navigator.clipboard.writeText(memberInfo.inviteUrl).then(() => {
    message.success('复制成功')
  }).catch(() => {
    message.error('复制失败')
  })
}

// 获取会员详情
const getMemberDetail = async (id) => {
  try {
    // TODO: 实现获取会员详情逻辑
    const res = await get('member.detail', {
      params: {
        id: route.params.id
      }
    })
    if(res.success){
      memberInfo.value = res.data || {}
    }
  } catch (error) {
    message.error('获取会员详情失败')
  }
}

onMounted(() => {
  getMemberDetail(route.params.id)
})
</script>

<style lang="less" scoped>
.member-view {
  .page-header {
    :deep(.ant-page-header-heading-left) {
      flex: 1;
    }
  }

  .detail-container {
    padding: 24px;
    background-color: #fff;
    border-radius: 2px;
  }

  :deep(.ant-descriptions-item-label) {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }

  :deep(.ant-descriptions-item-content) {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style> 