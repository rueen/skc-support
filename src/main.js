/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:09
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-08 20:43:57
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import i18n from './i18n'
import {
  CopyOutlined,
  RightOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons-vue'
import 'ant-design-vue/dist/reset.css'
import './styles/index.less'

// 引入 Froala Editor
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/zh_cn.js'

// 引入 Froala Editor 样式
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

// 创建Pinia实例
const pinia = createPinia()

// 创建Vue应用
const app = createApp(App)

// 使用插件
app.use(pinia)
app.use(router)
app.use(Antd)
app.use(i18n)
app.component('CopyOutlined', CopyOutlined)
app.component('RightOutlined', RightOutlined)
app.component('InfoCircleOutlined', InfoCircleOutlined)
app.component('PlusOutlined', PlusOutlined)
app.component('QuestionCircleOutlined', QuestionCircleOutlined)
app.component('DownloadOutlined', DownloadOutlined)

// 挂载应用
app.mount('#app')