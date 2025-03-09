/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:58
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-09 09:08:48
 * @Description: 
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const token = ref(Cookies.get('token'))
  const userInfo = ref({})

  // 模拟登录接口
  const login = async ({ username, token: _token }) => {
    // 默认账号
    if (username && _token) {
      token.value = _token
      Cookies.set('token', token.value)
      userInfo.value = {
        username: username,
        token: token
      }
      message.success('登录成功')
      return true
    }
    message.error('用户名或密码错误')
    throw new Error('用户名或密码错误')
  }

  // 退出登录
  const logout = () => {
    token.value = ''
    Cookies.remove('token')
    userInfo.value = {}
  }

  return {
    token,
    userInfo,
    login,
    logout
  }
}) 