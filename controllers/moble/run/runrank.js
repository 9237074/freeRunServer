const RunGrade = require('../../../models/RunGrade');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_runrank = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0

    const runGradesCount = await RunGrade.findAll({
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 50001, e.message + ' /runrank.js')
    })

    const runGrades = await RunGrade.findAll({
        limit: 10,
        offset: 10 * offset,
        order: [
            ['fraction', 'DESC']
        ]
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 50001, e.message + ' /runrank.js')
    })

    ctx.body = ctx.app.service("获取跑步排行榜数据成功", {
        data: runGrades,
        count: runGradesCount.length
    })
}
module.exports = fn_runrank
