/**
 * sunlands 账户验证
 */
const yapi = require('../yapi.js');
const AES = require('crypto-js/aes');
const CryptoJs = require('crypto-js');
const http = require('http');

exports.accountAuth = (username, password) => {
  // const sunlandsLogin = {"server": "172.16.117.206", "port": 7799, "path": "/account/auth"};
  const { sunlandsLogin } = yapi.WEBCONFIG;
  const clearText = {"username": username, "password": password};
  const cipherText = exports.aesEncrypt(JSON.stringify(clearText));
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

/**
 * AES加密(AES/CBC/PKCS5Padding)
 */
exports.aesEncrypt = function(src) {
  const { sunlandsLogin } = yapi.WEBCONFIG;
  const key = CryptoJs.enc.Utf8.parse(sunlandsLogin.key); //密钥,十六位十六进制数
  const iv = CryptoJs.enc.Utf8.parse(sunlandsLogin.iv);   //密钥偏移量,十六位十六进制数
  let encrypted = AES.encrypt(src, key, {iv: iv, mode: CryptoJs.mode.CBC, padding: CryptoJs.pad.Pkcs7});
  return encrypted.ciphertext.toString().toUpperCase();
};