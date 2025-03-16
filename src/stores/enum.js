/*
 * @Author: diaochan
 * @Date: 2025-03-16 20:34:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-16 21:20:15
 * @Description: 
 */
import { defineStore } from 'pinia'
import { getEnumAll } from '@/utils/enum'

export const useEnumStore = defineStore('enum', {
  state: () => ({
    jsonEnum: {},
    arrEnum: {}
  }),

  actions: {
    async fetchEnum() {
      const res = await getEnumAll()
      Object.keys(res).forEach(key => {
        const value = res[key] || {}
        const _json = {}
        Object.values(value).forEach(item => {
          _json[item.value] = item.text
        })
        this.jsonEnum[key] = _json
        this.arrEnum[key] = Object.values(value)
      })
    }
  }
})