//学生信息
const Student = require('../../../models/Student');
var fn_admin_stuData = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0
    const students = await Student.findAll({
        attributes: ['uid', 'studentId', 'name', 'department', 'profession', 'grade'],
        limit: 10,
        offset: offset * 10
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_stuData.js')
    })
    const studentCount = await Student.findAll({}).then(res => res.length).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_stuData.js')
    })
    ctx.body = ctx.app.service("获取用户信息成功", {
        data: students,
        count: studentCount
    })
}
module.exports = fn_admin_stuData