/*
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 15:38:53
 * @Description: 
 */
export default {
  // 任务列表页面
  list: {
    name: '任务名称',
    status: '任务状态',
    quota: '任务名额 / 已提交',
    time: '任务时间',
    action: '操作',
    create: '新建任务',
    edit: '编辑',
    delete: '删除',
    deleteConfirm: '确定要删除该任务吗？',
    unlimited: '不限制'
  },
  // 搜索表单
  search: {
    taskName: '任务名称',
    channelId: '平台渠道',
    taskStatus: '任务状态',
    taskNamePlaceholder: '请输入任务名称',
    channelPlaceholder: '请选择平台渠道',
    statusPlaceholder: '请选择任务状态'
  },
  // 详情/编辑页面
  detail: {
    createTitle: '新建任务',
    editTitle: '编辑任务',
    taskName: '任务名称',
    taskNamePlaceholder: '请输入任务名称',
    channelId: '平台渠道',
    channelPlaceholder: '请选择平台渠道',
    category: '达人领域',
    categoryPlaceholder: '请输入达人领域',
    taskType: '任务类型',
    taskTypePlaceholder: '请选择任务类型',
    reward: '任务奖励',
    rewardPlaceholder: '请输入任务奖励',
    fansRequired: '粉丝要求',
    fansRequiredPlaceholder: '请输入粉丝要求',
    taskTime: '任务时间',
    startTime: '开始时间',
    endTime: '结束时间',
    specifyGroup: '指定群组',
    noSpecify: '不指定',
    specifyGroups: '指定群组',
    groupPlaceholder: '请选择群组',
    groupTip: '所有群组的会员都可以接取该任务',
    userRange: '用户范围',
    allUsers: '全部用户',
    taskCompletionCount: '完成任务次数',
    countPlaceholder: '请输入次数',
    times: '次',
    countTip: '举例：<br/>0：表示新人即从未完成过任务的会员可显示并参与<br/>2：表示仅完成过0次/1次/2次的会员可显示并参与<br/>5：表示完成过0/1/2/3/4/5次任务的会员可显示并参与',
    quota: '任务名额',
    quotaPlaceholder: '请输入任务名额',
    unlimited: '不限制',
    brand: '品牌',
    brandPlaceholder: '请输入品牌名称',
    customFields: '提交信息字段',
    fieldTitle: '字段标题',
    fieldTitlePlaceholder: '请输入字段标题',
    fieldType: {
      input: '输入框',
      image: '上传图片'
    },
    deleteField: '删除',
    addField: '添加字段',
    contentRequirement: '作品要求',
    contentRequirementPlaceholder: '请输入作品要求',
    taskInfo: '任务信息',
    taskInfoPlaceholder: '请输入任务信息',
    notice: '温馨提示',
    noticePlaceholder: '请输入温馨提示',
    // 表单验证
    validation: {
      taskNameRequired: '请输入任务名称',
      channelRequired: '请选择平台渠道',
      categoryRequired: '请输入达人领域',
      taskTypeRequired: '请选择任务类型',
      rewardRequired: '请输入任务奖励',
      fansRequired: '请输入粉丝要求',
      startTimeRequired: '请选择开始时间',
      endTimeRequired: '请选择结束时间',
      groupRequired: '请选择指定群组',
      taskCountRequired: '请输入完成任务次数',
      fieldTitleRequired: '请输入字段标题'
    },
    // 操作提示
    submitSuccess: '提交成功',
    submitFailed: '提交失败',
    loadGroupFailed: '获取群组列表失败'
  }
} 