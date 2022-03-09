---
home: true
heroText: JS-UTILS方法文档
tagline: 常用的函数库
actionText: 查看文档
actionLink: /main/
sidebar: false
footer: js-utils | Copyright © 2020-2022 鲁宽宽
---

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