/*
 * @Author: diaochan
 * @Date: 2025-02-28 17:08:54
 * @LastEditors: diaochan
 * @LastEditTime: 2025-07-21 16:26:05
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
import ad from './ad'
import messages from './messages'
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
  ad,
  messages,
  systemConfig,
  header: {
    logout: '退出登录',
    switchLang: '切换语言'
  },
  app: {
    title: 'SKC种草'
  }
} 