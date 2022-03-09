interface callback {
  (data?: boolean): void
}
/**
 * @name regIdCardNameTest
 * @type 正则
 * @description 校验中国身份证姓名格式
 * @link https://jintingyou.com?sdkId=getAutoCheckResult
 * @version 0.0.22
 * @param {String} name 必填项，身份证姓名（包含少数名族 · 格式，最大长度不超过20位）
 * @todo 
 * @returns {Boolean} true 或者 false
 * @parameter "鲁宽宽"
 * @example
 *  import { regIdCardNameTest } from '@lu-kk/js-utils'
 *  const text = "鲁宽宽";
 *  regIdCardNameTest(text)  // true or false
 */
  export function regIdCardNameTest (name: string, callback: callback) {
  let reg = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,19}$/
  if (!name) return callback(false)
  if (!reg.test(name)) return callback(true)
  return callback(false)
}
export default regIdCardNameTest