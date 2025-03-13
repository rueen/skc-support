/*
 * @Author: diaochan
 * @Date: 2025-03-13 12:00:00
 * @LastEditors: diaochan
 * @LastEditTime: 2025-03-13 12:00:00
 * @Description: 过滤请求参数工具函数
 */

/**
 * 过滤掉对象中值为空字符串的属性
 * @param {Object} params - 需要过滤的参数对象
 * @return {Object} - 过滤后的参数对象
 */
export const filterEmptyParams = (params) => {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    return params;
  }

  const filteredParams = {};
  
  Object.keys(params).forEach(key => {
    const value = params[key];
    
    // 如果值不是空字符串，则保留该属性
    if (value !== '') {
      // 如果值是对象，则递归过滤
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        filteredParams[key] = filterEmptyParams(value);
      } else {
        filteredParams[key] = value;
      }
    }
  });
  
  return filteredParams;
};

export default filterEmptyParams; 