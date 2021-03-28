//跑步成绩
const Student = require('../../../models/Student');
const RunGrade = require('../../../models/RunGrade');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var run_grade = async (ctx, next) => {
    const { studentId } = ctx.request.body
    console.log({studentId})
    const runGrade = await RunGrade.findOne({
        where: {
            studentId
        }
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
    })
    ctx.body = ctx.app.service("获取跑步成绩数据成功", runGrade)
}
module.exports = run_grade