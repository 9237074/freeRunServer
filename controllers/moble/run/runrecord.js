const RunRecord = require('../../../models/RunRecord');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var runrecord = async (ctx, next) => {
    const { studentId } = ctx.request.body
    const offset = ctx.request.body.offset || 0

    const [runRecord, count] = await RunRecord.findAndCountAll({
        attributes: [ "id", "uid", "runTime", "spendTime", "mileage", "stepCount", "speed", "gps", "updatedAt"],
        where: {
            uid: studentId  
        },
        limit: 10,
        offset: 10 * offset
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 50001, e.message + ' /runrecord.js')
    })
    ctx.body = ctx.app.service("获取跑步记录成功", {
        data: runRecord,
        count
    })
}
module.exports = runrecord
