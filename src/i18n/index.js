/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:22:19
 * @LastEditors: diaochan
 * @LastEditTime: 2025-08-28 17:43:35
 * @Description: 
 */
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import zhTW from './zh-tw'
import ja from './ja'

// 获取本地存储的语言设置
const defaultLocale = localStorage.getItem('language') || 'en-US';

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh,
    'en-US': en,
    'zh-TW': zhTW,
    'ja-JP': ja
  }
})

// 导出设置语言的方法
export const setLocale = (locale) => {
  i18n.global.locale.value = locale || 'en-US';
  localStorage.setItem('language', locale)
}

export default i18n 