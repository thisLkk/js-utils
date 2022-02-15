import { JSUTIL } from './core/index.js'
/**
 * @global
 */
let JSUTILS = new JSUTIL()
/**
 * 页面异常上报
 * 1.当注册onerror事件后，会对于加载此事件后的js资源进行语法检查
 * 2.当操作dom运行时，会对于操作动作（点击等）异常错误栈收集。
 * @ignore
 */
window.onerror = function (errorMessage, scriptURL, lineNumber, columnNumber, errorObj) {
  let err = '### sorry,error!\n### Message:' + errorMessage + '\n### Url:' + scriptURL + '\n### Line:' + lineNumber + '\n### Column:' + columnNumber + '\n### Obj:' + errorObj
  console.log(err)
}

export default JSUTILS
