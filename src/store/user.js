/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:58
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-09 10:43:33
 * @Description: 
 */
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: Cookies.get('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    permissions: JSON.parse(localStorage.getItem('permissions')) || [],
    isUserInfoLoaded: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    login({ username, token: _token, permissions }) {
      if (username && _token) {
        this.token = _token
        Cookies.set('token', this.token)
        this.userInfo = {
          username: username
        }
        // 存储用户信息
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.permissions = permissions;
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
      Cookies.remove('token')
      localStorage.removeItem('userInfo');
    }
  }
}) 