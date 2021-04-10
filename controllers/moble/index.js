const Router = require('koa-router')
const Read = require('./read')
const Run = require('./run')
const System = require('./system')
const User = require('./user')
const checkToken = require("../../middleware/checkToken")

const Moble = new Router()

Moble.use('/read', checkToken, Read.routes())
Moble.use('/run', checkToken, Run.routes())
Moble.use('/system', System.routes())
Moble.use('/user', checkToken, User.routes())

module.exports = Moble
