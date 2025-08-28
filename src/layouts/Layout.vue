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
        <template v-for="item in menuList" :key="item.key">
          <!-- 含有子菜单的菜单项 -->
          <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.key">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <template #title>{{ $t('menu.' + item.title) }}</template>
            
            <a-menu-item v-for="child in item.children" :key="child.key">
              <span>{{ $t('menu.' + child.title) }}</span>
              <router-link :to="child.path" />
            </a-menu-item>
          </a-sub-menu>
          
          <!-- 没有子菜单的菜单项 -->
          <a-menu-item v-else :key="`menu-${item.key}`">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <span>{{ $t('menu.' + item.title) }}</span>
            <router-link :to="item.path" />
          </a-menu-item>
        </template>
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
              class="trigger menu-unfold-icon"
              @click="() => (collapsed = false)"
            />
          </div>
          
          <div class="header-right">
            <a-space>
              <a-select
                :value="currentLang"
                style="width: 100px"
                @change="handleLangChange"
              >
                <a-select-option v-for="language in languageColumns" :value="language.value">{{ language.text }}</a-select-option>
              </a-select>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <span class="username">{{ userInfo.username }}</span>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="logout" @click="handleLogout">
                      <a-space>
                        <logout-outlined />
                        <span>{{ $t('header.logout') }}</span>
                      </a-space>
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
import { useMenuStore } from '@/stores/menu';
import { useEnumStore } from '@/stores';
import { useDefaultRegionStore } from '@/stores/defaultRegion'
import { setLocale } from '@/i18n'

const defaultRegionStore = useDefaultRegionStore()
const enumStore = useEnumStore();
const menuStore = useMenuStore();
menuStore.generateMenu();
const menuList = computed(() => menuStore.accessedMenu);
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { locale } = useI18n()
const collapsed = ref(false)
const userInfo = computed(() => userStore.userInfo || {})

const languageColumns = defaultRegionStore.languageColumns;
// 当前语言
const currentLang = computed(() => {
  return languageColumns.find(lang => lang.value === locale.value)?.value
})

// 根据当前路由设置选中的菜单项
const selectedKeys = computed(() => {
  const path = route.path
  const pathSegments = path.split('/').filter(Boolean)
  
  // 没有路径片段时返回默认值
  if (!pathSegments.length) return ['task']
  
  // 获取当前路径
  const currentPath = '/' + pathSegments[0]
  
  // 遍历菜单查找匹配项
  for (const item of menuList.value) {
    // 如果是子菜单，检查子菜单的路径
    if (item.children && item.children.length) {
      for (const child of item.children) {
        if (child.path === path || child.path === currentPath) {
          return [child.key]
        }
      }
    }
  }
  
  // 默认返回一级路径
  return [pathSegments[0]]
})

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}

const handleLangChange = (value) => {
  setLocale(value)
  enumStore.resetEnum()
  enumStore.fetchEnum(value)
}


const handleResize = () => {
  if (!collapsed.value) {
    collapsed.value = true
  }
}

const siderWidth = computed(() => collapsed.value ? 80 : 200)

onMounted(() => {
  // window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // window.removeEventListener('resize', handleResize)
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
  :deep(.ant-menu-title-content) {
    text-align: left;
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