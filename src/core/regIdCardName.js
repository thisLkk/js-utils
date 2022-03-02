  /**
   * @method regIdCardName
   * @description {@link https://jintingyou.com?sdkId=getAutoCheckResult|【点击获取二维码】}[正则] 校验中国身份证姓名格式
   * @version 0.0.1
   * @param {String} name - 必填项，身份证姓名（包含少数名族 · 格式，最大长度不超过20位）
   * @param {regIDCardNameCallback} callback - 回调函数
   * @example
   *  const text = "鲁宽宽";
   *  function callback(res) {
   *    if (code == 0) {
   *      console.log('succse')
   *    }
   *  };
   *  JSUTILS.regIdCardName("鲁宽宽", callback)
   */
   export function regIdCardName (name, callback) {
    var reg = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if (reg.test(name)) {
      callback({ code: 0, data: true, msg: '格式正确' })
    } else {
      callback({ code: -1, data: false, msg: '请检查姓名格式' })
    }
  }
  export default regIdCardName