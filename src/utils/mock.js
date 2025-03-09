/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:30:15
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-09 11:47:37
 * @Description: 模拟数据工具
 */

import config from '@/config/env';

// 模拟数据映射
const mockData = {
  // 任务相关接口
  'task.list': () => {
    return {
      code: 0,
      success: true,
      message: '成功',
      data: {},
    };
  },
  'task.detail': (params) => {
    return {
      code: 0,
      success: true,
      message: '成功',
      data: {},
    };
  },
  
  // 用户相关接口
  'user.login': (params) => {
    const { username, password } = params;
    if (username === 'admin' && password === '123456') {
      return {
        code: 0,
        success: true,
        message: '登录成功',
        data: {
          token: 'mock_token_123456',
          username: 'admin',
          permissions: [
            'task:list',
            'task:create',
            'task:detail',
            'task:edit',
            'task:view',
            'task:audit',
            'task:auditDetail',
            'account:audit',
            'member:list',
            'member:create',
            'member:edit',
            'member:view',
            'group:list',
            'account:list',
            'article:list',
            'settlement:withdrawal',
            'settlement:otherBills',
            'channel:list'
          ],
        },
      };
    }
    return {
      code: 401,
      success: false,
      message: '用户名或密码错误',
      data: null,
    };
  },
};

/**
 * 模拟 API 请求
 * @param {String} apiName - API 名称，格式为 "模块.接口"，例如 "task.list"
 * @param {Object} params - 请求参数
 * @return {Promise} - 返回模拟数据
 */
export const mockRequest = (apiName, params = {}) => {
  return new Promise((resolve) => {
    // 如果未启用模拟数据，则直接返回错误
    if (!config.mock.enable) {
      resolve({
        code: 500,
        message: '模拟数据未启用',
        data: null,
      });
      return;
    }
    
    // 获取模拟数据处理函数
    const mockFn = mockData[apiName];
    
    // 如果模拟数据处理函数不存在，则返回错误
    if (!mockFn) {
      console.error(`模拟数据 ${apiName} 不存在`);
      resolve({
        code: 404,
        message: `接口 ${apiName} 不存在`,
        data: null,
      });
      return;
    }
    
    // 模拟网络延迟
    setTimeout(() => {
      try {
        // 调用模拟数据处理函数
        const result = mockFn(params);
        resolve(result);
      } catch (err) {
        console.error(`模拟数据处理出错: ${err.message}`);
        resolve({
          code: 500,
          message: '服务器内部错误',
          data: null,
        });
      }
    }, config.mock.delay);
  });
};

export default {
  mockRequest,
}; 