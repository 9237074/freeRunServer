const { HttpException } = require('../util/http-exception')

const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof HttpException) {
            console.log("捕获异常", error.message)
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }else{
            console.log("未捕获异常", error)
            ctx.body = {
                msg: '服务器发生未知错误',
                error_code: 500,
                request: `${ctx.method} ${ctx.path}`,
                info: error.message || '',
            }
            // ctx.status = 500
        }
    }
}

module.exports = errorHandler