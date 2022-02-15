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
 * @param {String} file_data - 源文件
 * @param {Boolean} isCallback - true： 结果为 回调函数的注释  false ： 结果为 方法的注释
 */
const analysisNotes = (file_data, isCallback) => {
  let mainData = file_data.match(/\/\*\*[\s\S]+?\*\//g);
  let result = [];
  mainData.forEach((main) => {
    // 去除换行
    let content = main.replace(/[\r\n]/g, '');
    // 只处理包含方法的注释 如： @method wechatAndQQCallLogin 
    if (content.indexOf('@method') > -1 && !isCallback) {
      // 每一行取出方法名与内容
      let lineData = content.split('* @');
      // 不处理 @method包含中文的数据
      let isNoMethod = false;
      lineData.forEach((line) => {
        if (line.indexOf('method') > -1) {
          if (/[\u4E00-\u9FFF]+/.test(line)) {
            isNoMethod = true;
          }; 
        }
      })
      if (isNoMethod) return;
      result.push(lineData)
    };
    // 只处理包含回调的注释 如：@callback downloadApkCallback
    if (content.indexOf('@callback') > -1 && isCallback) {
      // 每一行取出方法名与内容
      let lineData = content.split('* @');
      result.push(lineData)
    };
  })
  return result;
};

/**
 * 处理注释文件(匹配 @ method wechatAndQQCallLogin 类型)为数组返回；  
 * @param {String} file_data - 源文件
 */
exports.methodData = (file_data) => {
  let mainData = analysisNotes(file_data);
  let result = [];
  mainData.forEach((main) => {
    let resultItem = {
      method: '',
      summary: '',
      description: '',
      version: '',
      param: [],
      example: ''
    };
    let selects = [
      'method',
      'summary',
      'description',
      'version',
      'param',
      'example'
    ];
    // 是否是标准注释
    let isDocTrue = false;
    main.forEach(line => {
      try {
        // console.log('main', line)
        // 匹配出{String} 等类型
        let regType = /\{.*?(?=\})\}/g;
        let regKey = /\}(.*)\ -/;
        // lineName : method、descript、summary、version、param
        let lineName = selects.find(select => line.indexOf(select) > -1) || '';
        if (!lineName) return;
        switch (lineName) {
          case 'method':
            resultItem.method = line.replace('method ', '').trim();
            break;
          case 'version':
            resultItem.version = line.replace('version ', '').trim();
            break;
          case 'summary':
            resultItem.summary = line.replace('summary ', '').trim();
            break;
          case 'description':
            // 去除  点击获取二维码 文案
            resultItem.description = line.split(`}`)[1];
            break;
          case 'param':
            // 是否包含外联回调
            let hasCallback = line.indexOf('callback') > -1 && line.indexOf('{function}') == -1;
            resultItem.param.push({
              type: line.match(regType)[0].replace(/\}|\{/g, ""),
              hasCallback,
              value: line.split('-')[1] && line.split('-')[1].trim(),
              key: line.match(regKey) && line.match(regKey)[1].trim()
            })
            break;
          case 'example':
            let exampleContent = line.replace('example', '').replace(/\*|\//g, "").trim();
            resultItem.example = beautify(exampleContent, { indent_size: 2, space_in_empty_paren: true });
            break;
      
          default:
            break;
        }
      } catch {
        isDocTrue = true;
        console.log(`--------------------- \n#### error ####：请检查注释是否规范！\n#### data  ####：${main}; \n#### line  ####：${line}; \n---------------------`)
      }
    })
    if (!isDocTrue) {
      result.push(resultItem)
    }
    // console.log('resultItem', resultItem)
  })
  return sortHandle(result, 'method') || [];
};
/**
 * 处理注释文件(匹配 @ callback downloadApkCallback 类型)为数组返回；  
 * @param {String} file_data - 源文件
 */
exports.callbackData = (file_data) => {
  let mainData = analysisNotes(file_data, true);
  let result = [];
  mainData.forEach((main) => {
    let resultItem = {
      callback: '',
      param: [],
    };
    let selects = [
      'callback',
      'param'
    ];
    // 是否是标准注释
    let isDocTrue = false;
    main.forEach(line => {
      try {
        // console.log('main', line)
        // 匹配出{String} 等类型
        let regType = /\{.*?(?=\})\}/g;
        let regKey = /\}(.*)\ -/;
        // lineName : method、descript、summary、version、param
        let lineName = selects.find(select => line.indexOf(select) > -1) || '';
        if (!lineName) return;
        switch (lineName) {
          case 'callback':
            resultItem.callback = line.replace('callback ', '').trim();
            break;
          case 'param':
            resultItem.param.push({
              type: line.match(regType)[0].replace(/\}|\{/g, ""),
              value: line.split('-')[1] && line.split('-')[1].replace(/\*|\//g, "").trim(),
              key: line.match(regKey) && line.match(regKey)[1].trim()
            })
            break;
      
          default:
            break;
        }
      } catch {
        isDocTrue = true;
        console.log(`--------------------- \n#### error ####：请检查注释是否规范！\n#### data  ####：${main}; \n#### line  ####：${line}; \n---------------------`)
      }
    })
    if (!isDocTrue) {
      result.push(resultItem)
    }
    // console.log('resultItem', resultItem)
  })
  return sortHandle(result, 'callback') || [];
}