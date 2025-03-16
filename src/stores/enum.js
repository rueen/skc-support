/*
 * @Author: diaochan
 * @Date: 2025-03-16 20:34:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-16 20:59:42
 * @Description: 
 */
import { defineStore } from 'pinia'
import { getEnumAll } from '@/utils/enum'

export const useEnumStore = defineStore('enum', {
  state: () => ({
    allEnum: {}
  }),

  actions: {
    async fetchEnum() {
      let json = {}
      const res = await getEnumAll()
      Object.keys(res).forEach(key => {
        const value = res[key] || {}
        const _json = {}
        Object.values(value).forEach(item => {
          _json[item.value] = item.text
        })
        json[key] = _json
        this[key] = _json
      })
      this.allEnum = json
    }
  }
})