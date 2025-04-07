/*
 * @Author: diaochan
 * @Date: 2025-03-09 16:07:50
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-07 11:21:09
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
    preAuditList: '/submitted-tasks/pre-audit', // 初审列表
    preAuditExport: '/submitted-tasks/pre-audit/export', // 初审导出
    batchPreAuditApprove: '/submitted-tasks/pre-audit/batch-approve', // 批量初审通过
    batchPreAuditReject: '/submitted-tasks/pre-audit/batch-reject', // 批量初审拒绝
    confirmAuditList: '/submitted-tasks/confirm-audit', // 复审列表
    confirmAuditExport: '/submitted-tasks/confirm-audit/export', // 复审导出
    batchConfirmAuditApprove: '/submitted-tasks/confirm-audit/batch-approve', // 批量复审通过
    batchConfirmAuditReject: '/submitted-tasks/confirm-audit/batch-reject', // 批量复审拒绝
    detail: '/submitted-tasks/:id', // 任务详情
  },
  // 账号相关接口
  account: {
    list: '/accounts',
    batchResolve: '/accounts/batch-approve',
    batchReject: '/accounts/batch-reject',
  },
  // 老账号相关接口
  oldAccount: {
    list: '/old-accounts-fb',
    import: '/old-accounts-fb/import',
    add: '/old-accounts-fb',
    edit: '/old-accounts-fb/:id',
    delete: '/old-accounts-fb/:id',
  },
  // 会员相关接口
  member: {
    list: '/members',
    add: '/members',
    edit: '/members/:id',
    delete: '/members/:id',
    detail: '/members/:id',
    balance: '/members/:memberId/balance',
    taskStats: '/members/:memberId/task/stats',
    inviteStats: '/members/:memberId/invite/stats',
    groupsStats: '/members/:memberId/groups/stats',
    grantReward: '/members/grant-reward', // POST 奖励发放  
    deductReward: '/members/deduct-reward', // POST 奖励扣除
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