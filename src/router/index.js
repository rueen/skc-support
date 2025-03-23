import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
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
        meta: { requiresAuth: true, permissions: ['task:list'], title: '任务管理' }
      },
      {
        path: 'task/create',
        component: () => import('@/views/task/detail.vue'),
        name: 'TaskCreate',
        meta: { requiresAuth: true, permissions: ['task:create'], title: '新增任务', hidden: true }
      },
      {
        path: 'task/edit/:id',
        component: () => import('@/views/task/detail.vue'),
        name: 'TaskEdit',
        meta: { requiresAuth: true, permissions: ['task:edit'], title: '编辑任务', hidden: true }
      },
      {
        path: 'task-submitted',
        name: 'TaskSubmitted',
        component: () => import('@/views/task-submitted/list.vue'),
        meta: { requiresAuth: true, permissions: ['task:submitted'], title: '任务审核', permission: ['task.audit'] }
      },
      {
        path: 'task-submitted/detail/:id',
        name: 'TaskSubmittedDetail',
        component: () => import('@/views/task-submitted/detail.vue'),
        meta: { requiresAuth: true, permissions: ['task:submittedDetail'], title: '任务审核详情', hidden: true }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/account/list.vue'),
        meta: { requiresAuth: true, permissions: ['account:list'], title: '账号审核', permission: ['account.list'] }
      },
      {
        path: 'member',
        component: () => import('@/views/member/list.vue'),
        name: 'MemberList',
        meta: { requiresAuth: true, permissions: ['member:list'], title: '会员管理' }
      },
      {
        path: 'member/create',
        component: () => import('@/views/member/detail.vue'),
        name: 'MemberCreate',
        meta: { requiresAuth: true, permissions: ['member:create'], title: '新增会员', hidden: true }
      },
      {
        path: 'member/edit/:id',
        component: () => import('@/views/member/detail.vue'),
        name: 'MemberEdit',
        meta: { requiresAuth: true, permissions: ['member:edit'], title: '编辑会员', hidden: true }
      },
      {
        path: 'member/view/:id',
        component: () => import('@/views/member/view.vue'),
        name: 'MemberView',
        meta: { requiresAuth: true, permissions: ['member:view'], title: '会员详情', hidden: true }
      },
      {
        path: 'group',
        component: () => import('@/views/group/index.vue'),
        name: 'Group',
        meta: { requiresAuth: true, permissions: ['group:list'], title: '群组管理' }
      },
      {
        path: 'waiter',
        component: () => import('@/views/waiter/index.vue'),
        name: 'Waiter',
        meta: { requiresAuth: true, permissions: ['waiter:list'], title: '小二管理' }
      },
      {
        path: 'article',
        component: () => import('@/views/article/index.vue'),
        name: 'Article',
        meta: { requiresAuth: true, permissions: ['article:list'], title: '文章管理' }
      },
      {
        path: 'withdrawal',
        component: () => import('@/views/settlement/withdrawal.vue'),
        name: 'Withdrawal',
        meta: { requiresAuth: true, permissions: ['settlement:withdrawal'], title: '提现账单' }
      },
      {
        path: 'otherBills',
        component: () => import('@/views/settlement/other.vue'),
        name: 'OtherBills',
        meta: { requiresAuth: true, permissions: ['settlement:otherBills'], title: '其他账单' }
      },
      {
        path: 'channel',
        name: 'Channel',
        component: () => import('@/views/channel/index.vue'),
        meta: { requiresAuth: true, permissions: ['channel:list'], title: '渠道管理' }
      },
      {
        path: 'system/config',
        name: 'SystemConfig',
        component: () => import('@/views/system/config.vue'),
        meta: { requiresAuth: true, permissions: ['system:config'], title: '系统配置' }
      }
    ]
  },
  {
    path: '/403',
    component: () => import('@/views/403.vue'),
    meta: { requiresAuth: false, title: '无权限' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  const token = userStore.token
  // 如果页面需要认证
  if (to.meta.requiresAuth) {
    // 如果没有 token，重定向到登录页
    if (!token) {
      next({ path: '/login', query: { redirect: to.fullPath } });
      return;
    }

    // 检查页面权限
    if (to.meta.permissions) {
      const hasPermission = userStore.hasPermissions(to.meta.permissions);
      if (!hasPermission) {
        next({ path: '/403' });
        return;
      }
    }
    
    next();
  } else {
    // 如果页面不需要认证
    next();
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router 