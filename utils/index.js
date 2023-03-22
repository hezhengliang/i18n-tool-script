/*
 * @Date: 2022-05-21 20:42:34
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 22:13:41
 * @Description: 
 */
const path = require('path')
// arr diff
const difference = (arr1, arr2) => {
  return arr1.concat(arr2).filter(v => !arr1.includes(v) || !arr2.includes(v))
}
// 单词首字母大写
const strToUpperCase = (str) => {
  return str && str.length > 1 ? str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) : str;
}
// 文件名
const getFileName = (path) => {
  const pos = path.lastIndexOf('/');
  return path.substr(pos+1)
}

// 完整路径路径
// const filePathAll = (filePath) => path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)

const filePathAll = (filePath) => path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath)

module.exports = {
  difference,
  strToUpperCase,
  getFileName,
  filePathAll
}