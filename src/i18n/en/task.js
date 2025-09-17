/*
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-09-17 09:40:53
 * @Description: 
 */
export default {
  selectTask: {
    title: 'Select Task',
    selectedCount: 'Selected {count} tasks',
    selectedTask: 'Selected task: {name}'
  },
  selectTaskGroup: {
    title: 'Select Task Group',
    selectedCount: 'Selected {count} task groups',
    selectedTaskGroup: 'Selected task group: {name}'
  },
  // Task list page
  list: {
    name: 'Task Name',
    status: 'Task Status',
    quota: 'Quota / Submitted',
    startTime: 'Start Time',
    endTime: 'End Time',
    createTime: 'Create Time',
    action: 'Actions',
    create: 'Create Task',
    edit: 'Edit',
    copy: 'Copy',
    delete: 'Delete',
    deleteConfirm: 'Are you sure to delete this task?',
    unlimited: 'Unlimited'
  },
  // Search form
  search: {
    taskName: 'Task Name',
    taskGroupName: 'Task Group Name',
    channelId: 'Channel',
    taskStatus: 'Task Status',
    taskGroup: 'Task Group',
  },
  // Detail/Edit page
  detail: {
    createTitle: 'Create Task',
    editTitle: 'Edit Task',
    taskName: 'Task Name',
    taskNamePlaceholder: 'Enter task name',
    channelId: 'Platform Channel',
    channelPlaceholder: 'Select platform channel',
    category: 'Creator Category',
    categoryPlaceholder: 'Enter creator category',
    taskType: 'Task Type',
    taskTypePlaceholder: 'Select task type',
    reward: 'Task Reward',
    rewardPlaceholder: 'Enter task reward',
    fansRequired: 'Fans Requirement',
    fansRequiredPlaceholder: 'Enter fans requirement',
    taskTime: 'Task Time',
    startTime: 'Start Time',
    endTime: 'End Time',
    specifyGroup: 'Specify Groups',
    noSpecify: 'No specification',
    specifyGroups: 'Specify groups',
    groupPlaceholder: 'Select groups',
    groupTip: 'Members of all groups can take this task',
    userRange: 'User Range',
    allUsers: 'All Users',
    taskCompletionCount: 'Task Completion Count',
    countPlaceholder: 'Enter count',
    times: 'times',
    countTip: 'Example:<br/>0: New members who have never completed tasks can participate<br/>2: Members who have completed 0/1/2 tasks can participate<br/>5: Members who have completed 0/1/2/3/4/5 tasks can participate',
    quota: 'Task Quota',
    quotaPlaceholder: 'Enter task quota',
    unlimited: 'Unlimited',
    brand: 'Brand',
    brandPlaceholder: 'Enter brand name',
    keywords: 'Brand Keywords',
    addKeywords: 'Add Keywords',
    customFields: 'Submission Fields',
    fieldTitle: 'Field Title',
    fieldTitlePlaceholder: 'Enter field title',
    fieldType: {
      input: 'Input',
      post: 'Post Link',
      group: 'Group Share Link',
      image: 'Upload Image'
    },
    addField: 'Add Field',
    contentRequirement: 'Content Requirements',
    contentRequirementPlaceholder: 'Enter content requirements',
    taskInfo: 'Task Information',
    taskInfoPlaceholder: 'Enter task information',
    notice: 'Notice',
    noticePlaceholder: 'Enter notice',
    // Form validation
    validation: {
      taskNameRequired: 'Please enter task name',
      channelRequired: 'Please select platform channel',
      categoryRequired: 'Please enter creator category',
      taskTypeRequired: 'Please select task type',
      rewardRequired: 'Please enter task reward',
      fansRequired: 'Please enter fans requirement',
      startTimeRequired: 'Please select start time',
      endTimeRequired: 'Please select end time',
      groupRequired: 'Please select groups',
      taskCountRequired: 'Please enter task completion count',
      fieldTitleRequired: 'Please enter field title',
      keywordsTextRequired: 'Please enter keywords',
      keywordsRatioRequired: 'Please enter keywords ratio',
      keywordsRatioSumRequired: 'Please enter keywords ratio sum to 100'
    },
    loadGroupFailed: 'Failed to load group list'
  },
  group: {
    name: 'Task Group Name',
    statistics: 'Registered / Completed',
    relatedTasks: 'Related Tasks',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    create: 'Create Task Group',
    editTitle: 'Edit Task Group',
    createTitle: 'Create Task Group',
    reward: 'Reward Amount',
    relatedTask: 'Related Task',
    selectTaskBtnText: 'Select task (selected {name})',
    validation: {
      taskGroupNameRequired: 'Please fill up task group name',
      taskGroupRewardRequired: 'Please fill up task group reward',
      relatedTaskRequired: 'Please select related task'
    }
  }
} 