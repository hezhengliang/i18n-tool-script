/*
 * @Date: 2022-05-21 19:20:41
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 21:29:25
 * @Description: 
 */

const config = require("../config/index");
const utils = require("../utils/index");
const common  = require('./common');


// convert excel to json
function excelToJson() {
  // 读取配置数据
  const conf = config.readConf('excelToJsonConf')
  common.existsFile(conf.inputPath);
  const resJsonData = common.convertExcelToJson(conf.inputPath, conf.lang, config.langMap);
  if(resJsonData){
    common.writeToJson(conf.outputPath, conf.lang, resJsonData)
  }
}
// 自动执行脚本
const args = require('minimist')(process.argv.slice(2))
if(args['auto'] && args['auto'] === 'true'){
  excelToJson()
}
module.exports = {
  main: excelToJson
}
