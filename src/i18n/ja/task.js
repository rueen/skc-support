/*
 * @Author: diaochan
 * @Date: 2025-03-02 19:26:47
 * @LastEditors: diaochan
 * @LastEditTime: 2025-08-10 16:44:47
 * @Description: 
 */
export default {
  selectTask: {
    title: 'タスク選択',
    selectedCount: '{count}個のタスクを選択',
    selectedTask: '選択されたタスク: {name}'
  },
  selectTaskGroup: {
    title: 'タスクグループ選択',
    selectedCount: '{count}個のタスクグループを選択',
    selectedTaskGroup: '選択されたタスクグループ: {name}'
  },
  // Task list page
  list: {
    name: 'タスク名',
    status: 'タスクステータス',
    quota: 'クォータ / 提出済み',
    startTime: '開始時間',
    endTime: '終了時間',
    createTime: '作成時間',
    action: '操作',
    create: 'タスク作成',
    edit: '編集',
    copy: 'コピー',
    delete: '削除',
    deleteConfirm: 'このタスクを削除してもよろしいですか？',
    unlimited: '無制限'
  },
  // Search form
  search: {
    taskName: 'タスク名',
    taskGroupName: 'タスクグループ名',
    channelId: 'チャンネル',
    taskStatus: 'タスクステータス',
    taskGroup: 'タスクグループ',
  },
  // Detail/Edit page
  detail: {
    createTitle: 'タスク作成',
    editTitle: 'タスク編集',
    taskName: 'タスク名',
    taskNamePlaceholder: 'タスク名を入力',
    channelId: 'プラットフォームチャンネル',
    channelPlaceholder: 'プラットフォームチャンネルを選択',
    category: 'クリエイターカテゴリ',
    categoryPlaceholder: 'クリエイターカテゴリを入力',
    taskType: 'タスクタイプ',
    taskTypePlaceholder: 'タスクタイプを選択',
    reward: 'タスク報酬',
    rewardPlaceholder: 'タスク報酬を入力',
    fansRequired: 'フォロワー要件',
    fansRequiredPlaceholder: 'フォロワー要件を入力',
    taskTime: 'タスク時間',
    startTime: '開始時間',
    endTime: '終了時間',
    specifyGroup: 'グループ指定',
    noSpecify: '指定なし',
    specifyGroups: 'グループ指定',
    groupPlaceholder: 'グループを選択',
    groupTip: 'すべてのグループのメンバーがこのタスクを実行できます',
    userRange: 'ユーザー範囲',
    allUsers: 'すべてのユーザー',
    taskCompletionCount: 'タスク完了回数',
    countPlaceholder: '回数を入力',
    times: '回',
    countTip: '例:<br/>0: タスクを完了したことがない新規メンバーが参加可能<br/>2: 0/1/2回タスクを完了したメンバーが参加可能<br/>5: 0/1/2/3/4/5回タスクを完了したメンバーが参加可能',
    quota: 'タスククォータ',
    quotaPlaceholder: 'タスククォータを入力',
    unlimited: '無制限',
    brand: 'ブランド',
    brandPlaceholder: 'ブランド名を入力',
    customFields: '提出フィールド',
    fieldTitle: 'フィールドタイトル',
    fieldTitlePlaceholder: 'フィールドタイトルを入力',
    fieldType: {
      input: '入力',
      post: '投稿リンク',
      group: 'グループシェアリンク',
      image: '画像アップロード'
    },
    deleteField: '削除',
    addField: 'フィールド追加',
    contentRequirement: 'コンテンツ要件',
    contentRequirementPlaceholder: 'コンテンツ要件を入力',
    taskInfo: 'タスク情報',
    taskInfoPlaceholder: 'タスク情報を入力',
    notice: 'お知らせ',
    noticePlaceholder: 'お知らせを入力',
    // Form validation
    validation: {
      taskNameRequired: 'タスク名を入力してください',
      channelRequired: 'プラットフォームチャンネルを選択してください',
      categoryRequired: 'クリエイターカテゴリを入力してください',
      taskTypeRequired: 'タスクタイプを選択してください',
      rewardRequired: 'タスク報酬を入力してください',
      fansRequired: 'フォロワー要件を入力してください',
      startTimeRequired: '開始時間を選択してください',
      endTimeRequired: '終了時間を選択してください',
      groupRequired: 'グループを選択してください',
      taskCountRequired: 'タスク完了回数を入力してください',
      fieldTitleRequired: 'フィールドタイトルを入力してください'
    },
    loadGroupFailed: 'グループリストの読み込みに失敗しました'
  },
  group: {
    name: 'タスクグループ名',
    statistics: '登録済み / 完了済み',
    relatedTasks: '関連タスク',
    createTime: '作成時間',
    updateTime: '更新時間',
    create: 'タスクグループ作成',
    editTitle: 'タスクグループ編集',
    createTitle: 'タスクグループ作成',
    reward: '報酬金額',
    relatedTask: '関連タスク',
    selectTaskBtnText: 'タスク選択 (選択済み {name})',
    validation: {
      taskGroupNameRequired: 'タスクグループ名を入力してください',
      taskGroupRewardRequired: 'タスクグループ報酬を入力してください',
      relatedTaskRequired: '関連タスクを選択してください'
    }
  }
}