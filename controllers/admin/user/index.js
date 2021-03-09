const Router = require('koa-router')
const stuData = require('./admin_stuData')

const User = Router()


User.post('/stuData', stuData)

module.exports = User