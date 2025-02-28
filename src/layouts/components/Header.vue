<template>
  <div class="header">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="$emit('toggle')"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="$emit('toggle')"
    />
    
    <div class="right">
      <a-dropdown>
        <a class="language" @click.prevent>
          {{ currentLang === 'zh-CN' ? '中文' : 'English' }}
          <down-outlined />
        </a>
        <template #overlay>
          <a-menu @click="handleLanguageChange">
            <a-menu-item key="zh-CN">中文</a-menu-item>
            <a-menu-item key="en-US">English</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      
      <a-dropdown>
        <span class="user-info">
          <user-outlined />
          {{ userStore.userInfo.username }}
        </span>
        <template #overlay>
          <a-menu @click="handleUserMenuClick">
            <a-menu-item key="profile">个人信息</a-menu-item>
            <a-menu-item key="logout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  collapsed: Boolean
})

defineEmits(['toggle'])

const userStore = useUserStore()
const { locale } = useI18n()
const router = useRouter()

const currentLang = computed(() => locale.value)

const handleLanguageChange = ({ key }) => {
  locale.value = key
  localStorage.setItem('language', key)
}

const handleUserMenuClick = ({ key }) => {
  if (key === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style lang="less" scoped>
.header {
  background: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
      color: @primary-color;
    }
  }
  
  .right {
    margin-right: 24px;
    
    .language {
      margin-right: 24px;
    }
    
    .user-info {
      cursor: pointer;
      
      .anticon {
        margin-right: 8px;
      }
    }
  }
}
</style> 