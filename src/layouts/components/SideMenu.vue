<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    mode="inline"
    theme="dark"
  >
    <template v-for="item in menuList" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path" @click="handleMenuClick(item)">
          <template #icon>
            <component :is="item.meta?.icon" />
          </template>
          {{ $t(`menu.${item.name}`) }}
        </a-menu-item>
      </template>
      
      <template v-else>
        <a-sub-menu :key="item.path">
          <template #icon>
            <component :is="item.meta?.icon" />
          </template>
          <template #title>{{ $t(`menu.${item.name}`) }}</template>
          <a-menu-item
            v-for="child in item.children"
            :key="child.path"
            @click="handleMenuClick(child)"
          >
            {{ $t(`menu.${child.name}`) }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DashboardOutlined,
  ProfileOutlined,
  AuditOutlined,
  TeamOutlined,
  WalletOutlined,
  AppstoreOutlined,
  GroupOutlined,
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const selectedKeys = ref([route.path])
const openKeys = ref([])

const menuList = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { icon: DashboardOutlined }
  },
  {
    path: '/task',
    name: 'taskManagement',
    meta: { icon: ProfileOutlined },
    children: [
      {
        path: '/task/list',
        name: 'taskList'
      },
      {
        path: '/task/audit',
        name: 'taskAudit'
      }
    ]
  },
  {
    path: '/account-audit',
    name: 'accountAudit',
    meta: { icon: AuditOutlined }
  },
  {
    path: '/member',
    name: 'memberManagement',
    meta: { icon: TeamOutlined },
    children: [
      {
        path: '/member/list',
        name: 'memberList'
      }
    ]
  },
  {
    path: '/settlement',
    name: 'settlement',
    meta: { icon: WalletOutlined },
    children: [
      {
        path: '/settlement/withdrawal',
        name: 'withdrawalBill'
      },
      {
        path: '/settlement/other',
        name: 'otherBill'
      }
    ]
  },
  {
    path: '/channel',
    name: 'channelManagement',
    meta: { icon: AppstoreOutlined }
  },
  {
    path: '/group',
    name: 'groupManagement',
    meta: { icon: GroupOutlined }
  },
  {
    path: '/account',
    name: 'accountManagement',
    meta: { icon: UserOutlined }
  },
  {
    path: '/article',
    name: 'article',
    meta: { icon: FileTextOutlined }
  }
]

watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path]
    const parentPath = '/' + path.split('/')[1]
    openKeys.value = [parentPath]
  },
  { immediate: true }
)

const handleMenuClick = (item) => {
  router.push(item.path)
}
</script> 