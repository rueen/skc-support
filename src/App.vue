<!--
 * @Author: diaochan
 * @Date: 2025-03-08 19:59:37
 * @LastEditors: diaochan
 * @LastEditTime: 2025-08-28 17:24:15
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, onBeforeMount } from 'vue'
import { useUserStore } from '@/stores/user'
import { useEnumStore } from '@/stores'
import { useDefaultRegionStore } from '@/stores/defaultRegion'

const userStore = useUserStore()
const enumStore = useEnumStore()
const defaultRegionStore = useDefaultRegionStore()

onBeforeMount(async () => {
  // 优先获取默认地区并设置语言，确保在界面渲染前完成
  await defaultRegionStore.fetchDefaultRegion()
})

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
