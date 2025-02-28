<template>
  <a-layout class="layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="sider"
      :class="{ 'sider-mobile': isMobile }"
      :width="siderWidth"
    >
      <div class="logo">
        <h1>{{ collapsed ? 'SKC' : $t('app.title') }}</h1>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="member">
          <template #icon>
            <team-outlined />
          </template>
          <span>{{ $t('menu.member') }}</span>
          <router-link to="/member" />
        </a-menu-item>
        <a-menu-item key="group">
          <template #icon>
            <apartment-outlined />
          </template>
          <span>{{ $t('menu.group') }}</span>
          <router-link to="/group" />
        </a-menu-item>
        <a-menu-item key="account">
          <template #icon>
            <user-outlined />
          </template>
          <span>{{ $t('menu.account') }}</span>
          <router-link to="/account" />
        </a-menu-item>
        <a-menu-item key="article">
          <template #icon>
            <file-text-outlined />
          </template>
          <span>{{ $t('menu.article') }}</span>
          <router-link to="/article" />
        </a-menu-item>
        <a-menu-item key="task">
          <template #icon>
            <profile-outlined />
          </template>
          <span>{{ $t('menu.task') }}</span>
          <router-link to="/task" />
        </a-menu-item>
        <a-sub-menu key="settlement">
          <template #icon>
            <pay-circle-outlined />
          </template>
          <template #title>{{ $t('menu.settlement') }}</template>
          <a-menu-item key="withdrawal">
            <router-link to="/settlement/withdrawal">{{ $t('menu.withdrawal') }}</router-link>
          </a-menu-item>
          <a-menu-item key="other">
            <router-link to="/settlement/other">{{ $t('menu.other') }}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    
    <a-layout>
      <a-layout-header class="header">
        <div class="header-content">
          <div class="header-left">
            <menu-fold-outlined
              v-if="!collapsed"
              class="trigger"
              @click="() => (collapsed = true)"
            />
            <menu-unfold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = false)"
            />
            
            <!-- 移动端显示标题 -->
            <h1 v-if="isMobile" class="mobile-title">{{ $t('app.title') }}</h1>
          </div>
          
          <div class="header-right">
            <a-space>
              <a-select
                v-model:value="currentLang"
                style="width: 100px"
                @change="handleLangChange"
                v-if="!isMobile"
              >
                <a-select-option value="zh-CN">简体中文</a-select-option>
                <a-select-option value="en-US">English</a-select-option>
              </a-select>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <a-avatar>{{ userInfo.name?.charAt(0) }}</a-avatar>
                  <span class="username" v-if="!isMobile">{{ userInfo.name }}</span>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="lang" v-if="isMobile">
                      <a-select
                        v-model:value="currentLang"
                        style="width: 100px"
                        @change="handleLangChange"
                      >
                        <a-select-option value="zh-CN">简体中文</a-select-option>
                        <a-select-option value="en-US">English</a-select-option>
                      </a-select>
                    </a-menu-item>
                    <a-menu-item key="logout" @click="handleLogout">
                      <logout-outlined />
                      <span>{{ $t('header.logout') }}</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </div>
        </div>
      </a-layout-header>
      
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  PayCircleOutlined,
  LogoutOutlined,
  ApartmentOutlined,
  ProfileOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { locale } = useI18n()

const collapsed = ref(false)
const userInfo = computed(() => userStore.userInfo)
const currentLang = ref(locale.value)

// 根据当前路由设置选中的菜单项
const selectedKeys = computed(() => {
  const path = route.path
  if (path.startsWith('/settlement/')) {
    return [path.split('/')[2]]
  }
  return [path.split('/')[1]]
})

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}

const handleLangChange = (value) => {
  locale.value = value
  currentLang.value = value
}

// 判断是否为移动端
const isMobile = ref(window.innerWidth <= 768)
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value && !collapsed.value) {
    collapsed.value = true
  }
}

const siderWidth = computed(() => isMobile.value ? 256 : (collapsed.value ? 80 : 256))

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="less" scoped>
.layout {
  .logo {
    height: 64px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #002140;
    
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0;
      white-space: nowrap;
      transition: all 0.3s;
    }
  }
  
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
      color: @primary-color;
    }
  }
  
  .mobile-title {
    margin: 0 0 0 12px;
    font-size: 18px;
    color: @primary-color;
  }
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 