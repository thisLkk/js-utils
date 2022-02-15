# @lu-kk/js-utils

## 使用

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