//跑步成绩
const checkToken = require('../../../util/checkToken');
const Student = require('../../../models/Student');
const RunGrade = require('../../../models/RunGrade');
const sequelize = require('../../../db');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_admin_run_grade = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0
    const runGrades = await RunGrade.findAll({
        offset: offset * 10,
        limit: 10
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
    })
    const runGradesCount = await RunGrade.findAll({}).catch(e=>{
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
    })
    ctx.body = ctx.app.service("获取跑步成绩数据成功", {
        data: runGrades,
        count: runGradesCount
    })
}
module.exports = fn_admin_run_grade