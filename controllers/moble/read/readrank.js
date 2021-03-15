const ReadGrade = require('../../../models/ReadGrade');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');
const fn_readrank = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0

    const readGradeCount = await ReadGrade.findAll({
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 50001, e.message + ' /readrank.js')
    })

    const readGrades = await ReadGrade.findAll({
        order: [['fraction', 'DESC']],
        limit: 10,
        offset: 10 * offset
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 50001, e.message + ' /readrank.js')
    })

    ctx.body = ctx.app.service("获取跑步排行榜数据成功", {
		data: readGrades,
		count: readGradeCount.length
	})
}
module.exports = fn_readrank
