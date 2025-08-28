/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:35:20
 * @LastEditors: diaochan
 * @LastEditTime: 2025-08-28 17:41:41
 * @Description: API 请求工具
 */

import axios from 'axios'
import { message } from 'ant-design-vue'
import config from '@/config/env'
import { mockRequest } from './mock'
import filterEmptyParams from './filterEmptyParams'
import generateSign from './generateSign'

// 公共API服务（用于图片上传、获取枚举常量等）
const publicService = axios.create({
  baseURL: config.publicApiUrl,
  timeout: 20000
})

// 业务API服务（用于业务接口）
const businessService = axios.create({
  baseURL: config.businessApiUrl,
  timeout: 20000
})

// 配置请求拦截器
const setupInterceptors = (service) => {
  // 请求拦截器
  service.interceptors.request.use(
    config => {
      // 登录接口不需要添加token
      if (config.url.includes('/users/login')) {
        return config
      }
      
      const token = localStorage.getItem('token')
      
      // 如果有 token，则添加到请求头中
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      // 添加语言参数
      const lang = localStorage.getItem('language');
      
      // 如果是 FormData，需要特殊处理
      if (config.data instanceof FormData) {
        config.data.append('lang', lang)
      } else {
        config.params = { ...config.params, lang }
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
      if(error.response && error.response.status === 401){
        localStorage.removeItem('token')
        // 获取当前路径
        const currentPath = window.location.pathname
        // 如果不是登录页，则跳转到登录页
        if (currentPath !== '/login') {
          window.location.href = '/#/login'
        }
      }
      message.error(error.response?.data?.message || '请求失败')
      console.error('响应错误:', error)
      return Promise.reject(error)
    }
  )
}

// 为两个服务配置拦截器
setupInterceptors(publicService)
setupInterceptors(businessService)

/**
 * 判断API是否为公共API
 * @param {String} apiName - API名称
 * @returns {Boolean} - 是否为公共API
 */
const isPublicApi = (apiName) => {
  // 公共API模块列表
  const publicModules = ['public']
  const [module] = apiName.split('.')
  return publicModules.includes(module)
}

/**
 * 发送请求
 * @param {String} apiName - API 名称，格式为 "模块.接口"，例如 "task.list"
 * @param {Object} params - 请求参数
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回请求结果
 */
export const request = async (apiName, params = {}, options = {}) => {
  // 过滤掉参数中的空字符串
  const filteredParams = options.filterEmpty !== false ? filterEmptyParams(params) : params;
  
  // 如果启用了模拟数据，则使用模拟数据
  if (config.mock.enable) {
    return mockRequest(apiName, filteredParams)
  }
  // 生成签名 (密钥需要从后端开发人员处获取)
  const sign = generateSign(filteredParams);
  // 添加签名到请求参数
  filteredParams.sign = sign;
  
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
  
  // 替换 URL 中的参数（例如 /api/:id 替换为 /api/1）
  if (options.urlParams) {
    url = url.replace(/:([^/]+)/g, (match, key) => {
      const value = options.urlParams[key]
      if (value === undefined) {
        console.warn(`URL 参数 ${key} 未提供`)
        return match
      }
      return value
    })
  }
  
  // 根据请求方法确定如何发送参数
  const method = options.method || 'get'
  const requestOptions = {
    url,
    method,
    ...options,
  }
  
  // 根据请求方法确定如何发送参数
  if (method.toLowerCase() === 'get') {
    requestOptions.params = filteredParams
  } else {
    requestOptions.data = filteredParams
  }
  
  // 根据API类型选择不同的服务
  const service = isPublicApi(apiName) ? publicService : businessService
  
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