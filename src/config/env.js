/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:25:10
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-15 16:31:50
 * @Description: 环境配置文件
 */

import API_PATH from './api'

// 判断当前环境
const isDev = process.env.NODE_ENV === 'development';

// API 基础路径配置
const API_BASE = {
  // 开发环境 API 基础路径
  development: 'http://localhost:3002/api/support',
  // 生产环境 API 基础路径
  production: 'https://api.example.com/api',
};

// 图片上传路径配置
const IMAGE_UPLOAD_URL = {
  development: 'http://localhost:3002/api/upload/image',
  production: 'https://api.example.com/api/upload/image',
};

// 当前环境的 API 基础路径
const BASE_URL = API_BASE[process.env.NODE_ENV || 'development'];

// 当前环境的图片上传路径
const IMAGE_UPLOAD_URL_ENV = IMAGE_UPLOAD_URL[process.env.NODE_ENV || 'development'];

// 模拟数据配置
const MOCK_CONFIG = {
  // 是否启用模拟数据（仅在开发环境启用）
  enable: false,
  // 模拟数据延迟时间（毫秒）
  delay: 300,
};

// 导出配置
export default {
  // 当前环境
  isDev,
  // API 基础路径
  baseUrl: BASE_URL,
  // 图片上传路径
  imageUploadUrl: IMAGE_UPLOAD_URL_ENV,
  // API 路径
  api: API_PATH,
  // 模拟数据配置
  mock: MOCK_CONFIG,
}; 