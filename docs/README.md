---
home: true
heroText: JS-UTILS方法文档
tagline: 常用的函数库
actionText: 查看文档
actionLink: /main/
sidebar: false
footer: js-utils | Copyright © 2020-2022 鲁宽宽
---
## 命令

```bash
# 开发启动
$ npm run dev
# 构建
$ npm run build
# 发布正式版本
$ npm run pub
# 发布测试版本
$ npm run pub-dev
# 发布文档
$ npm run doc
```

## 使用

### npm

```javascript
$ npm i @lu-kk/js-utils -save
```
### 代码片段

```javascript
import JSUTILS from '@lu-kk/js-utils'
JSUTILS.regIDCardName('鲁宽宽', (res) => {
  const { code, data, msg } = res;
  if (code == 0) {
    console.log('success')
  }
})
```