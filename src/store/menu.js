/*
 * @Author: diaochan
 * @Date: 2025-03-09 10:48:01
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-10 13:56:12
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
    path: '/task-audit',
    key: 'task-audit',
    icon: 'audit-outlined',
    title: 'taskAudit',
    permissions: 'task:audit',
  },
  {
    path: '/account-audit',
    key: 'account-audit',
    icon: 'safety-outlined',
    title: 'accountAudit',
    permissions: 'account:audit',
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
    permissions: 'settlement:withdrawal',
  },
  {
    path: '/otherBills',
    key: 'otherBills',
    icon: 'pay-circle-outlined',
    title: 'otherBills',
    permissions: 'settlement:otherBills',
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