/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:09
 * @LastEditors: diaochan
 * @LastEditTime: 2025-09-15 19:54:33
 * @Description: 多站点构建配置
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import siteConfig from './config/sites.js'
import { htmlVariablesPlugin } from './plugins/html-variables.js'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取站点配置
  const site = process.env.VITE_SITE || 'Local'
  const config = siteConfig[site]
  
  if (!config) {
    throw new Error(`站点配置 "${site}" 不存在`)
  }
  
  console.log(`🏗️  构建站点: ${site}`)
  console.log(`🌐 API 地址: ${config.baseUrl}`)
  
  // 设置构建输出目录
  const outDir = `dist/${site.toLowerCase()}`
  
  return {
    // base: '/skc-admin/',
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag === 'froala-editor'
          }
        }
      }),
      // HTML 变量替换插件
      htmlVariablesPlugin({
        VITE_FAVICON_PATH: config.faviconPath,
        VITE_APP_TITLE: config.title,
        VITE_APP_DESCRIPTION: config.description
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/variables.less";`,
          modifyVars: {
            'primary-color': '#1890ff',
            'success-color': '#52c41a',
            'warning-color': '#faad14',
            'error-color': '#f5222d'
          }
        },
      },
    },
    // 定义全局变量
    define: {
      __SITE_CONFIG__: JSON.stringify(config),
      global: 'globalThis'
    },
    // 优化配置
    optimizeDeps: {
      include: ['crypto-js']
    },
    // 构建配置
    build: {
      outDir,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            antd: ['ant-design-vue'],
            utils: ['axios', 'crypto-js']
          }
        }
      }
    },
    // 开发服务器配置
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: config.baseUrl,
          changeOrigin: true,
          secure: false,
          configure: (proxy, options) => {
            console.log(`🔄 代理配置: /api -> ${config.baseUrl}`)
          }
        }
      }
    },
    // 预览服务器配置
    preview: {
      port: 4173,
      proxy: {
        '/api': {
          target: config.baseUrl,
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})