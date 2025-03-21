/*
 * @Author: diaochan
 * @Date: 2025-03-08 20:30:15
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-21 15:13:13
 * @Description: 模拟数据工具
 */

import config from '@/config/env';

// 模拟数据映射
const mockData = {
  // 任务相关接口
  'task.list': () => {
    return {
      code: 0,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            taskName: '测试任务1',
            channelId: 1,
            channelName: 'facebook',
            taskStatus: 'not_started', // 任务状态
            createTime: '2024-03-01 10:00:00'
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'task.add': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'task.edit': (params) => {
    console.log(params)
    return {
      code: 0,
      message: '',
    };
  },
  'task.delete': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'task.detail': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        "taskName":"任务名称",
        "channelId":1,
        "channelName":"抖音",
        "category":"宝妈",
        "taskType":"image_text",
        "reward":100,
        "brand":"布鲁克",
        "groupIds":[],
        "groupMode":0,
        "userRange":1,
        "taskCount":0,
        "customFields":[
          {"title":"帖子链接","type":"input"},
          {"title":"分享链接","type":"input"},
          {"title":"数据截图","type":"image"}
        ],
        "startTime":"2025-03-10 09:10:10",
        "endTime":"2025-03-13 09:10:10",
        "unlimitedQuota":true,
        "fansRequired":"10w+",
        "contentRequirement":"1、200文字以上\n2、3张图片+",
        "taskInfo":"这是第一条任务",
        "notice":"1.请尽快完成发布，填写发布链接。\n2.任务结束后无法填写，不能结算。\n3.发布内容不符合要求，将无法审核通过。\n4.填写链接无法访问或其他无关链接，视为放弃结算。"
      },
    };
  },
  'task.export': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  // 已提交任务相关接口
  'taskSubmitted.list': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            taskName: '测试任务1',
            channelId: 1,
            channelName: '抖音',
            memberNickname: '测试会员1',
            groupName: '群组1',
            isGroupOwner: true,
            reward: 100,
            taskAuditStatus: 'pending'
          },
        ],
        page: 1,
        pageSize: 10, 
      },
    };
  },
  'taskSubmitted.detail': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        relatedTaskId: 1,
        relatedMemberId: 1,
        auditStatus: 'pending',
        applyTime: '2025-03-10 09:10:10', // 报名时间
        submitTime: '2025-03-10 09:10:10', // 提交时间
        rejectReason: ''
      },
    };
  },
  'taskSubmitted.batchResolve': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'taskSubmitted.batchReject': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  // 账号相关接口
  'account.list': (params) => {
    return {
      code: 0,
      message: '',  
      data: {
        total: 100,
        list: [
          {
            id: 1,
            account: 'test123',
            channelId: 1,
            channelName: '抖音',
            homeUrl: 'https://example.com/test123',
            fansCount: 1000,
            friendsCount: 100,
            postsCount: 50,
            memberNickname: '测试会员1',
            groupName: '群组1',
            isGroupOwner: true,
            accountAuditStatus: 'pending'
          },
        ],    
        page: 1,
        pageSize: 10,
      },
    };
  },
  'account.batchResolve': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'account.batchReject': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
            
  // 会员相关接口
  'member.list': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            memberNickname: '张三', // 会员昵称
            memberAccount: 'test123', // 会员账号
            groupId: 1,
            groupName: '群组1',
            isGroupOwner: true,
            accountList: [
              {
                account: 'test123',
                homeUrl: 'https://example.com/test123',
              },
              {
                account: 'test123',
                homeUrl: 'https://example.com/test123',
              },
            ],
            updateTime: '2024-02-28 10:00:00'
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'member.add': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'member.edit': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'member.delete': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'member.detail': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        id: 1,
        memberNickname: '张三',
        memberAccount: '13800138000',
        groupId: '1',
        groupName: '群组1',
        isGroupOwner: true,
        occupation: 'student',
        inviteCode: 'ABC123',
        inviteUrl: 'https://example.com/invite/ABC123',
        inviterId: '1',
        inviterNickname: '李四',
        createTime: '2024-02-28 10:00:00',
        updateTime: '2024-02-28 10:00:00',
      },
    };
  },
  // 渠道管理相关接口
  'channel.list': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            name: 'facebook',
            icon: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_4c70b5c61a4c675c57f71de7cc7d27c1~c5_300x300.jpeg?from=2956013662',
            updateTime: '2021-01-01 12:00:00',
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'channel.add': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'channel.edit': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'channel.delete': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  // 群组相关接口
  'group.list': (params) => {
    return {
      code: 0,
      message: '',
      data: { 
        total: 100,
        list: [
          {
            id: 1,
            groupName: '测试群1',
            groupLink: 'https://example.com/group/group001',
            ownerId: 1,
            ownerName: '张三',
            memberCount: 100,
            updateTime: '2021-01-01 12:00:00',
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'group.add': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'group.edit': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'group.delete': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  // 结算相关接口
  'settlement.withdrawal': (params) => {
    return {
      code: 0,
      message: '',
      data: { 
        total: 100,
        list: [
          {
            id: 1,
            memberNickname: '张三',
            memberAccount: '13800138000',
            withdrawalAccount: '6222021234567890123',
            withdrawalAccountType: 'bank',
            amount: 1000.00,
            realName: '张三',
            withdrawalStatus: 'pending',
            applyTime: '2024-02-28 10:00:00',
          },
          {
            id: 2,
            memberNickname: '李四',
            memberAccount: '13800138000',
            withdrawalAccount: '6222021234567890124',
            withdrawalAccountType: 'bank',
            amount: 2000.00,
            realName: '李四',
            withdrawalStatus: 'failed',
            applyTime: '2024-02-28 11:00:00',
          }
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'settlement.batchResolve': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'settlement.batchReject': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'settlement.withdrawalExport': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'settlement.otherBills': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            memberNickname: '张三',
            memberAccount: '13800138000',
            billType: 'task_income',
            amount: 100.00,
            settlementStatus: 'settled',
            createTime: '2024-02-28 10:00:00',
          },
          {
            id: 2,
            memberNickname: '李四',
            memberAccount: '13800138000',
            billType: 'invite_reward',
            amount: 200.00,
            settlementStatus: 'failed',
            failReason: '账户信息有误',
            createTime: '2024-02-28 11:00:00',
          }
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  // 小二管理相关接口
  'waiter.list': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            username: 'admin',
            is_admin: true,
            remarks: '管理员',
          },
          {
            id: 2,
            username: 'user',
            is_admin: false,
            remarks: '审核员',
          },
        ],
        page: 1,
        pageSize: 10,
      },
    };
  },
  'waiter.add': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'waiter.edit': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'waiter.delete': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  // 用户相关接口
  'auth.login': (params) => {
    const { username, password } = params;
    // 由于 bcrypt 加密是不可逆的，我们只需要验证用户名，密码验证在前端完成
    // 在实际后端中，应该使用 bcrypt.compare(password, storedHash) 进行验证
    if (username === 'admin') {
      return {
        code: 0,
        message: '登录成功',
        data: {
          token: 'mock_token_123456',
          username: 'admin',
          permissions: [
            'task:list',
            'task:create',
            'task:edit',
            'task:audit',
            'task:auditDetail',
            'account:list',
            'member:list',
            'member:create',
            'member:edit',
            'member:view',
            'group:list',
            'waiter:list',
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
      message: '用户名或密码错误',
      data: null,
    };
  },
  // 文章相关接口
  'article.list': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        total: 100,
        list: [
          {
            id: 1,
            title: '用户协议',
            location: "userAgreement",
            content: '这是用户协议的内容...',
            updateTime: '2024-02-28 10:00:00',
          },
        ],  
        page: 1,
        pageSize: 10,
      },
    };
  },
  'article.add': (params) => {
    return {
      code: 0,
      message: '',
      data: {
        id: 1,
      },
    };
  },
  'article.edit': (params) => {
    return {
      code: 0,
      message: '',
    };
  },
  'article.delete': (params) => {
    return {
      code: 0,
      message: '',
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