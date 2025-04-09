/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:22:30
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 09:53:35
 * @Description: 
 */
import common from './common'
import login from './login'
import menu from './menu'
import task from './task'
import submittedTasks from './submitted-tasks'
import account from './account'
import member from './member'

export default {
  common,
  login,
  menu,
  task,
  submittedTasks,
  account,
  member,
  header: {
    logout: 'Logout',
    switchLang: 'Switch Language'
  },
  app: {
    title: 'SKC Seeding'
  }
} 