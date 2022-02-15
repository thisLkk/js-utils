
/**
 * 获取移动终端
 * @ignore
 * @return {String} android | ios
 */
export const getOS = () => {
  return navigator.userAgent.toLowerCase().indexOf('android') > -1 ? 'android' : 'ios'
}

/**
 * 获取版本号
 * @ignore
 * @return {String} 当前版本号
 */
export const getVersion = () => {
  let args = document.cookie.match(/;\s{0,}(?:|h)v=([^;]*)/g)
  let zversion = (args ? getMaxOfVersion(/;\s{0,}(?:|h)v=/g, ...args) : '')
  if (zversion) {
    return zversion.replace(/(^"+)|("+$)/g, '')
  }
  return ''
}

/**
 * createIframe
 * @description 创建iframe
 * @ignore
 */
export const createIframe = () => {
  let iframe = document.createElement('iframe')
  iframe.style.width = '1px'
  iframe.style.height = '1px'
  iframe.style.display = 'none'
  return iframe
}

/**
 * 验证参数是否是json对象
 * @ignore
 */
export const validType = (params, type = 'object') => {
  if (type == 'string') {
    if (params) {
      return true
    } else {
      return false
    }
  }
  try {
    if (typeof (params) === 'object' && Object.prototype.toString.call(params).toLowerCase() === '[object object]' && !params.length) {
      console.log('传参json格式正确！')
      console.dir(params)
      return true
    }
  } catch (e) {
    return false
    console.log(e)
  }
}

/**
 * 判断参数是否为函数
 * @ignore
 */
export const isFunction = (fn) => Object.prototype.toString.call(fn) === '[object Function]'

let idCounter = 0
/**
 * 为回调函数名生成一个全局唯一的id
 * @ignore
 */
export const uniqId = (prefix) => {
  let id = idCounter++
  return prefix ? prefix + id : id
}

/**
 * 比较完之后,剔除较小的版本号,再比较下一位 (备注：此方法可能存在错误，改版完成再来验证)
 * @ignore
 * @return {String} v或者zzv的最大值
 */
export const handleCompare = (len, arr, num = 0, n = [], optArr = []) => {
  for (let i = 0; i < len; i++) {
    n[i] = arr[i][num] || '0'
  }
  let max = Math.max(...n)
  for (let i = 0; i < len; i++) {
    if (n[i] === max) {
      optArr.push(arr[i])
    }
  }
  return optArr
}

/**
 * 比较版本号中每一位大小,取最大版本号
 * @ignore
 * @return {String} v或者zzv的最大值
 */
export const getMaxOfVersion = (reg, ...dedupe) => {
  let lenArr = []
  dedupe.forEach((val, key) => {
    dedupe[key] = val.replace(reg, '').split('.')
    lenArr.push(dedupe[key].length)
  })
  let len = Math.max(...lenArr)
  for (let m = 0; m < len; m++) {
    if (dedupe.length !== 1) {
      dedupe = handleCompare(dedupe.length, dedupe, m)
    } else {
      return dedupe[0].join('.')
    }
  }
}

/**
 * 设置过期时间
 * @ignore
 */
export const expiresTime = (time) => {
  let date = new Date()
  date.setTime(date.getTime() + time)
  return date
}

