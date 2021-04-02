//跑步记录 token type status={all vaild invaild}
const Student = require('../../../models/Student');
const RunRecord = require('../../../models/RunRecord');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

const sequelize = require('../../../db');
var fn_admin_run_record = async (ctx, next) => {
  const { status } = ctx.request.body
  const offset = ctx.request.body.offset || 0
  if (status === "all") {
    const all = await RunRecord.findAll({
      offset: offset * 10,
      limit: 10
    }).catch(e => {

    })
    const count = await RunRecord.findAll({}).then(a => a.length).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_record.js')
    })

    ctx.body = ctx.app.service("获取全部数据成功", {
      data: all,
      count
    })
    return
  }
  if (status === "valid") {
    const valids = await RunRecord.findAll({
      where: {
        status: "valid"
      },
      offset: offset * 10,
      limit: 10
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_record.js')
    })
    const count = await RunRecord.findAll({
      where: {
        status: "valid"
      }
    }).then(a => a.length).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
    })
    ctx.body = ctx.app.service("获取全部数据成功", {
      data: valids,
      count
    })
    return
  }
  if (status === "invalid") {
    const invalids = await RunRecord.findAll({
      where: {
        status: "invalid"
      },
      offset: offset * 10,
      limit: 10
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_record.js')
    })
    const count = await RunRecord.findAll({
      where: {
        status: "invalid"
      }
    }).then(a => a.length).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
    })
    ctx.body = ctx.app.service("获取全部数据成功", {
      data: invalids,
      count
    })
    return
  }
  throw new ParameterException("参数错误", 40002)

}
module.exports = fn_admin_run_record