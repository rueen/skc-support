/*
 * @Author: diaochan
 * @Date: 2025-03-09 16:07:50
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-10 15:46:48
 * @Description: API 路径配置
 */
const API_PATH = {
  // 任务相关接口
  task: {
    list: '/tasks/list',
    add: '/tasks/add',
    edit: '/tasks/edit',
    delete: '/tasks/delete',
    detail: '/tasks/detail',
    export: '/tasks/export',
  },
  // 任务审核相关接口
  taskAudit: {
    list: '/taskAudits/list',
    detail: '/taskAudits/detail',
    batchResolve: '/taskAudits/batchResolve',
    batchReject: '/taskAudits/batchReject',
  },
  // 账号相关接口
  account: {
    list: '/accounts/list',
    batchResolve: '/accounts/batchResolve',
    batchReject: '/accounts/batchReject',
  },
  // 会员相关接口
  member: {
    list: '/members/list',
    add: '/members/add',
    edit: '/members/edit',
    delete: '/members/delete',
    detail: '/members/detail',
  },
  // 渠道管理相关接口
  channel: {
    list: '/channels/list',
    add: '/channels/add',
    edit: '/channels/edit',
    delete: '/channels/delete',
  },
  group: {
    list: '/groups/list',
    add: '/groups/add',
    edit: '/groups/edit',
    delete: '/groups/delete',
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
    add: '/waiters/add',
    edit: '/waiters/edit',
    delete: '/waiters/delete',
    list: '/waiters/list',
  },
  // 用户相关接口
  user: {
    login: '/users/login',
  },
}

export default API_PATH