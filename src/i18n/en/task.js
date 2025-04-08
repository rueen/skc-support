/*
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-09 07:35:25
 * @Description: 
 */
export default {
  // Task list page
  list: {
    name: 'Task Name',
    status: 'Task Status',
    quota: 'Quota / Submitted',
    time: 'Task Time',
    action: 'Actions',
    create: 'Create Task',
    edit: 'Edit',
    delete: 'Delete',
    deleteConfirm: 'Are you sure to delete this task?',
    unlimited: 'Unlimited'
  },
  // Search form
  search: {
    taskName: 'Task Name',
    channelId: 'Channel',
    taskStatus: 'Task Status',
    taskNamePlaceholder: 'Enter task name',
    channelPlaceholder: 'Select channel',
    statusPlaceholder: 'Select task status'
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
    customFields: 'Submission Fields',
    fieldTitle: 'Field Title',
    fieldTitlePlaceholder: 'Enter field title',
    fieldType: {
      input: 'Input',
      image: 'Upload Image'
    },
    deleteField: 'Delete',
    addField: 'Add Field',
    contentRequirement: 'Content Requirements',
    contentRequirementPlaceholder: 'Enter content requirements',
    taskInfo: 'Task Information',
    taskInfoPlaceholder: 'Enter task information',
    notice: 'Notice',
    noticePlaceholder: 'Enter notice',
    defaultNotice: `1. Please complete the publication and submit the link as soon as possible.
2. After the task ends, it cannot be filled out and cannot be settled.
3. If the published content does not meet the requirements, it will not pass the audit.
4. Submitting links that cannot be accessed or other irrelevant links will be considered as giving up settlement.`,
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
      fieldTitleRequired: 'Please enter field title'
    },
    // Operation tips
    submitSuccess: 'Submit successful',
    submitFailed: 'Submit failed',
    loadGroupFailed: 'Failed to load group list'
  }
} 