# 任务列表导出功能 - 后端实现要求

## 接口说明

### 导出任务列表

- **接口路径**：`/tasks/export`
- **请求方法**：`GET`
- **接口描述**：导出任务列表数据为Excel文件

### 请求参数

支持与任务列表查询相同的筛选条件：

```json
{
  "taskName": "",      // 任务名称（可选）
  "channelId": null,   // 渠道ID（可选）
  "taskStatus": ""     // 任务状态（可选）
}
```

### 响应要求

1. **响应格式**：二进制文件流（Excel文件）
2. **Content-Type**：`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
3. **Content-Disposition**：`attachment; filename=任务列表.xlsx`

### 响应头示例

```
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename=任务列表.xlsx
```

### 错误处理

如果导出过程中发生错误，应返回标准的JSON错误响应：

```json
{
  "code": 500,
  "message": "导出失败，原因：xxx"
}
```

## 实现要点

1. **文件格式**：导出的Excel文件应包含与前端任务列表表格相同的列，包括：
   - 任务名称
   - 平台渠道
   - 任务状态
   - 创建时间
   - 其他相关字段

2. **中文支持**：确保导出的Excel文件正确支持中文字符，避免乱码问题。

3. **大数据量处理**：
   - 如果数据量较大，建议在服务端进行分页处理，避免一次性加载过多数据导致内存溢出
   - 可以设置一个合理的最大导出记录数（如10000条）

4. **文件命名**：
   - 默认文件名可以包含导出日期，例如：`任务列表_2025-03-13.xlsx`
   - 文件名需要进行URL编码，确保特殊字符不会导致下载问题

5. **权限控制**：
   - 确保只有有权限的用户才能导出数据
   - 可以在导出API中添加权限验证逻辑

## 示例代码（伪代码）

```java
@GetMapping("/tasks/export")
public void exportTasks(HttpServletResponse response,
                        @RequestParam(required = false) String taskName,
                        @RequestParam(required = false) Integer channelId,
                        @RequestParam(required = false) String taskStatus) {
    try {
        // 设置响应头
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        String filename = URLEncoder.encode("任务列表.xlsx", "UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=" + filename);
        
        // 查询数据
        List<Task> tasks = taskService.findTasksForExport(taskName, channelId, taskStatus);
        
        // 创建Excel文件
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("任务列表");
        
        // 创建表头
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("任务名称");
        headerRow.createCell(1).setCellValue("平台渠道");
        headerRow.createCell(2).setCellValue("任务状态");
        headerRow.createCell(3).setCellValue("创建时间");
        
        // 填充数据
        int rowNum = 1;
        for (Task task : tasks) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(task.getTaskName());
            row.createCell(1).setCellValue(task.getChannelName());
            row.createCell(2).setCellValue(task.getTaskStatus());
            row.createCell(3).setCellValue(task.getCreateTime());
        }
        
        // 写入响应流
        workbook.write(response.getOutputStream());
        workbook.close();
    } catch (Exception e) {
        // 处理异常
        response.reset();
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        
        Map<String, Object> errorMap = new HashMap<>();
        errorMap.put("code", 500);
        errorMap.put("message", "导出失败：" + e.getMessage());
        
        response.getWriter().println(new ObjectMapper().writeValueAsString(errorMap));
    }
}
```

## 注意事项

1. 导出功能可能会消耗较多服务器资源，建议添加适当的限流措施。
2. 对于大型数据集，可以考虑使用异步导出方式，先生成文件再提供下载链接。
3. 确保导出的数据符合数据保护和隐私法规要求。 