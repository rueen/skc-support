/*
 * @Author: diaochan
 * @Date: 2025-03-16 12:35:20
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-16 12:35:20
 * @Description: 上传工具函数
 */

import { post } from './request'
import { message } from 'ant-design-vue'

/**
 * 上传图片
 * @param {File} file - 图片文件
 * @param {Object} options - 上传选项
 * @returns {Promise<Object>} - 返回上传结果
 */
export const uploadImage = async (file, options = {}) => {
  // 检查文件类型
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    message.error('请上传图片文件')
    return Promise.reject(new Error('文件类型错误，请上传图片文件'))
  }
  
  // 检查文件大小（默认限制为 5MB）
  const maxSize = options.maxSize || 5 * 1024 * 1024
  if (file.size > maxSize) {
    message.error(`图片大小不能超过 ${maxSize / 1024 / 1024}MB`)
    return Promise.reject(new Error(`文件过大，请上传小于 ${maxSize / 1024 / 1024}MB 的图片`))
  }
  
  // 创建 FormData
  const formData = new FormData()
  formData.append('file', file)
  
  // 添加额外参数
  if (options.params) {
    Object.keys(options.params).forEach(key => {
      formData.append(key, options.params[key])
    })
  }
  
  try {
    // 使用公共 API 上传图片
    const res = await post('upload.image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...options
    })
    
    return res.data
  } catch (error) {
    message.error('图片上传失败')
    return Promise.reject(error)
  }
}

/**
 * 上传文件
 * @param {File} file - 文件
 * @param {Object} options - 上传选项
 * @returns {Promise<Object>} - 返回上传结果
 */
export const uploadFile = async (file, options = {}) => {
  // 检查文件大小（默认限制为 10MB）
  const maxSize = options.maxSize || 10 * 1024 * 1024
  if (file.size > maxSize) {
    message.error(`文件大小不能超过 ${maxSize / 1024 / 1024}MB`)
    return Promise.reject(new Error(`文件过大，请上传小于 ${maxSize / 1024 / 1024}MB 的文件`))
  }
  
  // 创建 FormData
  const formData = new FormData()
  formData.append('file', file)
  
  // 添加额外参数
  if (options.params) {
    Object.keys(options.params).forEach(key => {
      formData.append(key, options.params[key])
    })
  }
  
  try {
    // 使用公共 API 上传文件
    const res = await post('upload.file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...options
    })
    
    return res.data
  } catch (error) {
    message.error('文件上传失败')
    return Promise.reject(error)
  }
}

export default {
  uploadImage,
  uploadFile
} 