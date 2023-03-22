### 国际化处理脚本工具
 
#### 🌈 介绍

此脚本工具用于优化处理国际化文件的过程，其功能主要包括：

  + 指定语言国际化Json数据转Excel
  + 已翻译Excel生成指定语言国际化Json
  + 每次迭代新增指定语言的国际化转Excel
  + 每次迭代最新翻译的Excel对比上一版本国际化数据生成最新国际化数据
  + 合并对照两种语言Json文件至Excel,用于翻译校验

### 🚧 运行脚本:
  安装依赖
  > yarn install || npm install

  运行脚本: 必须配置响应功能的参数
  > node index.js 
  > 或
  > cd lib
  > node 执行功能脚本 --auto=true（ps：node jsonToExcel.js --auto=true）


### 🛠️ 配置项

 各个功能的配置文件
  > config/xxx

  + Json转Excel

  ```javascript
  /* inputFilePath json路径
  * outputFilePath 目标输出的excel路径
  * lang 翻译目标语言
  */
  const outExcelConfig = {
    inputFilePath: `./source/zh-cn.json`,
    outputFilePath: `./source/i18n-${dateLabel}.xlsx`,
    lang: ["en", 'zh-tw'],
  };
  ```

  + Excel转Json

  ```javascript
  /*  excelPath 目标excel文件路径
    * outPath 输出json文件路径
    * lang 目标语言
    */
    const outJsonConfig = {
      inputFilePath: `./source/i18n-2022-05-29.xlsx`,
      outputFilePath: `./source/en-json.json`,
      lang: "en",
    };
  ```

  + Json对比差异生成Excel

  ```javascript
  /* 
    * preJsonPath 老版本json文件
    * curJsonPath 当前版本json文件
    * outputPath 目前excel路径
    * lang 需要翻译的目标语言
    */
    const diffJsonConfig = {
      preJsonPath: `./source/en.json`,
      curJsonPath: `./source/zh-cn.json`,
      outputPath: `./source/i18n-en-diff-${dateLabel}.xlsx`,
      lang: ["en", 'zh-tw'],
    }
  ```

  + 读取翻译的excel，与老版本数据对比生成最新国际化

  ```javascript
  /* 
    * preJsonPath 老版本json文件
    * curJsonPath 当前版本json文件
    * outputPath 目前excel路径
    * lang 需要翻译的目标语言
    */
    const insertExcelToJsonConfig = {
      excelPath: `./source/i18n-en-diff-2022-05-29.xlsx`,
      jsonPath: `./source/en.json`,
      outputFilePath: `./source/i18n-en-latest.json`,
      lang: "en"
    }
  ```

  + 合并Json转Excel(用于生成需校验翻译的Excel)

  ```javascript
  /* 
    * json合并Excel
    */
    const mergeJsonToExcelConfig = {
      inputFile: {
        'zh-cn': `./source/zh-cn.json`,
        'en': `./source/en.json`
      },
      outputFilePath: `./source/i18n-merge-2022-05-29.xlsx`,
      lang: 'en',
    }
  ```
