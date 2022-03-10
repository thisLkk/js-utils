const { resolve, getPackage } = require('./lib/utils.js');
const { formatContent, formatPath } = require('./core/read.js');
const { writeDocs, copySdkJs, writeApiList, writeVersion } = require('./core/write.js');
const fs = require('fs');

// -------- 读取文件
// 1. 获取所有待处理的文件路劲
const originPath = resolve('src/core');
const pathList = fs.readdirSync(originPath, 'utf-8');
const allFiles = formatPath(originPath, pathList);
// 所有文件的内的内容
let allFilesContent = ''
allFiles.forEach(item => {
  const fileContent = fs.readFileSync(item, 'utf-8');
  allFilesContent += fileContent
})
// 2.处理 allFilesContent 内容，对注释进行提取
const contentList = formatContent(allFilesContent);
// console.log('contentList---', contentList)



// -------- 写入文件
const writeFilePath = resolve('docs/main/index.md');
writeDocs(writeFilePath, contentList);
// 在docs页面写入api
const writeDocsPath = resolve('docs/.vuepress/public/js-utils-api.js');
writeApiList(writeDocsPath, contentList);
// 在docs页面写入sdk通信js
const copyFromPath = resolve(`lib/index.umd.min.js`);
const copyToPath = resolve('docs/.vuepress/public/js-utils-min.js');
copySdkJs(copyFromPath, copyToPath)
// const versionPath1 = resolve('README.md');
// const versionPath2 = resolve('docs/README.md');
// writeVersion(version, [versionPath1, versionPath2])





// const { resolve, getPackage } = require('./lib/utils.js');
// const { methodData, callbackData } = require('./core/read.js');
// const { writeDocs, copySdkJs, writeSdkApi, writeVersion } = require('./core/write.js');
// const fs = require('fs');

// // -------- 读取文件
// // ---方法文件（标准注释）
// const originFile = resolve('src/core/index.js');
// const originData = fs.readFileSync(originFile, 'utf-8');
// // 格式化之后的只包含@method的数组 methodList： Array  
// const methodList = methodData(originData);
// // 格式化之后的只包含@callbackList的数组 callbackList: Array  
// const callbackList = callbackData(originData);
// const params = {
//   methodList,
//   callbackList
// };
// // --获取package.json 对象
// const packageFile = resolve('package.json');
// const packageData = fs.readFileSync(packageFile, 'utf-8');
// const { version } = getPackage(packageData);




// // -------- 写入文件
// const writeFilePath = resolve('docs/main/index.md');
// writeDocs(writeFilePath, params);
// // 在cocs页面写入api
// const writeDocsPath = resolve('docs/.vuepress/public/js-utils-api.js');
// writeSdkApi(writeDocsPath, params);
// // 在docs页面写入sdk通信js
// const copyFromPath = resolve(`dist/static/js/${version}/index.min.js`);
// const copyToPath = resolve('docs/.vuepress/public/js-utils-min.js');
// copySdkJs(copyFromPath, copyToPath)
// // const versionPath1 = resolve('README.md');
// // const versionPath2 = resolve('docs/README.md');
// // writeVersion(version, [versionPath1, versionPath2])