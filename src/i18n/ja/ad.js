/*
 * @Author: diaochan
 * @Date: 2025-04-09 11:35:16
 * @LastEditors: diaochan
 * @LastEditTime: 2025-09-01 19:41:16
 * @Description: 
 */
export default {
  add: '広告追加',
  title: '広告タイトル',
  location: '広告場所',
  status: '広告ステータス',
  detail: {
    createTitle: '広告作成',
    editTitle: '広告編集',
    title: '広告タイトル',
    location: '広告場所',
    adTime: '有効時間',
    startTime: '開始時間',
    endTime: '終了時間',
    adImage: '広告画像',
    link: 'リンク',
    linkType: {
      none: 'なし',
      article: '記事',
      task: 'タスク',
      taskGroup: 'タスクグループ',
      externalLinks: '外部リンク',
    },
    selectTaskBtnText1: 'タスク選択',
    selectTaskBtnText: 'タスク選択 (選択済み {name})',
    selectArticleBtnText1: '記事選択',
    selectArticleBtnText: '記事選択 (選択済み {name})',
    selectTaskGroupBtnText1: 'タスクグループ選択',
    selectTaskGroupBtnText: 'タスクグループ選択 (選択済み {name})',
    specifyGroup: '指定グループ',
    noSpecify: '指定なし',
    groupTip: 'すべてのグループのメンバーがこの広告を表示できます',
    validation: {
      titleRequired: '広告タイトルを入力してください',
      locationRequired: '広告場所を選択してください',
      startTimeRequired: '開始時間を選択してください',
      endTimeRequired: '終了時間を選択してください',
      adImageRequired: '広告画像をアップロードしてください',
      groupRequired: 'グループを選択してください',
    }
  }
}