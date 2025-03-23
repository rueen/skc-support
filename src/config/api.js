/*
 * @Author: diaochan
 * @Date: 2025-03-09 16:07:50
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-23 16:43:23
 * @Description: API 路径配置
 */
const API_PATH = {
  // 任务相关接口
  task: {
    list: '/tasks',
    add: '/tasks',
    edit: '/tasks/:id',
    delete: '/tasks/:id',
    detail: '/tasks/:id',
    export: '/tasks/export',
    submitted: '/submitted-tasks',
    submittedDetail: '/submitted-tasks/:id',
  },
  // 已提交任务相关接口
  taskSubmitted: {
    detail: '/taskSubmitted/:id',
    batchResolve: '/taskSubmitted/batchResolve',
    batchReject: '/taskSubmitted/batchReject',
  },
  // 账号相关接口
  account: {
    list: '/accounts',
    batchResolve: '/accounts/batchResolve',
    batchReject: '/accounts/batchReject',
  },
  // 会员相关接口
  member: {
    list: '/members',
    add: '/members',
    edit: '/members/:id',
    delete: '/members/:id',
    detail: '/members/:id',
  },
  // 渠道管理相关接口
  channel: {
    list: '/channels',
    add: '/channels',
    edit: '/channels/:id',
    delete: '/channels/:id',
  },
  group: {
    list: '/groups',
    add: '/groups',
    edit: '/groups/:id',
    delete: '/groups/:id',
  },
  // 结算相关接口
  settlement: {
    withdrawal: '/settlement/withdrawal',
    batchResolve: '/settlement/withdrawal/batchResolve',
    batchReject: '/settlement/withdrawal/batchReject',
    withdrawalExport: '/settlement/withdrawal/export',
    otherBills: '/settlement/otherBills',
  },
  // 小二管理相关接口
  waiter: {
    list: '/waiters',
    add: '/waiters',
    edit: '/waiters/:id',
    delete: '/waiters/:id',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  user: {
    info: '/user/info',
  },
  // 文章相关接口
  article: {
    list: '/articles',
    add: '/articles',
    edit: '/articles/:id',
    delete: '/articles/:id',
  },
  enum: {
    enumType: '/enums/:enumType',
    enumAll: '/enums',
  },
  // 系统相关接口（公共API）
  system: {
    // 获取所有配置 GET
    getAllConfig: '/system/configs',
    // 根据key获取配置 GET
    getConfigByKey: '/system/config/:key',
    // 根据key更新配置 PUT
    updateConfigByKey: '/system/config/:key',
    // 保存所有配置 POST
    saveAllConfig: '/system/configs',
  },
  // 上传相关接口（公共API）
  upload: {
    image: '/upload/image',
    file: '/upload/file',
  },
}

export default API_PATH