<template>
  <a-layout class="layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="sider"
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
        <a-menu-item v-for="item in menuList" :key="item.key">
          <template #icon>
            <component :is="getIconComponent(item.icon)" />
          </template>
          <span>{{ $t('menu.' + item.title) }}</span>
          <router-link :to="item.path" />
        </a-menu-item>
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
          </div>
          
          <div class="header-right">
            <a-space>
              <a-select
                v-model:value="currentLang"
                style="width: 100px"
                @change="handleLangChange"
              >
                <a-select-option value="zh-CN">简体中文</a-select-option>
                <a-select-option value="en-US">English</a-select-option>
              </a-select>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <span class="username">{{ userInfo.username }}</span>
                </a>
                <template #overlay>
                  <a-menu>
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
import { useUserStore } from '@/stores/user'
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
  ProfileOutlined,
  AuditOutlined,
  LinkOutlined,
  SafetyOutlined,
  FileOutlined
} from '@ant-design/icons-vue'
import { useMenuStore } from '@/stores/menu';

// 图标映射函数
const getIconComponent = (iconName) => {
  const iconMap = {
    'profile-outlined': ProfileOutlined,
    'safety-outlined': SafetyOutlined,
    'audit-outlined': AuditOutlined,
    'team-outlined': TeamOutlined,
    'pay-circle-outlined': PayCircleOutlined,
    'link-outlined': LinkOutlined,
    'apartment-outlined': ApartmentOutlined,
    'user-outlined': UserOutlined,
    'file-outlined': FileOutlined,
    'file-text-outlined': FileTextOutlined
  };
  return iconMap[iconName] || null;
};

const menuStore = useMenuStore();
menuStore.generateMenu();
const menuList = computed(() => menuStore.accessedMenu);
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { locale } = useI18n()
const collapsed = ref(false)
const userInfo = computed(() => userStore.userInfo || {})
const currentLang = ref(locale.value)

// 根据当前路由设置选中的菜单项
const selectedKeys = computed(() => {
  const path = route.path
  // 修改为返回一级路径作为 key
  return [path.split('/')[1] || 'task-audit']
})

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}

const handleLangChange = (value) => {
  locale.value = value
  currentLang.value = value
  localStorage.setItem('language', value)
}


const handleResize = () => {
  if (!collapsed.value) {
    collapsed.value = true
  }
}

const siderWidth = computed(() => collapsed.value ? 80 : 256)

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