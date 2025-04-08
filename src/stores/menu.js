/*
 * @Author: diaochan
 * @Date: 2025-03-09 10:48:01
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-08 21:00:52
 * @Description: 
 */
import { defineStore } from 'pinia';
import { useUserStore } from './user';

const allMenu = [
  {
    path: '/task',
    key: 'task',
    icon: 'ProfileOutlined',
    title: 'task',
    permissions: 'task:list',
  },
  {
    path: '/pre-audit-tasks',
    key: 'pre-audit-tasks',
    icon: 'AuditOutlined',
    title: 'taskPreAudit',
    permissions: 'task:preAudit',
  },
  {
    path: '/confirm-audit-tasks',
    key: 'confirm-audit-tasks',
    icon: 'AuditOutlined',
    title: 'taskConfirmAudit',
    permissions: 'task:confirmAudit',
  },
  {
    path: '/account',
    key: 'account',
    icon: 'SafetyOutlined',
    title: 'account',
    permissions: 'account:list',
  },
  {
    path: '/member',
    key: 'member',
    icon: 'TeamOutlined',
    title: 'member',
    permissions: 'member:list',
  },
  {
    path: '/channel',
    key: 'channel',
    icon: 'LinkOutlined',
    title: 'channel',
    permissions: 'channel:list',
  },
  {
    path: '/group',
    key: 'group',
    icon: 'TeamOutlined',
    title: 'group',
    permissions: 'group:list',
  },
  {
    path: '/finance',
    key: 'finance',
    icon: 'PayCircleOutlined',
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
    icon: 'UserOutlined',
    title: 'waiter',
    permissions: 'waiter:list',
  },
  {
    path: '/article',
    key: 'article',
    icon: 'FileOutlined',
    title: 'article',
    permissions: 'article:list',
  },
  {
    path: '/systemConfig',
    key: 'systemConfig',
    icon: 'SettingOutlined',
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