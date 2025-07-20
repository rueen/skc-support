/*
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-07-17 16:25:01
 * @Description: 
 */
export default {
  selectTask: {
    title: '選擇任務',
    selectedCount: '已選擇 {count} 個任務',
    selectedTask: '已選擇任務：{name}'
  },
  // 任务列表页面
  list: {
    name: '任務名稱',
    status: '任務狀態',
    quota: '任務名額 / 已提交',
    startTime: '開始時間',
    endTime: '結束時間',
    createTime: '創建時間',
    action: '操作',
    create: '新建任務',
    edit: '編輯',
    delete: '刪除',
    deleteConfirm: '確定要刪除該任務嗎？',
    unlimited: '不限制'
  },
  // 搜索表单
  search: {
    taskName: '任務名稱',
    taskGroupName: '任務組名稱',
    channelId: '平台渠道',
    taskStatus: '任務狀態',
    taskGroup: '任務組',
  },
  // 详情/编辑页面
  detail: {
    createTitle: '新建任務',
    editTitle: '編輯任務',
    taskName: '任務名稱',
    taskNamePlaceholder: '請輸入任務名稱',
    channelId: '平台渠道',
    channelPlaceholder: '請選擇平台渠道',
    category: '達人領域',
    categoryPlaceholder: '請輸入達人領域',
    taskType: '任務類型',
    taskTypePlaceholder: '請選擇任務類型',
    reward: '任務獎勵',
    rewardPlaceholder: '請輸入任務獎勵',
    fansRequired: '粉絲要求',
    fansRequiredPlaceholder: '請輸入粉絲要求',
    taskTime: '任務時間',
    startTime: '開始時間',
    endTime: '結束時間',
    specifyGroup: '指定群組',
    noSpecify: '不指定',
    specifyGroups: '指定群組',
    groupPlaceholder: '請選擇群組',
    groupTip: '所有群組的會員都可以接取該任務',
    userRange: '用戶範圍',
    allUsers: '全部用戶',
    taskCompletionCount: '完成任務次數',
    countPlaceholder: '請輸入次數',
    times: '次',
    countTip: '舉例：<br/>0：表示新人即從未完成過任務的會員可顯示並參與<br/>2：表示僅完成過0次/1次/2次的會員可顯示並參與<br/>5：表示完成過0/1/2/3/4/5次任務的會員可顯示並參與',
    quota: '任務名額',
    quotaPlaceholder: '請輸入任務名額',
    unlimited: '不限制',
    brand: '品牌',
    brandPlaceholder: '請輸入品牌名稱',
    customFields: '提交信息字段',
    fieldTitle: '字段標題',
    fieldTitlePlaceholder: '請輸入字段標題',
    fieldType: {
      input: '輸入框',
      post: '帖子連結',
      group: '群分享連結',
      image: '上傳圖片'
    },
    deleteField: '刪除',
    addField: '添加字段',
    contentRequirement: '作品要求',
    contentRequirementPlaceholder: '請輸入作品要求',
    taskInfo: '任務信息',
    taskInfoPlaceholder: '請輸入任務信息',
    notice: '溫馨提示',
    noticePlaceholder: '請輸入溫馨提示',
    // 表单验证
    validation: {
      taskNameRequired: '請輸入任務名稱',
      channelRequired: '請選擇平台渠道',
      categoryRequired: '請輸入達人領域',
      taskTypeRequired: '請選擇任務類型',
      rewardRequired: '請輸入任務獎勵',
      fansRequired: '請輸入粉絲要求',
      startTimeRequired: '請選擇開始時間',
      endTimeRequired: '請選擇結束時間',
      groupRequired: '請選擇指定群組',
      taskCountRequired: '請輸入完成任務次數',
      fieldTitleRequired: '請輸入字段標題'
    },
    loadGroupFailed: '獲取群組列表失敗'
  },
  group: {
    name: '任務組名稱',
    statistics: '已報名/已完成',
    relatedTasks: '關聯任務',
    createTime: '創建時間',
    updateTime: '更新時間',
    create: '新建任務組',
    editTitle: '編輯任務組',
    createTitle: '新建任務組',
    reward: '獎勵金額',
    relatedTask: '關聯任務',
    selectTaskBtnText: '選擇任務(已選 {count})',
    validation: {
      taskGroupNameRequired: '請輸入任務組名稱',
      taskGroupRewardRequired: '請輸入任務組獎勵',
      relatedTaskRequired: '請選擇關聯任務'
    }
  }
} 