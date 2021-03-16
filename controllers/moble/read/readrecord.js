const ReadRecord = require('../../../models/ReadRecord');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');
var fn_readrecord = async (ctx, next) => {
    const { studentId } = ctx.request.body
    const offset = ctx.request.body.offset || 0

    const readRecords = await ReadRecord.findAll({
        where: {
            uid: studentId  
        }
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 50001, e.message + ' /runrecord.js')
    })

    const readRecord = await ReadRecord.findAll({
        attributes: [ "id", "uid", "readTime", "readDate", "readsite", "theme", "peopleId", "date", "updatedAt"],
        where: {
            uid: studentId
        },
        limit: 10,
        offset: 10 * offset
    }).catch(e => {
        throw new ServerException("数据库查找数据异常", 50001, e.message + ' /runrecord.js')
    })
    ctx.body = ctx.app.service("获取读书记录成功", {
        data: readRecord,
        count: readRecords.length
    })
}
module.exports = fn_readrecord
