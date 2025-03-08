/*
 * @Author: diaochan
 * @Date: 2025-02-28 15:24:02
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-08 21:21:35
 * @Description: 
 */
import { post } from '@/utils/request';

export default {
  // 登录
  async login (data) {
    return post('user.login', data)
  }
}