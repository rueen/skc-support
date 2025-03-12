/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:35:20
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-12 14:20:40
 * @Description: API 请求工具
 */

import axios from 'axios'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'
import config from '@/config/env'
import { mockRequest } from './mock'

const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 登录接口不需要添加token
    if (config.url.includes('/users/login')) {
      return config
    }
    
    // 从 cookie 中获取 token
    const token = Cookies.get('token')
    
    // 如果有 token，则添加到请求头中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      message.error(res.message || '请求失败')
      console.error('接口返回错误:', res.message)
      return Promise.reject(new Error(res.message || '未知错误'))
    }
    return res
  },
  error => {
    // 如果是未登录状态，则跳转到登录页
    if(error.response.status === 401){
      message.error('登录已过期，请重新登录')
      Cookies.remove('token')
      window.location.href = '/login'
    } else if(error.response.status === 400) {
      // 参数错误
      message.error(error.response.data.message)
    } else {
      console.error('响应错误:', error)
      return Promise.reject(error)
    }
  }
)

/**
 * 发送请求
 * @param {String} apiName - API 名称，格式为 "模块.接口"，例如 "task.list"
 * @param {Object} params - 请求参数
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回请求结果
 */
export const request = async (apiName, params = {}, options = {}) => {
  // 如果启用了模拟数据，则使用模拟数据
  if (config.mock.enable) {
    return mockRequest(apiName, params)
  }
  
  // 解析 API 名称
  const [module, name] = apiName.split('.')
  
  // 获取 API 路径
  const apiPath = config.api[module] && config.api[module][name]
  if (!apiPath) {
    console.error(`API ${apiName} 不存在`)
    return Promise.reject(new Error(`API ${apiName} 不存在`))
  }
  
  // 构建请求 URL
  let url = apiPath
  
  // 根据请求方法确定如何发送参数
  const method = options.method || 'get'
  const requestOptions = {
    url,
    method,
    ...options,
  }
  
  // 根据请求方法确定如何发送参数
  if (method.toLowerCase() === 'get') {
    requestOptions.params = params
  } else {
    requestOptions.data = params
  }
  
  // 发送请求
  return service(requestOptions)
}

/**
 * GET 请求
 * @param {String} apiName - API 名称
 * @param {Object} params - 请求参数
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回请求结果
 */
export const get = (apiName, params = {}, options = {}) => {
  return request(apiName, params, { ...options, method: 'get' })
}

/**
 * POST 请求
 * @param {String} apiName - API 名称
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回请求结果
 */
export const post = (apiName, data = {}, options = {}) => {
  return request(apiName, data, { ...options, method: 'post' })
}

/**
 * PUT 请求
 * @param {String} apiName - API 名称
 * @param {Object} data - 请求数据
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回请求结果
 */
export const put = (apiName, data = {}, options = {}) => {
  return request(apiName, data, { ...options, method: 'put' })
}

/**
 * DELETE 请求
 * @param {String} apiName - API 名称
 * @param {Object} params - 请求参数
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回请求结果
 */
export const del = (apiName, params = {}, options = {}) => {
  return request(apiName, params, { ...options, method: 'delete' })
}

export default {
  request,
  get,
  post,
  put,
  del,
} 