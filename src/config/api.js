/*
 * @Author: diaochan
 * @Date: 2025-03-09 16:07:50
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-09 16:08:38
 * @Description: API 路径配置
 */
const API_PATH = {
  // 任务相关接口
  task: {
    list: '/tasks/list',
  },
  // 账号管理相关接口
  account: {
    add: '/accounts/add',
    edit: '/accounts/edit',
    delete: '/accounts/delete',
    list: '/accounts/list',
  },
  // 用户相关接口
  user: {
    login: '/users/login',
  },
}

export default API_PATH