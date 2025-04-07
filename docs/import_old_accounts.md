# FB老账号数据导入接口使用说明

## 概述

本文档描述了如何使用管理后台的FB老账号导入接口，该接口用于批量导入Facebook老账号数据，并建立与系统会员的关联关系。

## 接口信息

- **请求地址**：`POST /api/admin/old-accounts-fb/import`
- **请求方式**：POST
- **权限要求**：需要`account:list`权限
- **Content-Type**：`multipart/form-data`

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
|-------|------|---------|------|
| file | File | 是 | Excel文件，必须包含指定格式的数据 |

## Excel文件格式要求

上传的Excel文件必须符合以下格式：

1. 文件格式支持：`.xlsx`或`.xls`
2. 第一行为表头，必须包含以下字段：
   - `uid`：FB账户标识（必填）
   - `nickname`：FB昵称（必填）
   - `homeUrl`或`home_url`：FB主页链接（可选）

示例Excel内容：

| uid | nickname | homeUrl |
|-----|----------|---------|
| 100001234567 | 张三 | https://www.facebook.com/profile.php?id=100001234567 |
| 100009876543 | 李四 | https://www.facebook.com/profile.php?id=100009876543 |

## 响应结果

### 成功响应

```json
{
  "code": 200,
  "message": "导入成功: 总计100条数据，成功导入95条，跳过5条(已关联会员的记录)",
  "data": {
    "total": 100,
    "imported": 95,
    "skipped": 5
  }
}
```

### 错误响应

#### 文件格式错误

```json
{
  "code": 400,
  "message": "请上传Excel文件",
  "data": null
}
```

#### 文件内容错误

```json
{
  "code": 400,
  "message": "第2行: FB账户(uid)不能为空\n第3行: FB昵称(nickname)不能为空",
  "data": null
}
```

#### 服务器错误

```json
{
  "code": 500,
  "message": "导入FB老账号失败",
  "data": null
}
```

## 业务规则说明

1. 导入时会覆盖所有**未关联会员**的老账号数据
2. 已关联会员的FB老账号记录将被保留，不会被覆盖或删除
3. 同一个UID不能重复导入
4. 会员账号关联FB老账号后，该会员将不再被标记为新人

## 接口调用示例

### 使用Axios调用（前端JavaScript）

```javascript
import axios from 'axios';

// 创建FormData对象
const formData = new FormData();
formData.append('file', excelFile); // excelFile是从文件选择器获取的File对象

// 发送请求
axios.post('/api/admin/old-accounts-fb/import', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
.then(response => {
  console.log('导入成功', response.data);
})
.catch(error => {
  console.error('导入失败', error.response?.data || error.message);
});
```

### 使用jQuery调用

```javascript
// 假设有一个表单和文件输入元素
$('#importForm').on('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('file', $('#excelFile')[0].files[0]);
  
  $.ajax({
    url: '/api/admin/old-accounts-fb/import',
    type: 'POST',
    data: formData,
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN_HERE'
    },
    contentType: false,
    processData: false,
    success: function(response) {
      alert('导入成功：' + response.message);
    },
    error: function(xhr) {
      alert('导入失败：' + (xhr.responseJSON?.message || '服务器错误'));
    }
  });
});
```

## 注意事项

1. 上传的Excel文件大小不宜过大，建议单次导入数据不超过5000条
2. 导入过程可能需要一定时间，请耐心等待响应
3. 导入成功后，用户可以通过FB老账号列表接口查看导入结果
4. 请确保Excel文件中的UID格式正确，一般为纯数字格式
5. 如需修改已关联会员的FB老账号信息，请使用更新接口 