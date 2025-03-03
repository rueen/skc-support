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
 * 平台渠道
 */
export const Channel = {
  DOUYIN: 'douyin',   // 抖音
  KUAISHOU: 'kuaishou', // 快手
  XIAOHONGSHU: 'xiaohongshu', // 小红书
  WEIBO: 'weibo'      // 微博
}

/**
 * 平台渠道文本
 */
export const ChannelText = {
  [Channel.DOUYIN]: '抖音',
  [Channel.KUAISHOU]: '快手',
  [Channel.XIAOHONGSHU]: '小红书',
  [Channel.WEIBO]: '微博'
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
 * 获取多语言文本的工具函数
 * @param {Object} langConfig 多语言配置对象
 * @param {string} key 枚举值
 * @param {string} lang 语言代码
 * @returns {string} 对应语言的文本
 */
export const getLangText = (langConfig, key, lang = 'zh-CN') => {
  return langConfig[key]?.[lang] || key
}

/**
 * 达人领域
 */
export const CreatorCategory = {
  FOOD: 'food',           // 美食
  FASHION: 'fashion',     // 时尚
  TRAVEL: 'travel',       // 旅游
  EDUCATION: 'education', // 教育
  LIFESTYLE: 'lifestyle', // 生活方式
  BEAUTY: 'beauty',       // 美妆
  PARENTING: 'parenting', // 亲子
  SPORTS: 'sports',       // 运动健身
  TECH: 'tech',          // 数码科技
  FINANCE: 'finance'      // 金融理财
}

/**
 * 达人领域多语言配置
 */
export const CreatorCategoryLang = {
  [CreatorCategory.FOOD]: {
    'zh-CN': '美食',
    'en-US': 'Food'
  },
  [CreatorCategory.FASHION]: {
    'zh-CN': '时尚',
    'en-US': 'Fashion'
  },
  [CreatorCategory.TRAVEL]: {
    'zh-CN': '旅游',
    'en-US': 'Travel'
  },
  [CreatorCategory.EDUCATION]: {
    'zh-CN': '教育',
    'en-US': 'Education'
  },
  [CreatorCategory.LIFESTYLE]: {
    'zh-CN': '生活方式',
    'en-US': 'Lifestyle'
  },
  [CreatorCategory.BEAUTY]: {
    'zh-CN': '美妆',
    'en-US': 'Beauty'
  },
  [CreatorCategory.PARENTING]: {
    'zh-CN': '亲子',
    'en-US': 'Parenting'
  },
  [CreatorCategory.SPORTS]: {
    'zh-CN': '运动健身',
    'en-US': 'Sports'
  },
  [CreatorCategory.TECH]: {
    'zh-CN': '数码科技',
    'en-US': 'Tech'
  },
  [CreatorCategory.FINANCE]: {
    'zh-CN': '金融理财',
    'en-US': 'Finance'
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