const crypto = require('crypto');
const appKey = require('../config').key;
var fn_checkKey = (data)=>{
    return crypto.createHmac('sha256', appKey).update(String(String(data))).digest('hex')
}

module.exports = fn_checkKey
