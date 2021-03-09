const Router = require('koa-router')
const stuData = require('./admin_stuData')

const CertStu = Router()


CertStu.post('/stuData', stuData)

module.exports = CertStu