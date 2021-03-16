//晨读记录 token type status={all vaild invaild}
const Student = require('../../../models/Student');
const ReadRecord = require('../../../models/ReadRecord');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_admin_read_record = async (ctx, next) => {
  const { status } = ctx.request.body // all valid invalid
  const offset = ctx.request.body.osffset || 0

  if (status === "all") {
    const readRecordAll = await ReadRecord.findAll({
      offset: offset * 10,
      limit: 10
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_grade.js')
    })
    const readRecordAllCount = await ReadRecord.findAll({}).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_grade.js')

    })
    ctx.body = ctx.app.service("获取全部数据成功", {
      data: readRecordAll,
      count: readRecordAllCount.length
    })
  }
  if (status === "valid") {
    const readRecordValid = await ReadRecord.findAll({
      where:{
        status: "valid"
      },
      offset: offset * 10,
      limit: 10
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_record.js')
    })
    const readRecordValidCount = await ReadRecord.findAll({
      where:{
        status: "vaild"
      }
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_record.js')

    })
    ctx.body = ctx.app.service("获取全部数据成功", {
      data: readRecordValid,
      count: readRecordValidCount.length
    })
  }
  if (status === "invalid") {
    const readRecordInvalid = await ReadRecord.findAll({
      where:{
        status: "invalid"
      },
      offset: offset * 10,
      limit: 10
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_record.js')
    })
    const readRecordInvalidCount = await ReadRecord.findAll({
      where:{
        status: "invaild"
      }
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_record.js')

    })
    ctx.body = ctx.app.service("获取全部数据成功", {
      data: readRecordInvalid,
      count: readRecordInvalidCount.length
    })
  }
  throw new ParameterException("参数错误", 40002)
}
module.exports = fn_admin_read_record