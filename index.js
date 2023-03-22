/*
 * @Date: 2022-05-22 11:10:45
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-16 22:21:29
 * @Description: 
 */
const inquirer = require('inquirer')
function main(){
  inquirer.prompt([
    {
       type: 'list',
        message:"请选择一个选项：",
        name:"list",
        default:"jsonToExcel",
        prefix:"👇",
        choices:[
          {
            name: 'Json生成Excel【全量: 指定语言国际化Json数据转Excel】',
            value: 'jsonToExcel',
          },
          {
            name: 'Excel转Json【全量: 已翻译Excel生成指定语言国际化Json】',
            value: 'excelToJson',
          },
          {
            name: 'Json转Excel【增量: 每次迭代新增指定语言的国际化转Excel】',
            value: 'diffJsonToExcel',
          },
          {
            name: 'Excel转Json【增量: 每次迭代最新翻译的Excel对比上一版本国际化数据生成最新国际化数据】',
            value: 'insertExcelToJson',
          },
          {
            name: '合并语言国际化Json至Excel【增量: 合并对照两种语言Json文件至Excel,用于翻译校验】',
            value: 'mergeJsonToExcel',
          },
          {
            name: '🐶啥也不做:)',
            value: 'exit',
          },
        ],
    }
]).then(answer=>{
  if(answer.list === 'exit'){
    process.exit(0);
  }
  const actionModule = require(`./lib/${answer.list}`);
  if(actionModule && actionModule.main){
    actionModule.main()
  }
});
}
main()