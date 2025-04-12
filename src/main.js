/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:09
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-12 10:36:23
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
  DownloadOutlined,
  UploadOutlined,
  LeftOutlined,
  UserOutlined,
  LockOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  FileTextOutlined,
  PayCircleOutlined,
  LogoutOutlined,
  ApartmentOutlined,
  ProfileOutlined,
  AuditOutlined,
  LinkOutlined,
  SafetyOutlined,
  FileOutlined,
  SettingOutlined,
  EditOutlined
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
app.component('UploadOutlined', UploadOutlined)
app.component('LeftOutlined', LeftOutlined)
app.component('UserOutlined', UserOutlined)
app.component('LockOutlined', LockOutlined)
app.component('MenuFoldOutlined', MenuFoldOutlined)
app.component('MenuUnfoldOutlined', MenuUnfoldOutlined)
app.component('TeamOutlined', TeamOutlined)
app.component('FileTextOutlined', FileTextOutlined)
app.component('PayCircleOutlined', PayCircleOutlined)
app.component('LogoutOutlined', LogoutOutlined)
app.component('ApartmentOutlined', ApartmentOutlined)
app.component('ProfileOutlined', ProfileOutlined)
app.component('AuditOutlined', AuditOutlined)
app.component('LinkOutlined', LinkOutlined)
app.component('SafetyOutlined', SafetyOutlined)
app.component('FileOutlined', FileOutlined)
app.component('SettingOutlined', SettingOutlined)
app.component('EditOutlined', EditOutlined)

// 挂载应用
app.mount('#app')