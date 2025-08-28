/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:22:19
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-11 14:19:21
 * @Description: 
 */
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import zhTW from './zh-tw'
import ja from './ja'

// 获取本地存储的语言设置，默认中文
const defaultLocale = localStorage.getItem('language') || 'zh-CN'

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

export default i18n 