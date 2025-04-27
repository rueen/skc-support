<!--
 * @Author: diaochan
 * @Date: 2025-04-07 09:00:07
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-27 13:58:59
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
const emit = defineEmits(['back'])

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  back: {
    type: Boolean,
    default: false
  },
  useDefaultBack: {
    type: Boolean,
    default: true
  }
})

const handleBack = () => {
  // 发射自定义返回事件
  emit('back')
  
  // 如果设置了使用默认返回行为，则执行router.back()
  if (props.useDefaultBack) {
    router.back()
  }
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