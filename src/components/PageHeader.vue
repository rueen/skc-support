<!--
 * @Author: diaochan
 * @Date: 2025-04-07 09:00:07
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-08 20:55:21
 * @Description: 
-->
<template>
  <div class="page-header">
    <div class="header-left">
      <a-button v-if="back" class="back-btn" @click="handleBack">
        <template #icon><left-outlined /></template>
        {{ $t('common.back') }}
      </a-button>
      <div class="title">{{ title }}</div>
    </div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  title: {
    type: String,
    required: true
  },
  back: {
    type: Boolean,
    default: false
  }
})

const handleBack = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px 24px;
  background-color: #fff;
  border-radius: 2px;

  .header-left {
    display: flex;
    align-items: center;

    .back-btn {
      margin-right: 16px;
    }

    .title {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style> 