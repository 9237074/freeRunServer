//学生认证信息 待审核
const checkToken = require('../../util/checkToken');
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const sequelize = require('../../db');
var fn_admin_cert_stu_0 = async (ctx, next) => {
    const student = await Student.findAll({
        attributes: ['uid', 'studentId', 'name', 'gender', 'Department', 'profession', 'grade', 'status'],
        where: {
            status: 0
        },
        limit: 10,
    }).then((a) => { return JSON.stringify(a) });
    // console.log(student);
    let msg = `${student}`
    ctx.response.body = `{"status":"successful","msg":${msg}}`;
}
module.exports = {
    'GET /certStu0': fn_admin_cert_stu_0
};