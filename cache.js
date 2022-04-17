import Cookie from 'js-cookie';

// 完整的 cacheKey 格式: AppName_Version_UserId_Key
// 缓存前缀(可设置 AppName_Version_)
const APP_STORAGE_PREFIX = ''

/**
 * 获取缓存数据
 * @param {string} key
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
export function getCache(key, type = 'local') {
  let value;
  let storageKey = `${APP_STORAGE_PREFIX}${key}`
  switch (type) {
    case 'cookie':
      value = Cookie.get(storageKey);
      break;
    case 'session':
      value = sessionStorage.getItem(storageKey);
      try {
        value = JSON.parse(stringValue);
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      value = localStorage.getItem(storageKey);
      try {
        value = JSON.parse(stringValue);
      } catch (e) {
        console.log(error);
      }
      break;
  }
  return value;
}

/**
 * 获取缓存数据
 * @param {string} key
 * @param {any} value
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
export function setCache(key, value, type = 'local') {
  const storageKey = `${APP_STORAGE_PREFIX}${key}`
  switch (type) {
    case 'cookie':
      Cookie.set(storageKey, value, { expires: 7 });
      break;
    case 'session':
      sessionStorage.setItem(storageKey, JSON.stringify(value));
      break;
    default:
      localStorage.setItem(storageKey, JSON.stringify(value));
      break;
  }
}

/**
 * 根据用户ID获取缓存
 * @param {*} key
 * @param {*} type
 */
export function getUserCache(key, type = 'local') {
  const userId = getCache('userId','session');
  if (!userId) {
    console.error('无法获取用户信息！');
    return;
  }
  return getCache(`${userId}_${key}`, type);
}

/**
 * 根据用户ID设置缓存
 * @param {*} key
 * @param {*} value
 * @param {*} type
 */
export function setUserCache(key, value, type = 'local') {
  const userId = getCache('userId','session');
  if (!userId) {
    console.error('无法获取用户信息！');
    return;
  }
  return setCache(`${userId}_${key}`, value, type);
}

/**
 * localStorage缓存设置，做限制处理
 * @param {string} key
 * @param {string} value
 * @param {function} limitHandler
 */
export function setStorage(key, value, limitHandler) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
    if (error.name === 'QuotaExceededError') {
      console.log('超出本地存储限额！');
      //如果历史信息不重要了，可清空后再设置
      // const cacheKeys = Object.getOwnPropertyNames(localStorage);
      // cacheKeys.forEach(key => {
      //   if (key) {
      //     localStorage.removeItem(key);
      //   }
      // });
      limitHandler();
    }
  }
}

