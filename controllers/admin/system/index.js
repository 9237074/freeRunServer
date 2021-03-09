const Router = require('koa-router')
const errData = require('./admin_errData')
const login = require('./admin_login')

const System = Router()


System.post('/errData', errData)
System.post('/login', login)

module.exports = System