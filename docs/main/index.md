---
title: js-utils文档
date: Tue Feb 15 2022 16:38:39 GMT+0800 (GMT+08:00)
---

## 方法集合

***
### regIDCardName

<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">功能:</span>&nbsp; [正则] 校验中国身份证姓名格式   </p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">版本:</span>&nbsp; 0.0.1</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">参数:</span></p>

| 入参 | 说明 | 类型 |
|------|------|------|------|
|name|必填项，身份证姓名（包含少数名族 · 格式，最大长度不超过20位）|String|
|callback|回调函数|regIDCardNameCallback|

<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">例子:</span></p>

```javascript
const obj = {};

function callback(res) {
  if (code == 0) {
    console.log('succse')
  }
};
JSUTILS.regIDCardName("鲁宽宽", callback)
```

<p>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: 700">扫描二维码测试:</span></p>
<img width="200px" height="200px" src="https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fm.zhuanzhuan.com%2Fu%2Fhunter_jssdk_page%2F%3FsdkId%3DregIDCardName"></img>

## 回调集合

***
### regIDCardNameCallback

| 回调入参 | 说明 | 类型 |
|------|------|------|------|
|res|回调参数 json串格式|Object|
|res.code - 状态值0：成功|状态值0：成功|Number|
|res.data|结果 true | false|Boolean|
|res.msg|信息|String|
