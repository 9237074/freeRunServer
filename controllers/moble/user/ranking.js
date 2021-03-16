const Student = require('../../../models/Student');

const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_ranking = async (ctx, next) => {

    const students = await Student.findAll({
        attributes: ["user", "department", "fraction"],
        order: [
            ["fraction", "desc"]
        ]
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /ranking.js')
    })

    ctx.body = ctx.app.service("students", students)
}
module.exports = fn_ranking