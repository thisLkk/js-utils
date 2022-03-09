function regIdCardName(name) {
  var reg = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  if (!name) return false;
  if (!reg.test(name)) return true;
  return false;
}

function regIdCardNameTest(name, callback) {
  var reg = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,19}$/;
  if (!name) return callback(false);
  if (!reg.test(name)) return callback(true);
  return callback(false);
}

var index = {
  regIdCardName: regIdCardName,
  regIdCardNameTest: regIdCardNameTest
};

export default index;
export { regIdCardName, regIdCardNameTest };
