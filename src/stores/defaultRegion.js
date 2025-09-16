/*
 * @Author: diaochan
 * @Date: 2025-08-28 16:08:02
 * @LastEditors: diaochan
 * @LastEditTime: 2025-09-16 15:20:39
 * @Description: 
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { get } from '@/utils/request'
import { setLocale } from '@/i18n'

export const useDefaultRegionStore = defineStore('defaultRegion', () => {
  const defaultRegion = ref('');
  const languageColumns = ref([]);
  // 获取站点配置（从 vite.config.js 注入）
  const siteConfig = __SITE_CONFIG__;

  /**
   * 获取默认地区并设置对应的默认语言
   */
  const fetchDefaultRegion = async () => {
    try {
      defaultRegion.value = siteConfig.site;

      // 检查是否已经有语言设置
      const hasLanguageSetting = localStorage.getItem('language');

      switch(defaultRegion.value){
        case 'Malaysia':
        case 'Local':
          // 只有在没有语言设置时才设置默认语言
          if(!hasLanguageSetting){
            setLocale('zh-CN')
          }
          languageColumns.value = [
            { text: 'English', value: 'en-US' },
            { text: '简体中文', value: 'zh-CN' },
            { text: '繁體中文', value: 'zh-TW' },
          ];
          break;
        case 'Japan':
          // 只有在没有语言设置时才设置默认语言
          if(!hasLanguageSetting){
            setLocale('ja-JP')
          }
          languageColumns.value = [
            { text: '日本語', value: 'ja-JP' },
            { text: 'English', value: 'en-US' },
            { text: '简体中文', value: 'zh-CN' },
          ];
          break;
        default:
          // 默认情况，如果没有语言设置，使用英文
          if(!hasLanguageSetting){
            setLocale('en-US')
          }
          break;
      }
    } catch (error) {
      console.error('获取默认地区失败:', error)
      // 如果接口失败，且没有语言设置，使用英文作为默认语言
      if(!localStorage.getItem('language')){
        setLocale('en-US')
      }
    }
  }

  return {
    defaultRegion,
    languageColumns,
    fetchDefaultRegion
  }
})