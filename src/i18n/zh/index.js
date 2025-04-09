/*
 * @Author: diaochan
 * @Date: 2025-02-28 17:08:54
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 09:08:15
 * @Description: 
 */
import common from './common'
import login from './login'
import menu from './menu'
import task from './task'
import submittedTasks from './submitted-tasks'
import account from './account'

export default {
  common,
  login,
  menu,
  task,
  submittedTasks,
  account,
  header: {
    logout: '退出登录',
    switchLang: '切换语言'
  },
  app: {
    title: 'SKC种草'
  }
} 