const qrcode = require('qrcode');
const ReadTheme = require("../../../models/ReadTheme")
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

// qrcode.toDataURL("i am code",(err,url)=>{console.log(url)});
const fn_qrcode = async (ctx, next) => {
    const { offset, studentId } = ctx.request.body

    const readTheme = await ReadTheme.findOne({
        where: {
            people: studentId
        }
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /qrcode.js')
    })

    if(!readTheme){
        throw new ParameterException("您不是负责人", 40002)
    }

    const dataUrl = await qrcode.toDataURL(`${JSON.stringify(theme)}`)

    ctx.body = ctx.app.service("登录成功", dataUrl)
}
module.exports = fn_qrcode
