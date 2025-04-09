/*
 * @Author: diaochan
 * @Date: 2025-02-28 17:08:54
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 10:27:34
 * @Description: 
 */
import common from './common'
import login from './login'
import menu from './menu'
import task from './task'
import submittedTasks from './submitted-tasks'
import account from './account'
import member from './member'
import channel from './channel'

export default {
  common,
  login,
  menu,
  task,
  submittedTasks,
  account,
  member,
  channel,
  header: {
    logout: '退出登录',
    switchLang: '切换语言'
  },
  app: {
    title: 'SKC种草'
  }
} 