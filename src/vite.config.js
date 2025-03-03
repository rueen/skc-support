/*
 * @Author: diaochan
 * @Date: 2025-03-02 21:49:03
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-03 10:35:36
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/skc-support/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}) 