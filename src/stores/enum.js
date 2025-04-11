/*
 * @Author: diaochan
 * @Date: 2025-03-16 21:15:30
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-11 20:39:36
 * @Description: 枚举数据存储
 */

import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { get } from '@/utils/request'

export const useEnumStore = defineStore('enum', () => {
  // 存储所有枚举数据的响应式对象
  const jsonEnum = reactive({})
  
  // 加载状态
  const loading = ref(false)
  
  // 是否已加载
  const loaded = ref(false)
  
  // 加载错误信息
  const error = ref(null)
  
  /**
   * 获取所有枚举数据
   * @param {String} lang - 语言代码，默认为 zh-CN
   * @returns {Promise<void>}
   */
  const fetchEnum = async (_lang) => {
    const lang = _lang || localStorage.getItem('language') || 'zh-CN'; 
    // 如果已经加载过，则不重复加载
    if (loaded.value) return
    
    // 设置加载状态
    loading.value = true
    error.value = null
    
    try {
      // 调用获取所有枚举的接口
      const res = await get('enum.enumAll', { lang })
      
      // 将获取到的数据存入响应式对象
      Object.keys(res.data || {}).forEach(key => {
        jsonEnum[key] = res.data[key]
      })
      
      // 标记为已加载
      loaded.value = true
    } catch (err) {
      console.error('获取枚举数据失败:', err)
      error.value = err.message || '获取枚举数据失败'
    } finally {
      // 无论成功失败，都结束加载状态
      loading.value = false
    }
  }
  
  /**
   * 获取指定枚举的文本
   * @param {String} enumType - 枚举类型
   * @param {String} value - 枚举值
   * @returns {String} - 枚举文本
   */
  const getEnumText = (enumType, value) => {
    if (!jsonEnum[enumType]) return value
    
    const enumItem = Object.values(jsonEnum[enumType]).find(item => item.value === value)
    return enumItem ? enumItem.text : value
  }
  
  /**
   * 获取指定枚举的选项列表（用于下拉框等）
   * @param {String} enumType - 枚举类型
   * @returns {Array} - 选项列表
   */
  const getEnumOptions = (enumType) => {
    if (!jsonEnum[enumType]) return []
    
    return Object.values(jsonEnum[enumType]).map(item => ({
      text: item.text,
      value: item.value
    }))
  }
  
  /**
   * 重置枚举数据
   */
  const resetEnum = () => {
    // 清空数据
    Object.keys(jsonEnum).forEach(key => {
      delete jsonEnum[key]
    })
    
    // 重置状态
    loaded.value = false
    loading.value = false
    error.value = null
  }
  
  return {
    jsonEnum,
    loading,
    loaded,
    error,
    fetchEnum,
    getEnumText,
    getEnumOptions,
    resetEnum
  }
}) 