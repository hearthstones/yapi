/**
 * sunlands 账户验证
 */
// const yapi = require('../yapi.js');
// const aesEncrypt = require('aesEncrypt.js');
const http = require('http');
const AES = require('crypto-js/aes');
const CryptoJs = require('crypto-js');

exports.accountAuth = (username, password) => {
  // const { sunlandsLogin } = yapi.WEBCONFIG;
  const sunlandsLogin = {"server": "172.16.117.206", "port": 7799, "path": "/account/auth"};
  const clearText = {"username": username, "password": password};
  const cipherText = exports.encrypt(JSON.stringify(clearText));
  const account = {"data": cipherText, "channel": ""};
  const postData = JSON.stringify(account);

  const options = {
    host: sunlandsLogin.server,
    port: sunlandsLogin.port,
    path: sunlandsLogin.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
      console.log('响应中已无数据');
    });
  });

  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  // 将数据写入到请求主体。
  req.write(postData);
  req.end();
};

//todo: 方便测试，测试完删除
exports.encrypt = function(src) {
  // const { sunlandsLogin } = yapi.WEBCONFIG;
  // const key = CryptoJs.enc.Utf8.parse(sunlandsLogin.key); //密钥,十六位十六进制数
  // const iv = CryptoJs.enc.Utf8.parse(sunlandsLogin.iv);   //密钥偏移量,十六位十六进制数
  const key = CryptoJs.enc.Utf8.parse('just-for-encrypt');  //十六位十六进制数作为密钥
  const iv = CryptoJs.enc.Utf8.parse('8172635445362718');   //密钥偏移量
  let encrypted = AES.encrypt(src, key, {iv: iv, mode: CryptoJs.mode.CBC, padding: CryptoJs.pad.Pkcs7});
  return encrypted.ciphertext.toString().toUpperCase();
};

exports.accountAuth("luchao", "lc123456");
