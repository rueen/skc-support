/**
 * 枚举接口实现示例 (Node.js + Express)
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 枚举定义
const enums = {
  // 任务状态枚举
  TaskStatus: {
    NOT_STARTED: 'not_started',
    PROCESSING: 'processing',
    ENDED: 'ended'
  },
  
  // 任务状态多语言配置
  TaskStatusLang: {
    'not_started': {
      'zh-CN': '未开始',
      'en-US': 'Not Started'
    },
    'processing': {
      'zh-CN': '进行中',
      'en-US': 'Processing'
    },
    'ended': {
      'zh-CN': '已结束',
      'en-US': 'Ended'
    }
  },
  
  // 任务类型枚举
  TaskType: {
    IMAGE_TEXT: 'image_text',
    VIDEO: 'video'
  },
  
  // 任务类型多语言配置
  TaskTypeLang: {
    'image_text': {
      'zh-CN': '图文',
      'en-US': 'Image & Text'
    },
    'video': {
      'zh-CN': '视频',
      'en-US': 'Video'
    }
  },
  
  // 任务审核状态枚举
  TaskAuditStatus: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
  },
  
  // 任务审核状态多语言配置
  TaskAuditStatusLang: {
    'pending': {
      'zh-CN': '待审核',
      'en-US': 'Pending'
    },
    'approved': {
      'zh-CN': '已通过',
      'en-US': 'Approved'
    },
    'rejected': {
      'zh-CN': '已拒绝',
      'en-US': 'Rejected'
    }
  },
  
  // 其他枚举...
};

/**
 * 获取枚举常量接口
 * GET /api/enums/:enumType
 */
app.get('/api/enums/:enumType', (req, res) => {
  const { enumType } = req.params;
  const lang = req.query.lang || 'zh-CN';
  
  // 检查枚举类型是否存在
  if (!enums[enumType]) {
    return res.status(400).json({
      code: 400,
      message: '枚举类型不存在'
    });
  }
  
  // 获取枚举值
  const enumValues = enums[enumType];
  
  // 获取对应的语言配置
  const langConfig = enums[`${enumType}Lang`];
  
  // 如果没有语言配置，直接返回枚举值
  if (!langConfig) {
    return res.json({
      code: 0,
      message: 'success',
      data: enumValues
    });
  }
  
  // 构建返回数据，包含枚举值和对应的语言文本
  const result = {};
  
  Object.keys(enumValues).forEach(key => {
    const value = enumValues[key];
    result[key] = {
      value,
      text: langConfig[value]?.[lang] || value
    };
  });
  
  res.json({
    code: 0,
    message: 'success',
    data: result
  });
});

/**
 * 获取所有枚举常量接口
 * GET /api/enums
 */
app.get('/api/enums', (req, res) => {
  const lang = req.query.lang || 'zh-CN';
  const result = {};
  
  // 遍历所有枚举类型
  Object.keys(enums).forEach(key => {
    // 只处理非语言配置的枚举
    if (!key.endsWith('Lang')) {
      const enumValues = enums[key];
      const langConfig = enums[`${key}Lang`];
      
      if (!langConfig) {
        result[key] = enumValues;
        return;
      }
      
      // 构建带有语言文本的枚举数据
      const enumData = {};
      Object.keys(enumValues).forEach(enumKey => {
        const value = enumValues[enumKey];
        enumData[enumKey] = {
          value,
          text: langConfig[value]?.[lang] || value
        };
      });
      
      result[key] = enumData;
    }
  });
  
  res.json({
    code: 0,
    message: 'success',
    data: result
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`枚举接口服务已启动，监听端口: ${PORT}`);
  console.log(`访问示例: http://localhost:${PORT}/api/enums/TaskStatus?lang=zh-CN`);
});

/**
 * 使用示例:
 * 
 * 1. 获取特定枚举:
 *    GET http://localhost:3000/api/enums/TaskStatus?lang=zh-CN
 * 
 * 2. 获取所有枚举:
 *    GET http://localhost:3000/api/enums?lang=zh-CN
 */ 