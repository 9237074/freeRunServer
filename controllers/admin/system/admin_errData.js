//学生异常信息
const Student = require('../../../models/Student');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');
var fn_admin_errData = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0
    const students = await Student.findAll({
        attributes: ['uid', 'studentId', 'name', 'department', 'profession', 'grade'],
        limit: 10,
        offset: offset * 10,
        where: {
            status: 2
        }
    })
    const studentCount = await Student.findAll({
        where: {
            status: 2
        }
    }).then(res => res.length).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_errData.js')
    })
    ctx.body = ctx.app.service("获取异常学生信息成功", {
        data: students,
        count: studentCount
    })
}
module.exports = fn_admin_errData