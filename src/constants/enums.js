/**
 * 任务状态
 */
export const TaskStatus = {
  NOT_STARTED: 'not_started', // 未开始
  PROCESSING: 'processing',   // 进行中
  ENDED: 'ended'             // 已结束
}

/**
 * 任务状态多语言配置
 */
export const TaskStatusLang = {
  [TaskStatus.NOT_STARTED]: {
    'zh-CN': '未开始',
    'en-US': 'Not Started'
  },
  [TaskStatus.PROCESSING]: {
    'zh-CN': '进行中',
    'en-US': 'Processing'
  },
  [TaskStatus.ENDED]: {
    'zh-CN': '已结束',
    'en-US': 'Ended'
  }
}

/**
 * 任务状态颜色
 */
export const TaskStatusColor = {
  [TaskStatus.NOT_STARTED]: 'default',
  [TaskStatus.PROCESSING]: 'processing',
  [TaskStatus.ENDED]: 'success'
}

/**
 * 任务类型
 */
export const TaskType = {
  IMAGE_TEXT: 'image_text', // 图文
  VIDEO: 'video'           // 视频
}

/**
 * 任务类型多语言配置
 */
export const TaskTypeLang = {
  [TaskType.IMAGE_TEXT]: {
    'zh-CN': '图文',
    'en-US': 'Image & Text'
  },
  [TaskType.VIDEO]: {
    'zh-CN': '视频',
    'en-US': 'Video'
  }
}

/**
 * 任务审核状态
 */
export const TaskAuditStatus = {
  PENDING: 'pending',   // 待审核
  APPROVED: 'approved', // 已通过
  REJECTED: 'rejected'  // 已拒绝
}

/**
 * 任务审核状态多语言配置
 */
export const TaskAuditStatusLang = {
  [TaskAuditStatus.PENDING]: {
    'zh-CN': '待审核',
    'en-US': 'Pending'
  },
  [TaskAuditStatus.APPROVED]: {
    'zh-CN': '已通过',
    'en-US': 'Approved'
  },
  [TaskAuditStatus.REJECTED]: {
    'zh-CN': '已拒绝',
    'en-US': 'Rejected'
  }
}

/**
 * 任务审核状态颜色
 */
export const TaskAuditStatusColor = {
  [TaskAuditStatus.PENDING]: 'warning',
  [TaskAuditStatus.APPROVED]: 'success',
  [TaskAuditStatus.REJECTED]: 'error'
}

/**
 * 账号审核状态
 */
export const AccountAuditStatus = {
  PENDING: 'pending',   // 待审核
  APPROVED: 'approved', // 已通过
  REJECTED: 'rejected'  // 已拒绝
}

/**
 * 账号审核状态多语言配置
 */
export const AccountAuditStatusLang = {
  [AccountAuditStatus.PENDING]: {
    'zh-CN': '待审核',
    'en-US': 'Pending'
  },
  [AccountAuditStatus.APPROVED]: {
    'zh-CN': '已通过',
    'en-US': 'Approved'
  },
  [AccountAuditStatus.REJECTED]: {
    'zh-CN': '已拒绝',
    'en-US': 'Rejected'
  }
}

/**
 * 账号审核状态颜色
 */
export const AccountAuditStatusColor = {
  [AccountAuditStatus.PENDING]: 'warning',
  [AccountAuditStatus.APPROVED]: 'success',
  [AccountAuditStatus.REJECTED]: 'error'
}

/**
 * 提现状态
 */
export const WithdrawalStatus = {
  PENDING: 'pending',     // 待处理
  SUCCESS: 'success',     // 打款成功
  FAILED: 'failed'        // 打款失败
}

/**
 * 提现状态多语言配置
 */
export const WithdrawalStatusLang = {
  [WithdrawalStatus.PENDING]: {
    'zh-CN': '待处理',
    'en-US': 'Pending'
  },
  [WithdrawalStatus.SUCCESS]: {
    'zh-CN': '打款成功',
    'en-US': 'Success'
  },
  [WithdrawalStatus.FAILED]: {
    'zh-CN': '打款失败',
    'en-US': 'Failed'
  }
}

/**
 * 提现状态颜色
 */
export const WithdrawalStatusColor = {
  [WithdrawalStatus.PENDING]: 'warning',
  [WithdrawalStatus.SUCCESS]: 'success',
  [WithdrawalStatus.FAILED]: 'error'
}

/**
 * 账单类型
 */
export const BillType = {
  WITHDRAWAL: 'withdrawal',         // 提现
  TASK_INCOME: 'task_income',      // 任务收益
  INVITE_REWARD: 'invite_reward',  // 邀请奖励
  GROUP_REWARD: 'group_reward'     // 群主奖励
}

/**
 * 账单类型多语言配置
 */
export const BillTypeLang = {
  [BillType.WITHDRAWAL]: {
    'zh-CN': '提现',
    'en-US': 'Withdrawal'
  },
  [BillType.TASK_INCOME]: {
    'zh-CN': '任务收益',
    'en-US': 'Task Income'
  },
  [BillType.INVITE_REWARD]: {
    'zh-CN': '邀请奖励',
    'en-US': 'Invite Reward'
  },
  [BillType.GROUP_REWARD]: {
    'zh-CN': '群主奖励',
    'en-US': 'Group Owner Reward'
  }
}

/**
 * 职业类型
 */
export const OccupationType = {
  HOUSEWIFE: 'housewife',    // 宝妈
  FREELANCER: 'freelancer',  // 自由职业
  STUDENT: 'student'         // 学生
}

/**
 * 职业类型多语言配置
 */
export const OccupationTypeLang = {
  [OccupationType.HOUSEWIFE]: {
    'zh-CN': '宝妈',
    'en-US': 'Housewife'
  },
  [OccupationType.FREELANCER]: {
    'zh-CN': '自由职业',
    'en-US': 'Freelancer'
  },
  [OccupationType.STUDENT]: {
    'zh-CN': '学生',
    'en-US': 'Student'
  }
}

/**
 * 结算状态枚举
 */
export const SettlementStatus = {
  SETTLED: 'settled',
  FAILED: 'failed'
}

/**
 * 结算状态多语言
 */
export const SettlementStatusLang = {
  [SettlementStatus.SETTLED]: {
    zh: '已结算',
    en: 'Settled'
  },
  [SettlementStatus.FAILED]: {
    zh: '结算失败',
    en: 'Failed'
  }
}

/**
 * 获取多语言文本的工具函数
 * @param {Object} langConfig 多语言配置对象
 * @param {string} key 枚举值
 * @param {string} lang 语言代码
 * @returns {string} 对应语言的文本
 */
export const getLangText = (langConfig, key, lang = 'zh-CN') => {
  return langConfig[key]?.[lang] || key
}