/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:21:09
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-25 16:27:38
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  // base: '/skc-admin/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'froala-editor'
        }
      }
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
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://sapi.skcpop.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
}))
