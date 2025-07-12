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
      // 任务
      {
        path: 'task',
        component: () => import('@/views/taskManagement/task/list.vue'),
        name: 'TaskList',
        meta: { requiresAuth: true, permissions: ['task:list'], title: '任务' }
      },
      {
        path: 'task/create',
        component: () => import('@/views/taskManagement/task/detail.vue'),
        name: 'TaskCreate',
        meta: { requiresAuth: true, permissions: ['task:create'], title: '新增任务', hidden: true }
      },
      {
        path: 'task/edit/:id',
        component: () => import('@/views/taskManagement/task/detail.vue'),
        name: 'TaskEdit',
        meta: { requiresAuth: true, permissions: ['task:edit'], title: '编辑任务', hidden: true }
      },
      // 任务组
      {
        path: 'taskGroup',
        component: () => import('@/views/taskManagement/group/list.vue'),
        name: 'TaskGroup',
        meta: { requiresAuth: true, permissions: ['task:group'], title: '任务组' }
      },
      {
        path: 'taskGroup/create',
        component: () => import('@/views/taskManagement/group/detail.vue'),
        name: 'TaskGroupCreate',
        meta: { requiresAuth: true, permissions: ['task:group'], title: '新增任务组', hidden: true }
      },
      {
        path: 'taskGroup/edit/:id',
        component: () => import('@/views/taskManagement/group/detail.vue'),
        name: 'TaskGroupEdit',
        meta: { requiresAuth: true, permissions: ['task:group'], title: '编辑任务组', hidden: true }
      },
      {
        path: 'pre-audit-tasks',
        name: 'PreAuditTasks',
        component: () => import('@/views/submitted-tasks/pre-audit-list.vue'),
        meta: { requiresAuth: true, permissions: ['task:preAudit'], title: '任务初审' }
      },
      {
        path: 'confirm-audit-tasks',
        name: 'ConfirmAuditTasks',
        component: () => import('@/views/submitted-tasks/confirm-audit-list.vue'),
        meta: { requiresAuth: true, permissions: ['task:confirmAudit'], title: '任务复审' }
      },
      {
        path: 'submitted-tasks/detail/:id',
        name: 'TaskSubmittedDetail',
        component: () => import('@/views/submitted-tasks/detail.vue'),
        meta: { requiresAuth: true, permissions: ['task:submittedDetail'], title: '任务审核详情', hidden: true }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/account/list.vue'),
        meta: { requiresAuth: true, permissions: ['account:list'], title: '账号审核' }
      },
      {
        path: 'account/edit/:id',
        component: () => import('@/views/account/detail.vue'),
        name: 'AccountEdit',
        meta: { requiresAuth: true, permissions: ['account:list'], title: '编辑账号', hidden: true }
      },
      {
        path: 'account/old',
        name: 'AccountOld',
        component: () => import('@/views/account/old-list.vue'),
        meta: { requiresAuth: true, permissions: ['account:list'], title: '老账号管理' }
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
        component: () => import('@/views/finance/withdrawal.vue'),
        name: 'Withdrawal',
        meta: { requiresAuth: true, permissions: ['finance:withdrawal'], title: '提现账单' }
      },
      {
        path: 'payment-transactions',
        component: () => import('@/views/finance/payment-transactions.vue'),
        name: 'PaymentTransactions',
        meta: { requiresAuth: true, permissions: ['finance:withdrawal'], title: '交易记录' }
      },
      {
        path: 'bills',
        component: () => import('@/views/finance/bills.vue'),
        name: 'bills',
        meta: { requiresAuth: true, permissions: ['finance:bills'], title: '其他账单' }
      },
      {
        path: 'payment-channels',
        name: 'PaymentChannels',
        component: () => import('@/views/finance/payment-channels.vue'),
        meta: { requiresAuth: true, permissions: ['finance:paymentChannels'], title: '支付渠道' }
      },
      {
        path: 'channel',
        name: 'Channel',
        component: () => import('@/views/channel/index.vue'),
        meta: { requiresAuth: true, permissions: ['channel:list'], title: '渠道管理' }
      },
      {
        path: 'systemConfig',
        name: 'systemConfig',
        component: () => import('@/views/systemConfig/index.vue'),
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