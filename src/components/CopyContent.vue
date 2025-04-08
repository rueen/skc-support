<!--
 * @Author: diaochan
 * @Date: 2025-04-07 09:03:52
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-08 20:54:48
 * @Description: 
-->
<template>
  <div style="display: inline-block;">
    <a-space>
      <slot>
        <span>{{ content }}</span>
      </slot>
      <CopyOutlined @click="handleCopy" />
    </a-space>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const handleCopy = () => {
  navigator.clipboard.writeText(props.content).then(() => {
    message.success('复制成功')
  }).catch(() => {
    message.error('复制失败')
  })
}
</script>