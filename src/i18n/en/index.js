/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:22:30
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 11:10:07
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
import group from './group'
import withdrawal from './withdrawal'
import financial from './financial'

export default {
  common,
  login,
  menu,
  task,
  submittedTasks,
  account,
  member,
  channel,
  group,
  withdrawal,
  financial,
  header: {
    logout: 'Logout',
    switchLang: 'Switch Language'
  },
  app: {
    title: 'SKC Seeding'
  }
} 