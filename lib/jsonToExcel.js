/*
 * @Date: 2022-05-21 19:20:50
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-15 21:18:43
 * @Description: 
 */

const config = require("../config/index");
const common = require('./common');

function jsonToExcel() {
  // 读取配置数据
  const conf = config.readConf('jsonToExcelConf')
  
  const transFormLang = Object.keys(config.langMap)
  // 设置语言数据值
  function fmtDataItem(val, key, module) {
    const tVal = {
      module,
      key: key,
    };
    transFormLang.forEach( lang => {
      if(conf.lang.includes(lang)){
        tVal[lang] = '';
      } else {
        tVal[lang] = val
      }
    })
    return tVal;
  }
  // 转化json
  function convertJson(data, cmodule) {
    let jsonArray = [];
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        jsonArray.push(fmtDataItem(data[key], key, cmodule));
      } else {
        for (const iKey in data[key]) {
          const tmpVal = data[key][iKey];
          if (typeof tmpVal === "string") {
            jsonArray.push(fmtDataItem(data[key][iKey], iKey, key));
          } else {
            jsonArray = jsonArray.concat(convertJson(tmpVal, `${key}-${iKey}`));
          }
        }
      }
    });
    return jsonArray;
  }
  // 检查文件是否存在
  const data = common.readJsonFile(conf.inputPath)
  const jsonList = convertJson(data);
  if(jsonList.length){
    common.writeToExcel(jsonList, conf.outputPath);
  }
}
// 自动执行脚本
const args = require('minimist')(process.argv.slice(2))
if(args['auto'] && args['auto'] === 'true'){
  jsonToExcel()
}

module.exports = {
  main: jsonToExcel
}

