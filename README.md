# @lu-kk/js-utils
具体使用请查看文档【[文档地址](http://jintingyo.com/web/js-utils/)】
## 说明

### npm

```javascript
$ npm i @lu-kk/js-utils -save
```
### 使用

```javascript
import JSUTILS from '@lu-kk/js-utils'
JSUTILS.regIDCardName('鲁宽宽', (res) => {
  const { code, data, msg } = res;
  if (code == 0) {
    console.log('success')
  }
})
```