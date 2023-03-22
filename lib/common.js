/*
 * @Date: 2022-05-22 09:45:38
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 22:19:36
 * @Description: 
 */
const fs = require("fs-extra");
const xlsx = require("node-xlsx").default;
// const json2xls = require("json2xls");
const ExcelJS = require('exceljs')
const colors = require("picocolors");
const utils = require("../utils/index");
const consola = require('consola')
// exit process 
const exit = (code=0) => {
  process.exit(code)
}
// 判断是否存在文件
const existsFile = (filePath) => { 
  const allPath = utils.filePathAll(filePath)
  if(!filePath || !fs.pathExistsSync(allPath)){
    consola.error(colors.red(`[Error] File path ${filePath} does not exist!`));
    exit()
    return false
  }
  return true;
}

// write to excel
function writeToExcel(data, outPath){
  if(!outPath){
    consola.error(colors.red(`[Error] File path cannot be empty!`));
    return;
  }
  // 处理为完成绝对路径
  outPath = utils.filePathAll(outPath)
  const fileName = utils.getFileName(outPath)
  // ----------- excelJs -----
  const startTime = +new Date()
  const workbook = new ExcelJS.Workbook()
  // 添加工作表
  const workSheet = workbook.addWorksheet('Sheet');
  const columns = ['module', 'key', 'zh-cn', 'en'];
  workSheet.columns = columns.map(col => ({header: col, key: col}))
  workSheet.addRows(data, 'n')
  const cellBorderStyle =  {
    style:'thin',
    color: {
      argb: 'FFC3CBDD'
    }
  }
  workSheet.getColumn(4).eachCell( function(cell){
    if(!cell.value){
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor:  { argb: 'FFFFFF00'}
      }
    }
    cell.font = {
        name: 'SimSun',
        color: {
          argb: 'FF000000'
        },
        family: 3,
        size: 11,
        bold: false,
        outline: false,
        italic: false,
    }
    cell.border = {
      top: cellBorderStyle,
      right: cellBorderStyle,
      bottom: cellBorderStyle,
      left: cellBorderStyle
    }
  })

  workbook.xlsx.writeFile(outPath)
  consola.info(colors.blue(`[Info] Data writing to excel execution time: ${+new Date() - startTime}ms.`))
  consola.success(colors.green(`[Success] Convert json to excel successfully! Output file name is [${fileName}]`));
  // -----------json2xls------
  // const xls = json2xls(data)
  // fs.outputFileSync(outPath, xls, "binary");
  // console.log(colors.green(`[Success] Convert json to excel successfully! Output file name is [${fileName}]`));
}
// 获取Json文件数据
function readJsonFile(path){
  if(!existsFile(path)) return;
  path = utils.filePathAll(path)
  return fs.readJsonSync(path)
}
// 获取excel文件数据
function readExcelFile(path, sheetName='Sheet'){
  if(!existsFile(path)) return;

  path = utils.filePathAll(path)
  const workSheetsFromFile = xlsx.parse(`${path}`);
  const sheetInfo = workSheetsFromFile.find(item => item.name === sheetName)
  if(!sheetInfo){
    consola.error(colors.red(`[Error] Not found sheet name is [${sheetName}]!`));
  }
  const { data } = sheetInfo;
  if (!data || !data.length) {
    consola.warning(colors.yellow("[Error] Excel is empty!"));
    exit()
    return;
  }
  return data
}
// write to json 
function writeToJson(path, lang, data) {
  if(!path){
    consola.error(colors.red(`[Error] File path cannot be empty!`));
    return;
  }
  path = utils.filePathAll(path)
  fs.outputFileSync(
    path,
    JSON.stringify(data),
    "utf-8"
  );
  const fileName = utils.getFileName(path)
  consola.success(
    colors.green(
      `[Success] Convert Excel to language [${lang ? lang : 'unknown'}] version json successfully! Output file name is [${fileName}]`
    )
  );
}
// excel数据转为目标json数据
function convertExcelToJson(path, lang='zh-cn', langMap){
  const data = readExcelFile(path);
  if(!data) return
  // 英文转化数据结
  const resJson = {};
  function fmtTargeKeyValue(data) {
    const tmpDeepObj = {};
    for (let j = 0; j < data.length; j++) {
      // 生成对应语言excel的数据对应index
      const langValIndex = langMap[lang] + 2;
      tmpDeepObj[data[1]] = utils.strToUpperCase(data[langValIndex]);
    }
    return tmpDeepObj;
  }
  for (let i = 1; i < data.length; i++) {
    const tmpVal = data[i];
    const key = tmpVal[0];
    // 判断是否为内嵌级模块
    const deepModule = key.split("-");
    if (!resJson[key] && deepModule.length === 1) {
      resJson[key] = {};
    }
    if (deepModule.length > 1) {
      // 二级处理
      const deepKey = deepModule[deepModule.length - 1];
      const preModuleKey = deepModule[deepModule.length - 2];
      const tmpObj = fmtTargeKeyValue(tmpVal);
      resJson[preModuleKey][deepKey] = {
        ...resJson[preModuleKey][deepKey],
        ...tmpObj,
      };
    } else {
      const tmpObj = fmtTargeKeyValue(tmpVal);
      resJson[key] = { ...resJson[key], ...tmpObj };
    }
  }
  return resJson;
}
module.exports = {
  exit,
  writeToExcel,
  writeToJson,
  readJsonFile,
  readExcelFile,
  existsFile,
  convertExcelToJson
}