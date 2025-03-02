import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layouts/Layout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/task',
    children: [
      {
        path: 'task',
        component: () => import('@/views/task/list.vue'),
        name: 'TaskList',
        meta: { title: '任务管理' }
      },
      {
        path: 'task/create',
        component: () => import('@/views/task/form.vue'),
        name: 'TaskCreate',
        meta: { title: '新增任务', hidden: true }
      },
      {
        path: 'task/edit/:id',
        component: () => import('@/views/task/form.vue'),
        name: 'TaskEdit',
        meta: { title: '编辑任务', hidden: true }
      },
      {
        path: 'task/view/:id',
        component: () => import('@/views/task/form.vue'),
        name: 'TaskView',
        meta: { title: '任务详情', hidden: true }
      },
      {
        path: 'task-audit',
        name: 'TaskAudit',
        component: () => import('@/views/task-audit/list.vue'),
        meta: { title: '任务审核', icon: 'audit', permission: ['task.audit'] }
      },
      {
        path: 'account-audit',
        name: 'AccountAudit',
        component: () => import('@/views/account-audit/list.vue'),
        meta: { title: '任务审核', icon: 'audit', permission: ['task.audit'] }
      },
      {
        path: 'member',
        component: () => import('@/views/member/list.vue'),
        name: 'MemberList',
        meta: { title: '会员管理' }
      },
      {
        path: 'member/create',
        component: () => import('@/views/member/form.vue'),
        name: 'MemberCreate',
        meta: { title: '新增会员', hidden: true }
      },
      {
        path: 'member/edit/:id',
        component: () => import('@/views/member/form.vue'),
        name: 'MemberEdit',
        meta: { title: '编辑会员', hidden: true }
      },
      {
        path: 'member/view/:id',
        component: () => import('@/views/member/detail.vue'),
        name: 'MemberView',
        meta: { title: '会员详情', hidden: true }
      },
      {
        path: 'group',
        component: () => import('@/views/group/index.vue'),
        name: 'Group',
        meta: { title: '群组管理' }
      },
      {
        path: 'account',
        component: () => import('@/views/account/index.vue'),
        name: 'Account',
        meta: { title: '账号管理' }
      },
      {
        path: 'article',
        component: () => import('@/views/article/index.vue'),
        name: 'Article',
        meta: { title: '文章管理' }
      },
      {
        path: 'settlement/withdrawal',
        component: () => import('@/views/settlement/withdrawal.vue'),
        name: 'Withdrawal',
        meta: { title: '提现账单' }
      },
      {
        path: 'settlement/other',
        component: () => import('@/views/settlement/other.vue'),
        name: 'Other',
        meta: { title: '其他账单' }
      },
      {
        path: 'channel',
        name: 'Channel',
        component: () => import('@/views/channel/index.vue'),
        meta: { title: '渠道管理', icon: 'link', permission: ['channel.view'] }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!userStore.roles.length) {
        try {
          await userStore.getUserInfo()
          next({ ...to, replace: true })
        } catch (error) {
          userStore.logout()
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router 