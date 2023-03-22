/*
 * @Date: 2023-03-15 21:00:56
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 22:00:37
 * @Description: 
 */
const yaml = require('js-yaml');
const fs = require('fs-extra');
const path = require('path')
const colors = require("picocolors");
const consola = require('consola')

// excel 语言对应的值
const langMap = readConf('LANG_MAP')

function readConf(module){
  let doc
  try {
    const confPath = path.resolve(__dirname, './config.yaml')
    doc = yaml.load(fs.readFileSync(confPath, 'utf8'));
  } catch (e) {
    consola.error(colors.red(`[Error] Read yaml conf fail. Exception ${e}`));
  }
  if(!doc[module]){
    consola.error(colors.red(`[Error] Configuration data for [${module}] not found`));
    process.exit(0)
  }
  return doc[module] ?? null
}
module.exports = {
  readConf,
  langMap
}
