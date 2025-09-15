/*
 * @Author: diaochan
 * @Date: 2025-09-15 16:58:00
 * @LastEditors: diaochan
 * @LastEditTime: 2025-09-15 20:16:36
 * @Description: HTML变量替换插件
 */

/**
 * HTML 变量替换插件
 * @description 用于在构建时替换 HTML 模板中的变量
 * @param {Object} variables - 要替换的变量对象
 * @returns {Object} Vite 插件对象
 */
export function htmlVariablesPlugin(variables = {}) {
  return {
    name: 'html-variables',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // 替换 HTML 中的变量
        let transformedHtml = html
        
        // 替换所有变量
        Object.entries(variables).forEach(([key, value]) => {
          const regex = new RegExp(`%${key}%`, 'g')
          transformedHtml = transformedHtml.replace(regex, value || '')
        })
        
        return transformedHtml
      }
    }
  }
}
