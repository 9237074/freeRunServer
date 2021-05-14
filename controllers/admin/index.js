const Router = require('koa-router')
const Read = require('./read')
const Run = require('./run')
const System = require('./system')
const User = require('./user')


const Admin = new Router()

Admin.get('/', async ctx => ctx.response.redirect('/admin.html'))
Admin.use('/read', Read.routes())
Admin.use('/run', Run.routes())
Admin.use('/system', System.routes())
Admin.use('/user', User.routes())

module.exports = Admin
