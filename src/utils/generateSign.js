/*
 * @Author: diaochan
 * @Date: 2025-04-20 10:05:17
 * @LastEditors: diaochan
 * @LastEditTime: 2025-04-20 10:17:17
 * @Description: 生成签名
 */

import MD5 from 'crypto-js/md5'
import config from '@/config/env'

const generateSign = (params) => {
  const secret = config.apiSignSecret;
  params.timestamp = Math.floor(Date.now() / 1000);
  // 随机字符串参数nonce的主要目的是确保每次请求的唯一性，防止重放攻击
  params.nonce = Math.random().toString(36).substring(2, 15);
  // 过滤参数：排除sign参数和空值
  const filteredParams = {};
  for (const key in params) {
    if (key !== 'sign' && key !== 'lang' && params[key] !== undefined && params[key] !== '' && params[key] !== null) {
      // 确保数字值不会转换为科学计数法
      if (typeof params[key] === 'number') {
        filteredParams[key] = params[key].toString();
      } else {
        filteredParams[key] = params[key];
      }
    }
  }
  
  // 按参数名ASCII码从小到大排序（字典序）
  const sortedKeys = Object.keys(filteredParams).sort();
  
  // 构建签名字符串：key1=value1&key2=value2
  let signStr = '';
  for (const key of sortedKeys) {
    signStr += (signStr ? '&' : '') + `${key}=${filteredParams[key]}`;
  }
  
  // 附加密钥
  signStr += `&secret=${secret}`;
  // console.log("签名前字符串:", signStr);
  // MD5加密
  return MD5(signStr).toString();
}

export default generateSign