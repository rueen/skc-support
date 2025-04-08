/*
 * @Author: diaochan
 * @Date: 2025-03-09 10:48:01
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-08 09:08:36
 * @Description: 
 */
import { defineStore } from 'pinia';
import { useUserStore } from './user';

const allMenu = [
  {
    path: '/task',
    key: 'task',
    icon: 'profile-outlined',
    title: 'task',
    permissions: 'task:list',
  },
  {
    path: '/pre-audit-tasks',
    key: 'pre-audit-tasks',
    icon: 'audit-outlined',
    title: 'taskPreAudit',
    permissions: 'task:preAudit',
  },
  {
    path: '/confirm-audit-tasks',
    key: 'confirm-audit-tasks',
    icon: 'audit-outlined',
    title: 'taskConfirmAudit',
    permissions: 'task:confirmAudit',
  },
  {
    path: '/account',
    key: 'account',
    icon: 'safety-outlined',
    title: 'account',
    permissions: 'account:list',
  },
  {
    path: '/member',
    key: 'member',
    icon: 'team-outlined',
    title: 'member',
    permissions: 'member:list',
  },
  {
    path: '/channel',
    key: 'channel',
    icon: 'link-outlined',
    title: 'channel',
    permissions: 'channel:list',
  },
  {
    path: '/group',
    key: 'group',
    icon: 'team-outlined',
    title: 'group',
    permissions: 'group:list',
  },
  {
    path: '/finance',
    key: 'finance',
    icon: 'pay-circle-outlined',
    title: 'finance',
    permissions: 'finance:withdrawal,finance:bills',
    children: [
      {
        path: '/withdrawal',
        key: 'withdrawal',
        title: 'withdrawal',
        permissions: 'finance:withdrawal',
      },
      {
        path: '/bills',
        key: 'bills',
        title: 'bills',
        permissions: 'finance:bills',
      },
      {
        path: '/payment-channels',
        key: 'payment-channels',
        title: 'paymentChannels',
        permissions: 'finance:paymentChannels',
      }
    ]
  },
  {
    path: '/waiter',
    key: 'waiter',
    icon: 'user-outlined',
    title: 'waiter',
    permissions: 'waiter:list',
  },
  {
    path: '/article',
    key: 'article',
    icon: 'file-outlined',
    title: 'article',
    permissions: 'article:list',
  },
  {
    path: '/systemConfig',
    key: 'systemConfig',
    icon: 'setting-outlined',
    title: 'systemConfig',
    permissions: 'system:config',
  },
]
export const useMenuStore = defineStore('menu', {
  state: () => ({
    accessedMenu: [],
  }),
  
  actions: {
    generateMenu() {
      const userStore = useUserStore();
      const _allMenu = JSON.parse(JSON.stringify(allMenu));
      this.accessedMenu = _allMenu.filter(item => {
        // 处理有子菜单的情况
        if (item.children && item.children.length) {
          // 过滤掉没有权限的子菜单
          const accessedChildren = item.children.filter(child => 
            userStore.hasPermissions(child.permissions)
          );
          // 如果有可访问的子菜单，则保留父菜单并更新子菜单列表
          if (accessedChildren.length > 0) {
            item.children = accessedChildren;
            return true;
          }
          return false;
        }
        
        // 没有子菜单的普通菜单项，直接检查权限
        return userStore.hasPermissions(item.permissions);
      });
    },
  },
});