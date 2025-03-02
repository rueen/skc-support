/*
 * @Author: diaochan
 * @Date: 2025-03-02 21:49:03
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-02 22:08:18
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 获取环境变量
const env = process.env.NODE_ENV

export default defineConfig(({ command, mode }) => ({
  base: mode === 'production' ? '/skc-support/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})) 