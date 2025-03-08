/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:30:15
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-08 21:31:29
 * @Description: 模拟数据工具
 */

import config from '@/config/env';

// 模拟任务数据
const mockTasks = [
  {
    id: '1',
    title: '完成前端页面设计',
    description: '根据设计稿完成所有页面的 HTML 和 CSS 实现',
    status: 'completed',
    priority: 'high',
    created_at: '2025-02-15T08:00:00Z',
    updated_at: '2025-02-20T16:30:00Z',
    due_date: '2025-02-20T23:59:59Z',
  },
  {
    id: '2',
    title: '实现用户认证功能',
    description: '完成登录、注册、找回密码等用户认证相关功能',
    status: 'in_progress',
    priority: 'high',
    created_at: '2025-02-18T10:15:00Z',
    updated_at: '2025-02-25T14:20:00Z',
    due_date: '2025-03-01T23:59:59Z',
  },
  {
    id: '3',
    title: '优化页面加载性能',
    description: '分析并优化页面加载速度，减少首屏加载时间',
    status: 'pending',
    priority: 'medium',
    created_at: '2025-02-22T09:30:00Z',
    updated_at: '2025-02-22T09:30:00Z',
    due_date: '2025-03-10T23:59:59Z',
  },
  {
    id: '4',
    title: '编写单元测试',
    description: '为核心功能编写单元测试，确保代码质量',
    status: 'pending',
    priority: 'low',
    created_at: '2025-02-25T11:45:00Z',
    updated_at: '2025-02-25T11:45:00Z',
    due_date: '2025-03-15T23:59:59Z',
  },
  {
    id: '5',
    title: '集成第三方支付接口',
    description: '集成支付宝和微信支付接口，实现在线支付功能',
    status: 'pending',
    priority: 'high',
    created_at: '2025-02-28T14:00:00Z',
    updated_at: '2025-02-28T14:00:00Z',
    due_date: '2025-03-20T23:59:59Z',
  },
];

// 模拟数据映射
const mockData = {
  // 任务相关接口
  'task.list': () => {
    return {
      code: 0,
      message: '成功',
      data: {
        total: mockTasks.length,
        items: mockTasks,
      },
    };
  },
  'task.detail': (params) => {
    const task = mockTasks.find(item => item.id === params.id);
    return {
      code: task ? 0 : 404,
      message: task ? '成功' : '任务不存在',
      data: task || null,
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