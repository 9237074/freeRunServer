const Router = require('koa-router')
const myRank = require('./myrank')
const qrCode = require('./qrcode')
const ranking = require('./ranking')
const upDate = require('./update')

const User = Router()


User.post('/myRank', myRank)
User.post('/qrCode', qrCode)
User.post('/ranking', ranking)
User.post('/upDate', upDate)

module.exports = User