const Router = require('koa-router')
const forgetPassword = require('./forgetPassword')
const login = require('./login')
const loginCheck = require('./logincheck')
const loginData = require('./logindata')
const sign = require('./sign')

const System = Router()


System.post('/forgetPassword', forgetPassword)
System.post('/login', login)
System.post('/loginCheck', loginCheck)
System.post('/loginData', loginData)
System.post('/sign', sign)


module.exports = System