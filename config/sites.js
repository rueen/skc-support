/*
 * @Author: diaochan
 * @Date: 2025-09-15 16:57:00
 * @LastEditors: diaochan
 * @LastEditTime: 2025-09-16 15:12:59
 * @Description: 多站点配置文件
 */

/**
 * 站点配置
 * @description 定义各个站点的基础配置信息
 */
export default {
  Local: {
    site: 'Local',
    baseUrl: 'http://localhost:3002',
    apiSignSecret: '81fe9c1f0a2d564bf827eb5ca3f3ed7b46592b7dc40b9a47fd3cb8fbf5308e9a',
    faviconPath: '/vite.svg',
    title: 'SKC Local',
    description: 'SKC 本地开发环境',
    h5Url: 'http://localhost:5173'
  },
  Malaysia: {
    site: 'Malaysia',
    baseUrl: 'http://sapi.skcpop.com',
    apiSignSecret: '81fe9c1f0a2d564bf827eb5ca3f3ed7b46592b7dc40b9a47fd3cb8fbf5308e9a',
    faviconPath: '/vite.svg',
    title: 'SKC',
    description: 'SKC Support System',
    h5Url: 'http://m.skcpop.com'
  },
  Japan: {
    site: 'Japan',
    baseUrl: 'https://sapi.jpskc.com',
    apiSignSecret: '4eUFufSZIlBEFSUynMcHVQGT2TpcNHjWb+C+ebZhPEQ=',
    faviconPath: '/favicon-japan.ico',
    title: 'SKC',
    description: 'SKC Support System',
    h5Url: 'https://m.jpskc.com'
  }
}
