const checkToken = require('../util/checkToken');
const Token = require("../models/Token")
const sequelize = require('../db');
const midCheckToken = async (ctx, next) => {
    const token = ctx.request.header.authorization || ''
    console.log(token)
    const realToken = await Token.findOne({
        where: {
            token: `${token}`
        }
    }).then(value => value.token)
    console.log(realToken)
    if(realToken !== token){
        ctx.throw(401, {})
    }
    next()
}
module.exports = midCheckToken