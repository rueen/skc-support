/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:22:30
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 10:27:24
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
    logout: 'Logout',
    switchLang: 'Switch Language'
  },
  app: {
    title: 'SKC Seeding'
  }
} 