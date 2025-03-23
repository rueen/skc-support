# 任务报名（登记） API 文档

任务报名（登记）表：
表名：enrolled_tasks
字段：任务ID(task_id)、会员ID(member_id)、报名时间(enroll_time)

## API

### h5端报名任务
- **接口**：`POST /api/h5/tasks-enroll`
- **描述**：h5端会员报名任务
- **请求参数**：
  ```json
  {
    "taskId": 1, // 任务ID
  }
  ```

### h5端获取已报名任务
- **接口**：`GET /api/h5/tasks-enrolled`
- **描述**：h5端获取已报名任务列表
- **请求参数**：支持分页
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "taskId": 1, // 任务ID
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
          "taskId": 1,
          "member_id": 1,
          "enroll_time": '2025-01-01 12:12:12'
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```