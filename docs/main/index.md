# API集合
***
## 正则 

***
### regIdCardCode 

* **功能**:
  * 校验中国身份证号（包含x） 
* **版本**:
  * 0.0.22 
* **参数**:

| 参数 | 备注 | 类型 |  
|------|------|------|------|  
|code|必填项，身份证号|String|

* **返回值**:
  * {Boolean} true 或者 false 

* **示例**:

```javascript
import {
  regIdCardCode
} from "@lu-kk/js-utils"
const code = "41072219940212543x";
regIdCardCode(code) // true or false
```

* **扫描二维码测试**:  
<img width="200px" height="200px" src="https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fjintingyo.com%2Fh5%2Fjs-utils-test-page%3FsdkId%3DregIdCardCode%20"></img>

***
### regIdCardName 

* **功能**:
  * 校验中国身份证姓名（包含少数名族 · 格式，最大长度不超过20位） 
* **版本**:
  * 0.0.22 
* **参数**:

| 参数 | 备注 | 类型 |  
|------|------|------|------|  
|name|必填项，身份证姓名|String|

* **返回值**:
  * {Boolean} true 或者 false 

* **示例**:

```javascript
import {
  regIdCardName
} from "@lu-kk/js-utils"
const text = "鲁宽宽";
regIdCardName(text) // true or false
```

* **扫描二维码测试**:  
<img width="200px" height="200px" src="https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fjintingyo.com%2Fh5%2Fjs-utils-test-page%3FsdkId%3DregIdCardName%20"></img>
