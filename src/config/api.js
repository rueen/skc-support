/*
 * @Author: diaochan
 * @Date: 2025-03-09 16:07:50
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-30 21:20:08
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
  },
  // 已提交任务相关接口
  taskSubmitted: {
    list: '/submitted-tasks',
    detail: '/submitted-tasks/:id',
    batchResolve: '/submitted-tasks/batch-approve',
    batchReject: '/submitted-tasks/batch-reject',
  },
  // 账号相关接口
  account: {
    list: '/accounts',
    batchResolve: '/accounts/batch-approve',
    batchReject: '/accounts/batch-reject',
  },
  // 会员相关接口
  member: {
    list: '/members',
    add: '/members',
    edit: '/members/:id',
    delete: '/members/:id',
    detail: '/members/:id',
    taskStats: '/members/:memberId/task/stats',
    inviteStats: '/members/:memberId/invite/stats',
    groupsStats: '/members/:memberId/groups/stats',
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
  // 金融相关接口
  finance: {
    bills: '/bills',
  },
  // 提现相关接口
  withdrawals: {
    list: '/withdrawals',
    batchResolve: '/withdrawals/batch-approve',
    batchReject: '/withdrawals/batch-reject',
    export: '/withdrawals/export',
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
    userInfo: '/auth/userInfo',
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
    getAllConfig: '/system-configs',
    // 保存所有配置 POST
    saveAllConfig: '/system-configs',
  },
  // 上传相关接口（公共API）
  upload: {
    image: '/upload/image',
    file: '/upload/file',
  },
}

export default API_PATH