# @lu-kk/js-utils
<!-- 具体使用请查看文档【[文档地址](http://jintingyo.com/web/js-utils/)】 -->
js-utils是一款开箱即用的函数库，如常见正则校验、防抖等。
## 安装
```javascript
$ npm i @lu-kk/js-utils --save
```

## 按需加载
```javascript
import { regIdCardName } from '@lu-kk/js-utils'
const text = '鲁宽宽'
regIdCardName(text) // true or false
```
## TS编写
更好的代码提示
