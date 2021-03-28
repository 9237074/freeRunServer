const Student = require('../../../models/Student');
const Token = require('../../../models/Token');
// const loginLog = require('../../../models/LoginLog')
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

const login = async (ctx, next) => {
    const { studentId, pdToken } = ctx.request.body
    console.log({studentId, pdToken})
    const logToken = ctx.app.checkKey(studentId + pdToken + Date.now())
    const realUser = await Student.findOne({
        attributes: ["user", "studentId", "name", "department", "profession", "grade", "fraction", "status"],
        where: {
            studentId: studentId,
            password: pdToken
        }
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /login0.js')
    })

    if(realUser === null){
        throw new ParameterException("账号或者密码错误", 40002)
    }

    const [tokenSql, isCreated] = await Token.findOrCreate({
        where: {
            token: logToken,
        },
        defaults: {
            studentId,
            token: logToken,
            time: Date.now() / 1000
        }
    }).catch(e => {
        console.log(e)
        throw new ServerException("数据库异常", 50001, e.message + ' /login1.js')
    })
    realUser.setDataValue("token", logToken)
    ctx.body = ctx.app.service("登录成功", realUser)
}

module.exports = login
