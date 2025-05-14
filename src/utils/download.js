/*
 * @Author: diaochan
 * @Date: 2025-03-13 12:30:00
 * @LastEditors: diaochan
 * @LastEditTime: 2025-05-14 22:43:34
 * @Description: 文件下载工具函数
 */

import axios from 'axios'
import { message } from 'ant-design-vue'
import config from '@/config/env'
import generateSign from './generateSign'

/**
 * 下载文件
 * @param {String} url - 下载地址
 * @param {Object} params - 请求参数
 * @param {String} filename - 文件名，如果不传则使用服务端返回的文件名
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回下载结果
 */
export const downloadFile = (url, params = {}, filename = '', options = {}) => {
  // 创建一个新的 axios 实例，用于文件下载
  const downloadService = axios.create({
    baseURL: config.businessApiUrl,
    timeout: 60000, // 下载文件可能需要更长的超时时间
    responseType: 'blob', // 重要：指定响应类型为 blob
  })

  // 添加请求拦截器
  downloadService.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      
      // 如果有 token，则添加到请求头中
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    error => {
      console.error('下载请求错误:', error)
      return Promise.reject(error)
    }
  )

  // 生成签名 (密钥需要从后端开发人员处获取)
  const sign = generateSign(params);
  // 添加签名到请求参数
  params.sign = sign;

  // 发送请求
  return downloadService({
    url,
    method: 'get',
    params,
    ...options
  }).then(response => {
    // 获取文件名
    let downloadFilename = filename
    
    // 如果没有指定文件名，则尝试从响应头中获取
    if (!downloadFilename) {
      const disposition = response.headers['content-disposition']
      if (disposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(disposition)
        if (matches && matches[1]) {
          downloadFilename = matches[1].replace(/['"]/g, '')
          // 解码文件名
          try {
            downloadFilename = decodeURIComponent(downloadFilename)
          } catch (e) {
            console.error('文件名解码失败:', e)
          }
        }
      }
      
      // 如果仍然没有文件名，则使用默认文件名
      if (!downloadFilename) {
        const contentType = response.headers['content-type']
        if (contentType) {
          if (contentType.includes('excel') || contentType.includes('spreadsheetml')) {
            downloadFilename = 'export.xlsx'
          } else if (contentType.includes('csv')) {
            downloadFilename = 'export.csv'
          } else if (contentType.includes('pdf')) {
            downloadFilename = 'export.pdf'
          } else {
            downloadFilename = 'export.file'
          }
        } else {
          downloadFilename = 'export.file'
        }
      }
    }
    
    // 创建 Blob 对象
    const blob = new Blob([response.data])
    
    // 创建下载链接
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = downloadFilename
    
    // 触发点击事件下载文件
    document.body.appendChild(link)
    link.click()
    
    // 清理
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
    
    return {
      success: true,
      filename: downloadFilename
    }
  }).catch(error => {
    // 处理错误
    let errorMessage = '下载失败'
    
    if (error.response) {
      // 服务器返回了错误状态码
      if (error.response.status === 401) {
        errorMessage = '登录已过期，请重新登录'
        localStorage.removeItem('token')
        window.location.href = '/#/login'
      } else {
        // 尝试解析错误信息
        try {
          const reader = new FileReader()
          reader.onload = () => {
            try {
              const errorData = JSON.parse(reader.result)
              errorMessage = errorData.message || '下载失败'
              message.error(errorMessage)
            } catch (e) {
              message.error('下载失败')
            }
          }
          reader.readAsText(error.response.data)
        } catch (e) {
          message.error('下载失败')
        }
      }
    } else {
      message.error(errorMessage)
    }
    
    return Promise.reject(error)
  })
}

/**
 * 根据 API 名称下载文件
 * @param {String} apiName - API 名称，格式为 "模块.接口"，例如 "task.export"
 * @param {Object} params - 请求参数
 * @param {String} filename - 文件名，如果不传则使用服务端返回的文件名
 * @param {Object} options - 请求选项
 * @return {Promise} - 返回下载结果
 */
export const downloadByApi = (apiName, params = {}, filename = '', options = {}) => {
  // 解析 API 名称
  const [module, name] = apiName.split('.')
  
  // 获取 API 路径
  const apiPath = config.api[module] && config.api[module][name]
  if (!apiPath) {
    console.error(`API ${apiName} 不存在`)
    message.error(`API ${apiName} 不存在`)
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
  
  // 下载文件
  return downloadFile(url, params, filename, options)
}

export default {
  downloadFile,
  downloadByApi
} 