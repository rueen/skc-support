/*
 * @Author: diaochan
 * @Date: 2025-03-09 16:07:50
 * @LastEditors: diaochan
 * @LastEditTime: 2025-07-21 16:31:38
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
  // 任务组
  taskGroup: {
    list: '/task-groups',
    add: '/task-groups',
    edit: '/task-groups/:id',
    delete: '/task-groups/:id',
    detail: '/task-groups/:id',
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
    detail: '/submitted-tasks/detail', // 任务详情
  },
  // 账号相关接口
  account: {
    list: '/accounts',
    batchResolve: '/accounts/batch-approve',
    batchReject: '/accounts/batch-reject',
    edit: '/accounts/:id', // PUT 编辑账号
    detail: '/accounts/:id', // GET 账号详情
    delete: '/accounts/:id', // DELETE 删除账号
    export: '/accounts/export', // 导出账号
  },
  // 老账号相关接口
  oldAccount: {
    list: '/old-accounts-fb',
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
    withdrawalsAccount: '/members/:memberId/withdrawal-accounts', // GET 获取会员提现账号
    export: '/members/export', // 导出会员
    balanceLogs: '/members/:memberId/balance-logs', // GET 获取会员余额变动记录
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
    billsExport: '/bills/export',
  },
  // 提现相关接口
  withdrawals: {
    list: '/withdrawals',
    batchResolve: '/withdrawals/batch-approve',
    batchReject: '/withdrawals/batch-reject',
    export: '/withdrawals/export',
    paymentTransactions: '/withdrawals/payment-transactions',
  },
  // 支付渠道相关接口
  paymentChannels: {
    list: '/payment-channels',
    add: '/payment-channels',
    edit: '/payment-channels/:id',
    delete: '/payment-channels/:id',
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
  ad: {
    list: '/ads',
    add: '/ads',
    edit: '/ads/:id',
    delete: '/ads/:id',
    detail: '/ads/:id',
  },
  // 文章相关接口
  article: {
    list: '/articles',
    add: '/articles',
    edit: '/articles/:id',
    delete: '/articles/:id',
  },
  // 站内信相关接口
  messages: {
    list: '/messages',
    add: '/messages',
    edit: '/messages/:id',
    delete: '/messages/:id',
    detail: '/messages/:id',
  },
  // 系统相关接口（公共API）
  system: {
    // 获取所有配置 GET
    getAllConfig: '/system-configs',
    // 保存所有配置 POST
    saveAllConfig: '/system-configs',
  },
  public: {
    enumType: '/enums/:enumType',
    enumAll: '/enums',
    location: '/location',
  }
}

export default API_PATH