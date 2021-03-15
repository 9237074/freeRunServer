const Token = require("../models/Token")
const { InfoException, ParameterException, ServerException } = require('../util/http-exception');
const sequelize = require('../db');

const midCheckToken = async (ctx, next) => {
    const token = ctx.request.header.authorization || ''
    const realToken = await Token.findOne({
        where: {
            token: `${token}`
        }
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 5001)
    })
    if(realToken === null || realToken.token !== token){
        throw new ParameterException("非法请求", 40001)
    }
    ctx.request.body.studentId = realToken.uid
    await next()
}
module.exports = midCheckToken