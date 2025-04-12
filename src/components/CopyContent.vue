<!--
 * @Author: diaochan
 * @Date: 2025-04-07 09:03:52
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-12 15:04:38
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

// 兼容复制方法
const fallbackCopyToClipboard = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  textArea.style.top = '-9999px'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      message.success('复制成功')
    } else {
      message.error('复制失败，请手动复制')
    }
  } catch (err) {
    console.error('复制失败:', err)
    message.error('复制失败，请手动复制')
  }
  
  document.body.removeChild(textArea)
}

const handleCopy = () => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(props.content)
      .then(() => {
        message.success('复制成功')
      })
      .catch(() => {
        // Clipboard API 失败，尝试兼容方法
        fallbackCopyToClipboard(props.content)
      })
  } else {
    // 不支持 Clipboard API，使用兼容方法
    fallbackCopyToClipboard(props.content)
  }
}
</script>