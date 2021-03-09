const Router = require('koa-router')

const midCheckToken = require('../../middleware/checkToken')

const Test = new Router()

Test.get('/', midCheckToken, async (ctx, next) => {
    console.log(ctx.app.keys)
    ctx.response.body = ctx
})

module.exports = Test