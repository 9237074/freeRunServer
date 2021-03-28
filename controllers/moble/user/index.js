const Router = require('koa-router')
const myRank = require('./myrank')
const qrCode = require('./qrcode')
const ranking = require('./ranking')
const upDate = require('./update')
const userInfo = require('./userInfo')

const User = Router()


User.post('/myRank', myRank)
User.post('/qrCode', qrCode)
User.post('/ranking', ranking)
User.post('/upDate', upDate)
User.post('/userInfo', userInfo)

module.exports = User