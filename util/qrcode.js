// var qrcode = require('qrcode');

// qrcode.toDataURL("i am code",(err,url)=>{console.log(url)});

// var a = new Buffer("hello");

// console.log(a.toString('base64'));

// var b = a.toString('base64')

// console.log(b)

const crypto = require('crypto');
// const appKey = require('../app.js');
const a = crypto.createHmac('sha256', "asddsa12").update("asd").digest('hex')
console.log(a)