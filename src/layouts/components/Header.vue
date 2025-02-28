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
      <a-select
        v-model:value="currentLang"
        style="width: 100px"
        @change="handleLangChange"
      >
        <a-select-option value="zh-CN">中文</a-select-option>
        <a-select-option value="en-US">English</a-select-option>
      </a-select>
      
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  collapsed: Boolean
})

defineEmits(['toggle'])

const userStore = useUserStore()
const { locale } = useI18n()
const router = useRouter()

const currentLang = ref(localStorage.getItem('language') || 'zh-CN')

const handleLangChange = (value) => {
  locale.value = value
  localStorage.setItem('language', value)
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