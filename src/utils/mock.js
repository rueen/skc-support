/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:30:15
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-09 21:04:01
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
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            taskName: '测试任务1',
            channelName: 'facebook',
            status: 'not_started',
            createTime: '2024-03-01 10:00:00'
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'task.detail': (params) => {
    return {
      code: 0,
      success: true,
      message: '',
      data: {},
    };
  },
  // 会员相关接口
  'member.list': (params) => {
    return {
      code: 0,
      success: true,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            name: '张三',
            account: 'test123',
            groupId: 1,
            groupName: '群组1',
            isGroupOwner: true,
            channelAccountList: [
              {
                account: 'test123',
                homeUrl: 'https://example.com/test123',
              },
              {
                account: 'test123',
                homeUrl: 'https://example.com/test123',
              },
            ],
            createTime: '2024-02-28 10:00:00',
            updateTime: '2024-02-28 10:00:00',
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'member.detail': (params) => {
    return {
      code: 0,
      success: true,
      message: '',
      data: {
        id: 1,
        name: '张三',
        account: '13800138000',
        groupId: '1',
        groupName: '群组1',
        isGroupOwner: true,
        occupation: 'student',
        inviteCode: 'ABC123',
        inviteUrl: 'https://example.com/invite/ABC123',
        inviterId: '1',
        inviterName: '李四',
        channelAccountList: [
          {
            account: 'test123',
            channelId: '1',
            channelName: 'facebook',
            channelIcon: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_4c70b5c61a4c675c57f71de7cc7d27c1~c5_300x300.jpeg?from=2956013662',
            homeUrl: 'https://example.com/test123',
          },
          {
            account: 'test123',
            channelId: '2',
            channelName: 'instagram',
            channelIcon: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_4c70b5c61a4c675c57f71de7cc7d27c1~c5_300x300.jpeg?from=2956013662',
            homeUrl: 'https://example.com/test123',
          },
        ],
        createTime: '2024-02-28 10:00:00',
        updateTime: '2024-02-28 10:00:00',
      },
    };
  },
  // 渠道管理相关接口
  'channel.list': (params) => {
    return {
      code: 0,
      success: true,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            name: 'facebook',
            icon: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_4c70b5c61a4c675c57f71de7cc7d27c1~c5_300x300.jpeg?from=2956013662',
            createdAt: '2021-01-01 12:00:00',
            updatedAt: '2021-01-01 12:00:00',
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'group.list': (params) => {
    return {
      code: 0,
      success: true,
      message: '',
      data: { 
        total: 100,
        list: [
          {
            id: 1,
            name: '测试群1',
            groupLink: 'https://example.com/group/group001',
            ownerId: 1,
            ownerName: '张三',
            memberCount: 100,
            createdAt: '2021-01-01 12:00:00',
            updatedAt: '2021-01-01 12:00:00',
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  // 账号管理相关接口
  'account.list': (params) => {
    return {
      code: 0,
      success: true,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            username: 'admin',
            isAdmin: true,
            remarks: '管理员',
            createdAt: '2021-01-01 12:00:00',
            updatedAt: '2021-01-01 12:00:00',
          },
          {
            id: 2,
            username: 'user',
            isAdmin: false,
            remarks: '审核员',
            createdAt: '2021-01-01 12:00:00',
            updatedAt: '2021-01-01 12:00:00',
          },
        ],
        page: 1,
        pageSize: 10,
      },
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