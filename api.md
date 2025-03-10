# SKC Support API 文档

## 目录
- [基础信息](#基础信息)
- [通用说明](#通用说明)
- [API 列表](#api-列表)
  - [任务管理](#任务管理)
  - [已提交管理](#已提交管理)
  - [账号管理](#账号管理)
  - [会员管理](#会员管理)
  - [渠道管理](#渠道管理)
  - [群管理](#群管理)
  - [结算管理](#结算管理)
  - [小二管理](#小二管理)
  - [用户管理](#用户管理)
  - [文章管理](#文章管理)

## 基础信息

### 环境说明
- 开发环境：`http://localhost:3000/api`
- 生产环境：`https://api.example.com/api`

### 通用响应格式
```json
{
  "code": 0,         // 状态码，0 表示成功
  "success": true,   // 是否成功
  "message": "",     // 提示信息
  "data": {}        // 响应数据
}
```

### 认证方式
所有接口（除登录接口外）都需要在请求头中携带 token：
```
Authorization: Bearer <token>
```

## API 列表

### 任务管理

#### 获取任务列表
- **接口**：`GET /tasks/list`
- **描述**：获取任务列表，支持分页和筛选
- **请求参数**：
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "taskName": "",      // 任务名称（可选）
    "taskStatus": "",    // 任务状态（可选）
    "channelId": null    // 渠道ID（可选）
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "taskName": "测试任务1",
          "channelId": 1,
          "channelName": "facebook",
          "taskStatus": "not_started",
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 创建任务
- **接口**：`POST /tasks/add`
- **描述**：创建新任务
- **请求参数**：
  ```json
  {
    "taskName": "任务名称",
    "channelId": 1,
    "category": "宝妈",
    "taskType": "image_text",
    "reward": 100,
    "brand": "品牌名称",
    "groupIds": [],
    "groupMode": 0,
    "userRange": 1,
    "customFields": [
      {
        "title": "帖子链接",
        "type": "input"
      },
      {
        "title": "数据截图",
        "type": "image"
      }
    ],
    "startTime": "2025-03-10 09:10:10",
    "endTime": "2025-03-13 09:10:10",
    "unlimitedQuota": true,
    "fansRequired": "10w+",
    "contentRequirement": "要求说明",
    "taskInfo": "任务说明",
    "notice": "温馨提示"
  }
  ```

#### 编辑任务
- **接口**：`PUT /tasks/edit`
- **描述**：编辑已有任务
- **请求参数**：与创建任务相同，需要额外传入 `id` 字段

#### 删除任务
- **接口**：`DELETE /tasks/delete`
- **描述**：删除任务
- **请求参数**：
  ```json
  {
    "id": 1  // 任务ID
  }
  ```

#### 获取任务详情
- **接口**：`GET /tasks/detail`
- **描述**：获取任务详细信息
- **请求参数**：
  ```json
  {
    "id": 1  // 任务ID
  }
  ```

#### 导出任务
- **接口**：`GET /tasks/export`
- **描述**：导出任务数据
- **请求参数**：支持与任务列表相同的筛选条件

### 已提交管理

#### 获取已提交列表
- **接口**：`GET /taskSubmitted/list`
- **描述**：获取已提交列表
- **请求参数**：支持分页和筛选
- **请求参数**：
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "taskName": "",      // 任务名称（可选）
    "taskAuditStatus": "",   // 任务审核状态 （可选）
    "channelId": null,   // 渠道ID（可选）
    "groupId": null      // 所属群组
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "taskName": "测试任务1",
          "channelId": 1,
          "channelName": "",
          "memberNickname": "测试会员1",
          "groupName": "群组1",
          "isGroupOwner": true,
          "reward": 100,
          "taskAuditStatus": "pending",
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 获取已提交详情
- **接口**：`GET /taskSubmitted/detail`
- **描述**：获取已提交详情
- **请求参数**：
  ```json
  {
    "id": 1   // 已提交ID
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "relatedTaskId": 1,                  // 关联任务ID
      "relatedMemberId": 1,                // 关联会员ID
      "taskAuditStatus": "pending",            // 审核状态
      "applyTime": '2025-03-10 09:10:10',  // 报名时间
      "submitTime": '2025-03-10 09:10:10', // 提交时间
      "rejectReason": "",                  // 拒绝原因
      "createdAt": "2024-03-01 10:00:00",
      "updatedAt": "2024-03-01 10:00:00"
    }
  }
  ```

#### 批量通过
- **接口**：`POST /taskSubmitted/batchResolve`
- **描述**：批量通过已提交的任务

#### 批量拒绝
- **接口**：`POST /taskSubmitted/batchReject`
- **描述**：批量拒绝已提交的任务

### 账号管理

#### 获取账号列表
- **接口**：`GET /accounts/list`
- **描述**：获取账号列表
- **请求参数**：支持分页和筛选
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "account": "",       // 账号（可选）
    "channelId": 1,      // 渠道ID（可选）
    "accountAuditStatus": "",   // 账号审核状态
    "groupId": 1         // 所属群ID
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "account": "test123",
          "channelId": 1,
          "channelName": "抖音",
          "homeUrl": "https://example.com/test123",
          "fansCount": 1000,
          "friendsCount": 100,
          "postsCount": 50,
          "memberNickname": "测试会员1",
          "groupName": "群组1",
          "isGroupOwner": true,
          "accountAuditStatus": "pending",
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 批量通过
- **接口**：`POST /account/batchResolve`
- **描述**：批量审核通过账号

#### 批量拒绝
- **接口**：`POST /account/batchReject`
- **描述**：批量审核拒绝账号

### 会员管理

#### 获取会员列表
- **接口**：`GET /members/list`
- **描述**：获取会员列表
- **请求参数**：支持分页和筛选
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "memberNickname": "",      // 会员名称（可选）
    "groupId": "",    // 所属群组（可选）
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "memberNickname": "张三", // 会员昵称
          "memberAccount": "test123", // 会员账号
          "groupId": 1,
          "groupName": "群组1",
          "isGroupOwner": true,
          "accountList": [
            {
              "account": "test123",
              "homeUrl": "https://example.com/test123",
            },
            {
              "account": "test123",
              "homeUrl": "https://example.com/test123",
            },
          ],
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 添加会员
- **接口**：`POST /members/add`
- **描述**：添加新会员
- **请求参数**：
  ```json
  {
    "memberNickname": "",           // 会员名称
    "memberAccount": "",      // 会员账号
    "groupId": 1,    // 所属群组ID
    "inviterId": 1,  // 邀请人ID
    "occupation": "student",  // 职业
    "isGroupOwner": false, // 是否是群主
  }
  ```

#### 编辑会员
- **接口**：`PUT /members/edit`
- **描述**：编辑会员信息
- **请求参数**：与添加会员相同，需要额外传入 `id` 字段

#### 删除会员
- **接口**：`DELETE /members/delete`
- **描述**：删除会员

#### 获取会员详情
- **接口**：`GET /members/detail`
- **描述**：获取会员详情
- **请求参数**：
  ```json
  {
    "id": 1    // 会员ID
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "id": 1,
      "memberNickname": "",           // 会员名称
      "memberAccount": "",      // 会员账号
      "groupId": 1,    // 所属群组ID
      "groupName": "群组1",
      "inviterId": 1,  // 邀请人ID
      "inviterName": "李四",
      "occupation": "student",  // 职业
      "isGroupOwner": false, // 是否是群主
      "inviteCode": "ABC123",
      "inviteUrl": "https://example.com/invite/ABC123",
    }
  }
  ```

### 渠道管理

#### 获取渠道列表
- **接口**：`GET /channels/list`
- **描述**：获取渠道列表
- **请求参数**：支持分页
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "keyword": "",      // 搜索关键字（可选）
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "name": "facebook", 
          "icon": "http://abc",
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 添加渠道
- **接口**：`POST /channels/add`
- **描述**：添加新渠道
- **请求参数**：
  ```json
  {
    "name": "facebook", 
    "icon": "http://abc",
  }
  ```

#### 编辑渠道
- **接口**：`PUT /channels/edit`
- **描述**：编辑渠道信息
- **请求参数**：与添加新渠道相同，需要额外传入 `id` 字段

#### 删除渠道
- **接口**：`DELETE /channels/delete`
- **描述**：删除渠道

### 群管理

#### 群列表
- **接口**：`GET /group/list`
- **描述**：获取群列表
- **请求参数**：支持分页和筛选
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "groupName": "",      // 群名称（可选）
    "ownerId": "",    // 群主ID（可选）
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "groupName": "测试群1",
          "groupLink": "https://example.com/group/group001",
          "ownerId": 1,
          "ownerName": "张三",
          "memberCount": 100,
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 添加群
- **接口**：`POST /group/add`
- **描述**：添加新渠道
- **请求参数**：
  ```json
  {
    "groupName": "",     // 群名称
    "groupLink": "http://abc",   // 群链接
    "ownerId": 1    // 群主ID
  }
  ```

#### 编辑群
- **接口**：`PUT /group/edit`
- **描述**：编辑群信息
- **请求参数**：与添加群相同，需要额外传入 `id` 字段

#### 删除群
- **接口**：`DELETE /group/delete`
- **描述**：删除群

### 结算管理

#### 提现管理
- **接口**：`GET /settlement/withdrawal`
- **描述**：获取提现记录列表
- **请求参数**：支持分页和筛选
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "memberNickname": "",      // 会员名称（可选）
    "withdrawalStatus": "",    // 提现状态（可选）
    "startTime": null,    // 开始时间（可选）
    "endTime": null       // 结束时间
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "memberNickname": "张三",
          "memberAccount": "13800138000",
          "withdrawalAccount": "6222021234567890123",
          "withdrawalAccountType": "bank",
          "amount": 1000.00,
          "realName": "张三",
          "withdrawalStatus": "pending",
          "applyTime": "2024-02-28 10:00:00",
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 批量通过提现
- **接口**：`POST /settlement/withdrawal/batchResolve`
- **描述**：批量通过提现申请

#### 批量拒绝提现
- **接口**：`POST /settlement/withdrawal/batchReject`
- **描述**：批量拒绝提现申请

#### 导出提现记录
- **接口**：`GET /settlement/withdrawal/export`
- **描述**：导出提现记录
- **请求参数**：支持与提现列表相同的筛选条件

#### 其他账单
- **接口**：`GET /settlement/otherBills`
- **描述**：获取其他账单记录
- **请求参数**：支持分页和筛选
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "memberNickname": "",      // 会员名称（可选）
    "billType": "",    // 账单类型（可选）
    "settlementStatus": "",    // 结算状态（可选）
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "memberNickname": "张三",
          "memberAccount": "13800138000",
          "billType": "task_income",
          "amount": 100.00,
          "settlementStatus": "settled",
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

### 小二管理

#### 获取小二列表
- **接口**：`GET /waiters/list`
- **描述**：获取小二列表
- **请求参数**：支持分页
  ```json
  {
    "page": 1,           // 页码
    "pageSize": 10,      // 每页条数
    "keyword": "",      // 搜索关键字（可选）
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "total": 100,
      "list": [
        {
          "id": 1,
          "username": "admin",
          "isAdmin": true,
          "remarks": "管理员",
          "permissions": "",  // 权限
          "createdAt": "2024-03-01 10:00:00",
          "updatedAt": "2024-03-01 10:00:00"
        }
      ],
      "page": 1,
      "pageSize": 10
    }
  }
  ```

#### 添加小二
- **接口**：`POST /waiters/add`
- **描述**：添加新小二
- **请求参数**：
  ```json
  {
    "username": "",     // 用户名
    "password": "",   // 密码
    "remarks": "",    // 备注
    "permissions": ""   // 权限
  }
  ```

#### 编辑小二
- **接口**：`PUT /waiters/edit`
- **描述**：编辑小二信息
- **请求参数**：与添加小二相同，需要额外传入 `id` 字段

#### 删除小二
- **接口**：`DELETE /waiters/delete`
- **描述**：删除小二

### 用户管理

#### 用户登录
- **接口**：`POST /users/login`
- **描述**：用户登录
- **请求参数**：
  ```json
  {
    "username": "用户名",
    "password": "密码"
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "登录成功",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### 文章管理

#### 获取文章
- **接口**：`GET /articles/get`
- **描述**：获取文章内容
- **请求参数**：
  ```json
  {
    "location": "userAgreement"
  }
  ```
- **响应示例**：
  ```json
  {
    "code": 0,
    "success": true,
    "message": "",
    "data": {
      "id": 1,
      "title": "用户协议",
      "content": "这是用户协议的内容...",
      "location": "userAgreement",
      "createdAt": "2024-02-28 10:00:00",
      "updatedAt": "2024-02-28 10:00:00",
    }
  }
  ```

#### 编辑文章
- **接口**：`PUT /articles/edit`
- **描述**：编辑文章内容
- **请求参数**：
  ```json
  {
    "id": 1,
    "title": "用户协议",
    "content": "这是用户协议的内容...",
    "location": "userAgreement",
  }
  ```

## 优化建议

1. **错误处理**：
   - 建议为所有接口添加详细的错误码和错误信息定义
   - 实现统一的错误处理机制

2. **接口版本控制**：
   - 建议在 URL 中添加版本号，如 `/api/v1/tasks/list`
   - 便于后续API升级和维护

3. **数据验证**：
   - 建议添加请求参数的数据验证
   - 对敏感数据进行加密处理

4. **接口限流**：
   - 建议添加接口访问频率限制
   - 防止恶意请求和服务器过载

5. **数据缓存**：
   - 对于频繁访问的数据（如配置信息）添加缓存机制
   - 提高接口响应速度

6. **文档更新**：
   - 建议使用 Swagger 等工具自动生成和维护API文档
   - 保持文档的实时更新

7. **安全性**：
   - 建议使用 HTTPS
   - 实现更完善的认证机制（如 OAuth2.0）
   - 添加 CSRF 防护 