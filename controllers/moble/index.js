const Router = require('koa-router')
const Read = require('./read')
const Run = require('./run')
const System = require('./system')
const User = require('./user')


const Moble = new Router()

Moble.use('/read', Read.routes())
Moble.use('/run', Run.routes())
Moble.use('/system', System.routes())
Moble.use('/user', User.routes())

module.exports = Moble
