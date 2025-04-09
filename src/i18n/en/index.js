/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:22:30
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 11:41:52
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
import waiter from './waiter'
import article from './article'
import systemConfig from './systemConfig'

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
  waiter,
  article,
  systemConfig,
  header: {
    logout: 'Logout',
    switchLang: 'Switch Language'
  },
  app: {
    title: 'SKC Seeding'
  }
} 