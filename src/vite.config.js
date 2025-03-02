/*
 * @Author: diaochan
 * @Date: 2025-03-02 21:49:03
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-02 21:58:52
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/skc-support/' : '/',  // 替换 <repository-name> 为你的仓库名
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}) 