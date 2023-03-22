<!--
 * @Date: 2022-05-31 14:24:35
 * @LastEditors: 93eryi@gmail.com
 * @LastEditTime: 2023-03-22 20:56:24
 * @Description: 
-->
### 国际化处理脚本工具

#### 🌈 介绍

此脚本工具用于优化处理国际化文件的过程，其功能主要包括：

- 指定语言国际化 Json 数据转 Excel
- 已翻译 Excel 生成指定语言国际化 Json
- 每次迭代新增指定语言的国际化转 Excel
- 每次迭代最新翻译的 Excel 对比上一版本国际化数据生成最新国际化数据
- 合并对照两种语言 Json 文件至 Excel,用于翻译校验

#### 🚧 运行脚本:

安装依赖

```bash
 pnpm install || yarn install || npm install
```

运行脚本: 必须配置响应功能的参数

```bash
  node index.js
  # 或
  cd lib
  node 执行功能脚本 --auto=true（e.g: node jsonToExcel.js --auto=true）
```

#### 🛠️ 配置项

功能的配置文件(必须项，支持相对路径和绝对路径)

```bash
# 配置项文件路径
 config/config.yaml
```
