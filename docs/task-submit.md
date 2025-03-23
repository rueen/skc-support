<!--
 * @Author: diaochan
 * @Date: 2025-03-23 14:52:21
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-23 15:59:56
 * @Description: 
-->
# 提交任务文档

### 已提交任务表
- 表名：submitted_tasks
- 字段：任务ID(task_id)、会员ID(member_id)、提交时间(submit_time)、提交内容(submit_content)、任务审核状态(task_audit_status)、审核员(waiter_id)、拒绝原因(reject_reason)

## API

### h5端提交任务
- **接口**：`POST /api/h5/task-submit`
- **描述**：h5端会员提交任务
- **请求参数**：
  ```json
  {
    "taskId": 1, // 任务ID
    "submitContent": {   // submitContent 的内容不需要做格式校验，作为一个整体保存即可
      "customFields": [
        {"type":"input","title":"帖子链接","value":"http://www.123.com"},
        {"type":"input","title":"分享链接","value":"http://www.456.com"},
        {"type":"image","title":"数据截图","value":[
          {"url":"http://localhost:3001/uploads/1742713863478-216151030.jpg"},
          {"url":"http://localhost:3001/uploads/1742713867524-652782099.jpg"},
          {"url":"http://localhost:3001/uploads/1742713871186-366966105.jpg"}
          ]
        }
      ]
    }
  }
  ```

### support端获取已提交任务
- **接口**：`GET /api/support/submitted-tasks`
- **描述**：support端获取已提交列表
- **请求参数**：支持分页和筛选
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "taskName": "任务名称",  // 任务名称
    "channelId": 1, // 渠道ID
    "taskAuditStatus": "pending", // 任务审核状态
    "groupId": 1,  // 会员所属群组ID
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "taskId": 1, // 任务ID
          "taskName": "",  // 任务名称
          "channelId": 1,  // 渠道ID
          "channelName": "",  // 渠道名称
          "channelIcon": "",  // 渠道icon
          "memberId": 1,  // 会员ID
          "memberNickname": "测试会员1",  // 会员名称
          "groupId": 1,  // 会员所属群组ID
          "groupName": "群组1",  // 会员所属群组名称
          "isGroupOwner": true,  // 会员在该群组中是否是群主
          "reward": 100,  // 任务奖励
          "taskAuditStatus": "pending",  // 审核状态
          "waiterId": null, // 审核员
          "rejectReason": null  // 拒绝原因
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### support端批量审核通过
- **接口**：`POST /api/support/submitted-tasks/batch-resolve`
- **描述**：support端批量审核通过
- **请求参数**：
  ```json
  {
    "ids": [1,2,3]
  }
  ```

### support端批量审核拒绝
- **接口**：`POST /api/support/submitted-tasks/batch-reject`
- **描述**：support端批量审核拒绝
- **请求参数**：
  ```json
  {
    "ids": [1,2,3],
    "reason": "拒绝原因"  // 拒绝原因 必填
  }
  ```

### h5端查看已提交详情
- **接口**：`GET /api/h5/submitted-tasks/:id`
- **描述**：h5端查看已提交详情
- **响应示例**：
  ```json
  {
    "taskId": 1, // 任务ID
    "submitContent": {},
    "taskAuditStatus": "pending",  // 审核状态
    "rejectReason": null  // 拒绝原因
  }
  ```

