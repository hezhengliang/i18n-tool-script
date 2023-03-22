/*
 * @Date: 2022-05-22 10:44:14
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 21:27:20
 * @Description: 
 */
const config = require("../config/index");
const common = require('./common');

// 读取翻译Excel数据和老版本国际化json 并写入最新json
function insertExcelToJson(){
  // 读取配置数据
  const conf = config.readConf('insertExcelToJsonConf')
  const excelPath = conf.excelPath
  common.existsFile(excelPath);
  const jsonData = common.convertExcelToJson(excelPath, conf.lang,config.langMap)
  const preJsonData = common.readJsonFile(conf.jsonPath)
  const latestJson = {}
  Object.keys(jsonData).forEach( module => {
    if(!preJsonData[module]) {
      latestJson[module] = jsonData[module]
    } else {
      latestJson[module] = {...preJsonData[module], ...jsonData[module]}
    }
  })
  common.writeToJson(conf.outputPath, conf.lang, latestJson)
}

// 自动执行脚本
const args = require('minimist')(process.argv.slice(2))
if(args['auto'] && args['auto'] === 'true'){
  insertExcelToJson()
}

module.exports = {
  main: insertExcelToJson
}