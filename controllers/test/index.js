const Router = require('koa-router')

const midCheckToken = require('../../middleware/checkToken')

const Test = new Router()

Test.get('/checkToken', midCheckToken, async (ctx, next) => {
    // console.log(ctx.app.keys)
    // const token = ctx.request.header.authorization
    ctx.response.body = "success"
})

module.exports = Test