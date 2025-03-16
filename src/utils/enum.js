/*
 * @Author: diaochan
 * @Date: 2025-03-16 11:40:20
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-16 20:54:29
 * @Description: 枚举工具函数
 */

import { get } from './request'

/**
 * 获取枚举常量
 * @param {String} enumType - 枚举类型名称，如 TaskStatus、TaskType 等
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回枚举常量对象
 */
export const getEnum = async (enumType) => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  try {
    const res = await get('system.enum', { lang }, {
      urlParams: { enumType }
    })
    return res.data || {}
  } catch (error) {
    console.error(`获取枚举常量 ${enumType} 失败:`, error)
    return {}
  }
}

/**
 * 获取枚举文本
 * @param {String} enumType - 枚举类型名称
 * @param {String} value - 枚举值
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<String>} - 返回枚举文本
 */
export const getEnumText = async (enumType, value) => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  try {
    const enumData = await getEnum(enumType, lang)
    // 查找匹配的枚举项
    const enumItem = Object.values(enumData).find(item => item.value === value)
    return enumItem ? enumItem.text : value
  } catch (error) {
    console.error(`获取枚举文本失败:`, error)
    return value
  }
}

/**
 * 获取任务状态枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回任务状态枚举对象
 */
export const getTaskStatusEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('TaskStatus', lang)
}

/**
 * 获取任务类型枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回任务类型枚举对象
 */
export const getTaskTypeEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('TaskType', lang)
}

/**
 * 获取任务审核状态枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回任务审核状态枚举对象
 */
export const getTaskAuditStatusEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('TaskAuditStatus', lang)
}

/**
 * 获取账号审核状态枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回账号审核状态枚举对象
 */
export const getAccountAuditStatusEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('AccountAuditStatus', lang)
}

/**
 * 获取提现状态枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回提现状态枚举对象
 */
export const getWithdrawalStatusEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('WithdrawalStatus', lang)
}

/**
 * 获取账单类型枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回账单类型枚举对象
 */
export const getBillTypeEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('BillType', lang)
}

/** 
 * 获取结算状态枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回结算状态枚举对象
 */
export const getSettlementStatusEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('SettlementStatus', lang)
}

/**
 * 获取职业类型枚举
 * @param {String} lang - 语言代码，默认为 zh-CN
 * @returns {Promise<Object>} - 返回职业类型枚举对象
 */
export const getOccupationTypeEnum = () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  return getEnum('OccupationType', lang)
}

export const getEnumAll = async () => {
  const lang = localStorage.getItem('language') || 'zh-CN'
  try {
    const res = await get('system.enumAll', { lang }, {})
    return res.data || {}
  } catch (error) {
    console.error(`获取枚举常量失败:`, error)
    return {}
  }
}

export default {
  getEnum,
  getEnumText,
  getTaskStatusEnum,
  getTaskTypeEnum,
  getTaskAuditStatusEnum,
  getAccountAuditStatusEnum,
  getWithdrawalStatusEnum,
  getBillTypeEnum,
  getSettlementStatusEnum,
  getOccupationTypeEnum,
  getEnumAll
} 