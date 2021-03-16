//晨读成绩
const Student = require('../../../models/Student');
const ReadGrade = require('../../../models/ReadGrade');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

const fn_admin_read_grade = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0
    const readGrades = await ReadGrade.findAll({
        offset: offset * 10,
        limit: 10
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_grade.js')
    })
    const readGradeCount = await ReadGrade.findAll({}).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_grade.js')
    })
    ctx.body = ctx.app.service("获取成绩数据成功", {
        data: readGrades,
        count: readGradeCount.length
    })
}
module.exports = fn_admin_read_grade