<!--
 * @Author: diaochan
 * @Date: 2025-03-08 19:59:37
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-17 16:06:04
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import { useEnumStore } from '@/stores'

const userStore = useUserStore()
const enumStore = useEnumStore()

// 在应用启动时获取用户信息
onMounted(async () => {
  // 如果有 token，则获取用户信息
  if (userStore.token) {
    try {
      await userStore.fetchUserInfo()
    } catch (error) {
      message.error(error.message)
      // 如果获取用户信息失败，可能是 token 过期，清除 token 并跳转到登录页
      if (error.code === 401) {
        userStore.clearToken()
        if (route.name !== 'Login') {
          router.push('/login')
        }
      }
    }
  }
  // 加载枚举数据
  await enumStore.fetchEnum()
})
</script>

<style>
</style>
