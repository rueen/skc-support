export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/task',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/task/list',
    meta: { title: '任务管理', icon: 'profile' },
    children: [
      {
        path: 'list',
        name: 'TaskList',
        component: () => import('@/views/task/list.vue'),
        meta: { title: '任务列表', permission: ['task.view'] }
      },
      {
        path: 'audit',
        name: 'TaskAudit',
        component: () => import('@/views/task/audit.vue'),
        meta: { title: '任务审核', permission: ['task.audit'] }
      },
      {
        path: 'create',
        name: 'TaskCreate',
        component: () => import('@/views/task/form.vue'),
        meta: { title: '创建任务', permission: ['task.create'], hidden: true }
      },
      {
        path: 'edit/:id',
        name: 'TaskEdit',
        component: () => import('@/views/task/form.vue'),
        meta: { title: '编辑任务', permission: ['task.edit'], hidden: true }
      }
    ]
  },
  {
    path: '/account-audit',
    component: () => import('@/layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        name: 'AccountAudit',
        component: () => import('@/views/account-audit/index.vue'),
        meta: { title: '账号审核', icon: 'audit', permission: ['account.audit'] }
      }
    ]
  },
  {
    path: '/member',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/member/list',
    meta: { title: '会员管理', icon: 'team' },
    children: [
      {
        path: 'list',
        name: 'MemberList',
        component: () => import('@/views/member/list.vue'),
        meta: { title: '会员列表', permission: ['member.view'] }
      },
      {
        path: 'create',
        name: 'MemberCreate',
        component: () => import('@/views/member/form.vue'),
        meta: { title: '创建会员', permission: ['member.create'], hidden: true }
      },
      {
        path: 'edit/:id',
        name: 'MemberEdit',
        component: () => import('@/views/member/form.vue'),
        meta: { title: '编辑会员', permission: ['member.edit'], hidden: true }
      }
    ]
  }
] 