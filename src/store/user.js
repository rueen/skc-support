import { defineStore } from 'pinia'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const token = ref(Cookies.get('token'))
  const userInfo = ref({})
  const roles = ref([])

  // 模拟登录接口
  const login = async ({ username, password }) => {
    // 默认账号
    if (username === 'admin' && password === '123456') {
      token.value = 'admin-token'
      Cookies.set('token', token.value)
      message.success('登录成功')
      return true
    }
    message.error('用户名或密码错误')
    throw new Error('用户名或密码错误')
  }

  // 模拟获取用户信息接口
  const getUserInfo = async () => {
    if (token.value === 'admin-token') {
      userInfo.value = {
        name: 'Admin',
        avatar: '',
        roles: ['admin']
      }
      roles.value = ['admin']
      return userInfo.value
    }
    throw new Error('获取用户信息失败')
  }

  // 退出登录
  const logout = () => {
    token.value = ''
    userInfo.value = {}
    roles.value = []
    Cookies.remove('token')
  }

  return {
    token,
    userInfo,
    roles,
    login,
    getUserInfo,
    logout
  }
}) 