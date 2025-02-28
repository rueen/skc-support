<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo" />
        <h1 v-show="!collapsed">{{ title }}</h1>
      </div>
      <SideMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Header :collapsed="collapsed" @toggle="toggleCollapsed" />
      </a-layout-header>
      <a-layout-content>
        <div class="main-content">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import SideMenu from './components/SideMenu.vue'
import Header from './components/Header.vue'

const title = '任务管理系统'
const collapsed = ref(false)

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
  
  .logo {
    height: @header-height;
    padding: 16px;
    display: flex;
    align-items: center;
    
    img {
      width: 32px;
      height: 32px;
    }
    
    h1 {
      margin: 0 0 0 12px;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      white-space: nowrap;
    }
  }
  
  .main-content {
    margin: 24px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}
</style> 