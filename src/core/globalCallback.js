import { isFunction, uniqId } from '../lib/utils.js'

/**
 * 封装回调函数，放入全局中
 */
let  actualCallback = (callback, del) => {
  let callbackName = 'LUKK_JS_UTILS_CALLBACK_' + uniqId()
  try {
    window[callbackName] = (state, res) => {
      console.log('客户端返回的state', state, '返回的数据', res)
      switch (state) {
        case '0':
          try {
            res = JSON.parse(res)
            callback(res, '')
          } catch (e) {
            console.log('[actualCallback.error]:', e)
          }
          break
        case '-1':
          callback('', '此版本没有这个方法')
          console.log('此版本没有这个方法, 升级版本看精彩内容哦~')
          break
        case '-2':
          if (process.env.NODE_ENV !== 'production') {
            alert('入参格式错误')
          }
          callback('', '入参格式错误')
          break
        default:
          callback('', '没有匹配到state')
          break
      }
      if (del) delete window[callbackName]
    }
  } catch (error) {
    callback('', error)
  }
  return callbackName
}

/**
 * 暴露一个回调CB对象
 * @type {{getCallbackName: ((callback))}}
 */
export let CB = {
  /**
   * 封装callback
   */
  getCallbackName (callback, del = true) {
    return isFunction(callback) ? actualCallback(callback, del) : ''
  }
}
