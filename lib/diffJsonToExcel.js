/*
 * @Date: 2022-05-21 20:14:02
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 20:47:10
 * @Description: 
 */

const config = require("../config/index");
const utils = require("../utils/index");
const common = require('./common');

const transFormLang = Object.keys(config.langMap)
// 数据格式转化
function fmtDataItem(conf,val, key, module) {
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
// diff json key
function diffJson(conf){
  const preJsonData = common.readJsonFile(conf.preJsonPath)
  const curJsonData = common.readJsonFile(conf.curJsonPath); 
  const curJsonDataModule = Object.keys(curJsonData)
  let diffModuleData = []
  curJsonDataModule.forEach( module => {
    const curModuleKeys = Object.keys(curJsonData[module]);
    if(preJsonData[module]){
      // 比较原有模块的新增
      const preModuleKeys = Object.keys(preJsonData[module]);
      const diffModuleList = utils.difference(preModuleKeys, curModuleKeys);
      if(diffModuleList.length) {
        diffModuleList.forEach( dKey => {
          diffModuleData.push(fmtDataItem(conf, curJsonData[module][dKey], dKey, module)); 
        })
      }
    } else {
      // 新增模块
      const tmpVal = curJsonData[module];
      for(let key in tmpVal){
        diffModuleData.push(fmtDataItem(conf, tmpVal[key], key, module)) 
      }
    }
  })
  return diffModuleData;
}
// 比较json差异更新至excel
function diffJsonToExcel(){
  // 读取配置数据
  const conf = config.readConf('diffJsonConf')
  const diffData = diffJson(conf)
  if(diffData.length){
    common.writeToExcel(diffData, conf.outputPath);
  }
}
// 自动执行脚本
const args = require('minimist')(process.argv.slice(2))
if(args['auto'] && args['auto'] === 'true'){
  diffJsonToExcel()
}

module.exports = {
  diffJson,
  main: diffJsonToExcel
}