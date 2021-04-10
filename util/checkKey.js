const crypto = require('crypto');
const appKey = require('../config').key;
var fn_checkKey = (data)=>{
    return crypto.createHmac('sha256', appKey).update(String(data)).digest('hex')
}

module.exports = fn_checkKey

// console.log(fn_checkKey("123456"+"123456"+"2000"+"2000"+"10"))