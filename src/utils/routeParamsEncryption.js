/**
 * @Author: diaochan
 * @Date: 2025-04-12
 * @Description: 路由参数加解密工具
 */

/**
 * 加密路由参数
 * @param {Object} params - 需要加密的参数对象
 * @returns {string} - 加密后的字符串
 */
export function encryptRouteParams(params) {
  if (!params) return '';
  
  try {
    // 将对象转为 JSON 字符串
    const jsonStr = JSON.stringify(params);
    
    // 使用 Base64 编码
    return btoa(encodeURIComponent(jsonStr));
  } catch (error) {
    console.error('路由参数加密失败:', error);
    return '';
  }
}

/**
 * 解密路由参数
 * @param {string} encryptedStr - 加密后的字符串
 * @returns {Object|null} - 解密后的参数对象，解密失败返回 null
 */
export function decryptRouteParams(encryptedStr) {
  if (!encryptedStr) return null;
  
  try {
    // 使用 Base64 解码
    const jsonStr = decodeURIComponent(atob(encryptedStr));
    
    // 将 JSON 字符串转回对象
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('路由参数解密失败:', error);
    return null;
  }
}

/**
 * 加密 filters 对象，专用于任务列表过滤条件
 * @param {Object} filters - 过滤条件对象
 * @returns {string} - 加密后的字符串
 */
export function encryptFilters(filters) {
  return encryptRouteParams(filters);
}

/**
 * 解密 filters 字符串，专用于任务列表过滤条件
 * @param {string} encryptedFilters - 加密后的过滤条件字符串
 * @returns {Object|null} - 解密后的过滤条件对象
 */
export function decryptFilters(encryptedFilters) {
  return decryptRouteParams(encryptedFilters);
} 