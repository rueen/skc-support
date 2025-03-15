/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:58
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-15 21:57:40
 * @Description: 
 */
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    permissions: JSON.parse(localStorage.getItem('permissions')) || [],
    isUserInfoLoaded: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    login({ token: _token, user }) {
      if (_token && user && user.id != null) {
        this.token = _token
        localStorage.setItem('token', this.token)
        this.userInfo = {
          username: user.username
        }
        // 存储用户信息
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.permissions = user.permissions ? user.permissions.split(',') : [];
        localStorage.setItem('permissions', JSON.stringify(this.permissions));
        message.success('登录成功')
        return true
      }
      message.error('用户名或密码错误')
      throw new Error('用户名或密码错误')
    },

    // 检查是否有权限
    hasPermissions(requiredPermissions) {
      if (!requiredPermissions || requiredPermissions.length === 0) {
        return true;
      }
      
      if (this.permissions.includes('*')) {
        return true; // 超级管理员权限
      }
      
      if (Array.isArray(requiredPermissions)) {
        return requiredPermissions.some(permission => this.permissions.includes(permission));
      }
      
      return this.permissions.includes(requiredPermissions);
    },

    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = {}
      this.permissions = []
      this.isUserInfoLoaded = false
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo');
    }
  }
}) 