/*
 * @Date: 2022-05-23 12:49:00
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 21:44:01
 * @Description: 
 */
const common = require('./common')
const config = require("../config/index");

// 数据转化
function convertData(newData, oldData, langInfo, cmodule=null){
  let convertRes = []
  Object.keys(newData).forEach( module => {
    const newDataModuleVal = newData[module]
    const oldDataModuleVal = oldData[module]
    if(typeof newDataModuleVal === 'string'){
      convertRes.push({
        module: cmodule ? cmodule : module,
        [langInfo[0]]: newDataModuleVal,
        [langInfo[1]]: oldDataModuleVal ?? ''
      })
    } else {
      for(let iKey in newDataModuleVal){
        const deepModuleVal = newDataModuleVal[iKey]
        if(typeof deepModuleVal === 'string'){
          convertRes.push({
            module: cmodule ? cmodule : module,
            key: iKey,
            [langInfo[0]]: deepModuleVal,
            [langInfo[1]]:  oldDataModuleVal ? (oldDataModuleVal[iKey] ? oldDataModuleVal[iKey] : '') : ''
          })
        } else {
          convertRes = convertRes.concat(convertData(deepModuleVal, oldDataModuleVal[iKey], langInfo, `${module}-${iKey}`))
        }
      }
    }
  })
  return convertRes;
}
// 两份国际化文件生成合并后的Excel
function mergeJsonToExcel(){
  // 读取配置数据
  const conf = config.readConf('mergeJsonToExcelConf')
  // 第一个文件数据作为标准(新数据)
  const newData = common.readJsonFile(conf.curJsonPath);
  const preData = common.readJsonFile(conf.preJsonPath);
  const excelData = convertData(newData, preData, conf.lang);
  if(excelData.length){
    common.writeToExcel(excelData, conf.outputPath);
  }
}
// 自动执行脚本
const args = require('minimist')(process.argv.slice(2))
if(args['auto'] && args['auto'] === 'true'){
  mergeJsonToExcel()
}

module.exports = {
  main: mergeJsonToExcel
}
