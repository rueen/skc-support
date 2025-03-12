/*
 * @Author: diaochan
 * @Date: 2025-03-09 16:07:50
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-12 19:40:51
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
  // 已提交任务相关接口
  taskSubmitted: {
    list: '/taskSubmitted/list',
    detail: '/taskSubmitted/detail',
    batchResolve: '/taskSubmitted/batchResolve',
    batchReject: '/taskSubmitted/batchReject',
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
    list: '/channels',
    add: '/channels',
    edit: '/channels/:id',
    delete: '/channels/:id',
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
    list: '/waiters',
    add: '/waiters',
    edit: '/waiters/:id',
    delete: '/waiters/:id',
  },
  // 用户相关接口
  user: {
    login: '/users/login',
  },
  // 文章相关接口
  article: {
    list: '/articles',
    add: '/articles',
    edit: '/articles/:id',
    delete: '/articles/:id',
  },
}

export default API_PATH