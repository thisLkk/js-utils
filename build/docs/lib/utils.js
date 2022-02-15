const path = require('path')

/**
 * 获取路径
 * @param {String} pathname 
 */
exports.resolve = (pathname = '') => {
  return path.join(__dirname, '../../../', pathname)
}

/**
 * 获取当前项目package.json文件，以对象返回
 * @param {String} content 
 */
exports.getPackage = (content) => {
  return JSON.parse(content)
}