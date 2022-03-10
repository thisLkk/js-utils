// 读取注释文件，并生成可访问的数组
const beautify = require('js-beautify').js; // 格式化代码

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @param {*} id 
 */
const sortHandle = (result, name) => {  
  return result.sort((a, b) => {
    return a[name].charCodeAt(0) - b[name].charCodeAt(0)
  })
};
/**
 * 处理注释文件为数组返回；
 * @param {String} originContent - 源文件
 */
const analysisNotes = (originContent) => {
  let contentList = originContent.match(/\/\*\*[\s\S]+?\*\//g);
  // console.log('contentList----', contentList)
  let result = [];
  contentList.forEach((item) => {
    // 消除换行及/** */
    let content = item.replace(/[\r\n]|\/\*\*|\*\//g, '');
    // console.log('content------', content)
    let lineData = content.split('* @');
    lineData.shift()
    // console.log('lineData---', lineData)
    result.push(lineData)
  })
  return result;
};

/**
 * 处理路径
 * @param {*} originFile 
 * @param {*} filePathList 
 * @returns ["src"]
 */
exports.formatPath = (originFile, filePathList) => {
  let allFiles = []
  filePathList.forEach(item => {
    const curPath = originFile + '\\' + item
    allFiles.push(curPath)
  })
  return allFiles
}

/**
 * 处理注释文件为数组返回；  
 * @param {String} originContent - 注释内容
 */
exports.formatContent = (originContent) => {
  let notesList = analysisNotes(originContent);
  // console.log('notesList---', notesList)
  let result = [];
  notesList.forEach((notes) => {
    let notesMap = {}
    let isDocTrue = false;
    notes.forEach(note => {
      try {
        let noteLsit = note.split(' ')
        let key = noteLsit[0]
        let value = noteLsit.slice(1).join(' ')
        if (key == 'example') {
          let exampleContent = value.replace(/\*/g, "").trim();
          value = beautify(exampleContent, {
            indent_size: 2
          });
        }
        // 处理param
        if (key == 'param') {
          let params = {
            type: value.split(' ')[0].trim().replace(/\}|\{/g, ""),
            key: value.split(' ')[1].trim(),
            value: value.split(' ').slice(2).join(''),
          }
          // console.log('params-------', params)
          if (Array.isArray(notesMap[key])) {
            notesMap[key].push(params)
          } else {
            notesMap[key] = []
            notesMap[key].push(params)
          }
        } else {
          notesMap[key] = value
        }
      } catch {
        isDocTrue = true;
        console.log(`--------------------- \n#### error ####：请检查注释是否规范！\n#### data  ####：${notes}; \n#### line  ####：${note}; \n---------------------`)
      }
    })
    if (!isDocTrue) {
      result.push(notesMap)
    }
  })
  return sortHandle(result, 'name') || [];
};