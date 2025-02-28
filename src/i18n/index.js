/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:22:19
 * @LastEditors: diaochan
 * @LastEditTime: 2025-02-28 17:08:44
 * @Description: 
 */
import { createI18n } from 'vue-i18n'
import zhCN from './zh/index'
import enUS from './en/index'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n 