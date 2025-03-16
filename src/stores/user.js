/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:58
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-16 11:43:48
 * @Description: 
 */
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { get,post } from '@/utils/request';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userInfo: null,
    permissions: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')) : [],
  }),

  actions: {
    setUserInfo(info) {
      this.userInfo = info
      this.permissions = info.permissions ? info.permissions.split(',') : [];
      localStorage.setItem('permissions', JSON.stringify(this.permissions));
    },
    setToken(token) {
      this.token = token
      // 保存到本地存储
      localStorage.setItem('token', token)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('token')
    },
    clearUserInfo() {
      this.userInfo = null
      this.permissions = []
      localStorage.removeItem('permissions')
    },
    // 登录
    async login(loginData) {
      try {
        const res = await post('auth.login', loginData);
        if (res.code === 0) {
          this.setToken(res.data.token)
          this.setUserInfo(res.data.user)
        }
        message.success(res.message)
        return res
      } catch (error) {
        console.error('登录失败:', error)
        throw error
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      try {
        const res = await get('user.info')
        this.setUserInfo(res.data)
        return res.data
      } catch (error) {
        console.error('获取用户信息失败:', error)
        throw error
      }
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
    async logout() {
      try {
        await post('auth.logout')
      } catch (error) {
        console.error('退出登录失败:', error)
      } finally {
        this.clearToken()
        this.clearUserInfo()
      }
    }
  }
}) 