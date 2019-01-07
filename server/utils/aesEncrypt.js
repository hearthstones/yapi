const AES = require('crypto-js/aes');
const CryptoJs = require('crypto-js');
// const yapi = require("../yapi.js");

/**
 * AES加密(AES/CBC/PKCS5Padding)
 */
exports.encrypt = function(src) {
    // const { sunlandsLogin } = yapi.WEBCONFIG;
    // const key = CryptoJs.enc.Utf8.parse(sunlandsLogin.key); //密钥,十六位十六进制数
    // const iv = CryptoJs.enc.Utf8.parse(sunlandsLogin.iv);   //密钥偏移量,十六位十六进制数
    const key = CryptoJs.enc.Utf8.parse('just-for-encrypt');  //十六位十六进制数作为密钥
    const iv = CryptoJs.enc.Utf8.parse('8172635445362718');   //密钥偏移量
    let encrypted = AES.encrypt(src, key, {iv: iv, mode: CryptoJs.mode.CBC, padding: CryptoJs.pad.Pkcs7});
    return encrypted.ciphertext.toString().toUpperCase();
};

const object = {"username": "luchao", "password": "lc123456"};
let result = exports.encrypt(JSON.stringify(object));
console.log(result);


