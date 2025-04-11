<!--
 * @Author: diaochan
 * @Date: 2025-03-08 19:59:37
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-11 20:38:50
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useEnumStore } from '@/stores'

const userStore = useUserStore()
const enumStore = useEnumStore()

// 在应用启动时获取用户信息
onMounted(async () => {
  // 如果有 token，则获取用户信息
  if (userStore.token) {
    await userStore.fetchUserInfo()
    // 加载枚举数据
    await enumStore.fetchEnum()
  }
})
</script>

<style>
</style>
