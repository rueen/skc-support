<template>
  <div class="task-audit-detail content-container">
    <div class="page-header">
      <a-space>
        <a-button @click="$router.back()">
          <template #icon><left-outlined /></template>
          返回
        </a-button>
        <h2 class="page-title">审核详情</h2>
      </a-space>
    </div>

    <!-- TODO: 实现详情页内容 -->
    <a-empty description="开发中..." />
  </div>
</template>

<script setup>
import { LeftOutlined } from '@ant-design/icons-vue'
</script>

<style lang="less" scoped>
.task-audit-detail {
  .page-header {
    margin-bottom: 24px;
    
    .page-title {
      margin: 0;
      font-size: 20px;
      line-height: 32px;
    }
  }
}
</style> 