/*
 * @Author: diaochan
 * @Date: 2025-03-09 10:48:01
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-01 16:30:41
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
    path: '/submitted-tasks',
    key: 'submitted-tasks',
    icon: 'audit-outlined',
    title: 'taskSubmitted',
    permissions: 'task:submitted',
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
    path: '/withdrawal',
    key: 'withdrawal',
    icon: 'pay-circle-outlined',
    title: 'withdrawal',
    permissions: 'finance:withdrawal',
  },
  {
    path: '/bills',
    key: 'bills',
    icon: 'pay-circle-outlined',
    title: 'bills',
    permissions: 'finance:bills',
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
      this.accessedMenu = allMenu.filter(item => {
        if (userStore.hasPermissions(item.permissions)) {
          return item;
        }
      });
    },
  },
});