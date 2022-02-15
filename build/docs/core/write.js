// 写入markdown文件
const fs = require('fs');

/**
 * 写入markdown文件
 * @param {String} writePath - 写入文件的路径
 */
exports.writeDocs = (writePath, params) => {
  // console.log(writePath, params.methodList)
  const {methodList, callbackList} = params;
// 首页title
  let title = `---
title: js-utils文档
date: ${new Date().toString()}
---
`;


// ***********分类：方法区域、回调区域***********
// ***********方法区域***********
  let methodDocs = `
## 方法集合
`;

// 动态渲染每一个方法
  methodList.forEach(method => {
let content = `
***
### ${method.method}
${method.summary
  ? `<p style="color: #f47920">&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">警告:</span>&nbsp; ${method.summary}</p>`
  : ''
}
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">功能:</span>&nbsp; ${method.description}</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">版本:</span>&nbsp; ${method.version}</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">参数:</span></p>
`;
// 入参表格
let paramTable = `
| 入参 | 说明 | 类型 |
|------|------|------|------|
`;
// 入参
method.param.forEach(item => {
  paramTable += `|${item.key || ''}|${item.value || ''}|${item.type}|
`;
})

// 例子
content += paramTable;
let example = `
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">例子:</span></p>
`;
example += '\n```javascript\n'+ method.example + '\n```\n';
content += example;

// 二维码
let url = `https://m.zhuanzhuan.com/u/hunter_jssdk_page/?sdkId=${method.method}`
let qrCode = `
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">扫描二维码测试:</span></p>
<img width="200px" height="200px" src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}"></img>\n`
content += qrCode;

methodDocs += content;

});

// ***********回调区域***********
let callbackDocs = `
## 回调集合
`;
// 动态渲染每一个回调
callbackList.forEach(callback => {
let content = `
***
### ${callback.callback}
`;
{/* <p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">:</span></p> */}
// 入参表格
let paramTable = `
| 回调入参 | 说明 | 类型 |
|------|------|------|------|
`;
// 入参
callback.param.forEach(item => {
  paramTable += `|${item.key || ''}|${item.value || ''}|${item.type}|
`;
})
content += paramTable;
callbackDocs += content;

});

  let result = title + methodDocs + callbackDocs;
  fs.writeFile(writePath, result, 'utf8', function (error) {
    if (error) {
      throw error;
    }
  });
}

/**
 * 写入sdkApi文件,提供测试页面使用
 * @param {String} writeDocsPath - 写入文件的路径
 */
exports.writeSdkApi = (writeDocsPath, params) => {
  let result = 'window.JSUTILS = ' + JSON.stringify(params);
  fs.writeFile(writeDocsPath, result, 'utf8', function (error) {
    if (error) {
      throw error;
    }
  });
}

/**
 * 复制dist下build的sdkjs到文档服务器
 * @param {String} copyFromPath - 源文件地址
 * @param {String} copyToPath - 目标文件地址
 */
exports.copySdkJs = (copyFromPath, copyToPath) => {
  fs.copyFileSync(copyFromPath, copyToPath);
}

/**
 * 复制dist下build的sdkjs到测试页面
 * @param {String} version - 源文件地址
 * @param {Object[]} pathList - 目标文件地址
 */
exports.writeVersion = (version, pathList) => {
  if (version.indexOf('beta') > -1) {
    return
  }
  // pathList.forEach(item => {
  //   const readData = fs.readFileSync(item, 'utf-8');
  //   let writeData = readData.replace();
  //   fs.writeFile(item, writeData, 'utf8', function (error) {
  //     if (error) {
  //       throw error;
  //     }
  //   });
  // })
}