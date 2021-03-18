const Router = require('koa-router')
const errData = require('./admin_errData')
const login = require('./admin_login')
const stuData = require('./admin_stuData')

const System = Router()


System.post('/errData', errData)
System.post('/login', login)
System.post('/stuData', stuData)

module.exports = System