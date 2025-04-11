/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:25:10
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-11 23:50:58
 * @Description: 环境配置文件
 */

import API_PATH from './api'

// 判断当前环境
const isDev = process.env.NODE_ENV === 'development';

// API 基础路径配置
const API_BASE = {
  // 开发环境 API 基础路径
  development: 'http://localhost:3002',
  // 生产环境 API 基础路径
  production: 'http://sapi.rueen.cn',
};

// 公共 API 路径配置（用于图片上传、获取枚举常量等）
const PUBLIC_API_PATH = {
  development: '/api',
  production: '/api',
};

// 业务 API 路径配置
const BUSINESS_API_PATH = {
  development: '/api/admin',
  production: '/api/admin',
};

// 当前环境的基础 API 路径
const BASE_URL = API_BASE[process.env.NODE_ENV || 'development'];

// 当前环境的公共 API 路径
const PUBLIC_API_URL = BASE_URL + PUBLIC_API_PATH[process.env.NODE_ENV || 'development'];

// 当前环境的业务 API 路径
const BUSINESS_API_URL = BASE_URL + BUSINESS_API_PATH[process.env.NODE_ENV || 'development'];

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
  // 基础 API 路径
  baseUrl: BASE_URL,
  // 公共 API 路径（用于图片上传、获取枚举常量等）
  publicApiUrl: PUBLIC_API_URL,
  // 业务 API 路径（用于业务接口）
  businessApiUrl: BUSINESS_API_URL,
  // 图片上传路径
  imageUploadUrl: `${PUBLIC_API_URL}/upload/image`,
  // API 路径
  api: API_PATH,
  // 模拟数据配置
  mock: MOCK_CONFIG,
  // H5 路径
  h5Url: 'http://localhost:5173',
}; 