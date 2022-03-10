// 写入markdown文件
const fs = require('fs');

// 将一维数组转为二维数组，区分type类型
const formatHandle = (list) => {
  let result = []
  list.forEach(item => {
    let resultIndex = result.findIndex(el => el.type == item.type)
    if (resultIndex == -1) {
      result.push({
        type: item.type,
        data: [item]
      })
    } else {
      result[resultIndex].data.push(item)
    }
  })
  return result
}

/**
 * 写入markdown文件
 * @param {String} writePath - 写入文件的路径
 */
exports.writeDocs = (writePath, contentList) => {
  const dataSource = formatHandle(contentList)
  // console.log(writePath, dataSource)
let mdText = 
`# API集合`;
  // 动态渲染每一个方法
dataSource.forEach(item => {
let content = 
`
***
## ${item.type}
`;
item.data.forEach(data => {
content += `
***
### ${data.name}
`
content +=
`
* **功能**:
  * ${data.description}
* **版本**:
  * ${data.version}
* **参数**:
`
let table = `
| 参数 | 备注 | 类型 |  
|------|------|------|------|  
`;
data.param.forEach(item => {
  table += `|${item.key || ''}|${item.value || ''}|${item.type}|
`;
content += table;
})
if (data.returns) {
content += `
* **返回值**:
  * ${data.returns}
`;
}
let example = `
* **示例**:
`;
example += '\n```javascript\n'+ data.example + '\n```\n';
content += example;
let url = `https://jintingyo.com/h5/js-utils-test-page?sdkId=${data.name}`
let qrCode = `
* **扫描二维码测试**:  
<img width="200px" height="200px" src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}"></img>\n`
content += qrCode;
})
mdText += content;
});
  fs.writeFile(writePath, mdText, 'utf8', function (error) {
    if (error) {
      console.log('### 写入失败，请排查')
      throw error;
    }
  });
}

/**
 * 写入sdkApi文件,提供测试页面使用
 * @param {String} writeDocsPath - 写入文件的路径
 */
exports.writeApiList = (writeDocsPath, contentList) => {
  let result = 'window.JSUTILSAPI = ' + JSON.stringify(contentList);
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