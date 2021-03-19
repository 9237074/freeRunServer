//晨读主题页面 增加主题 adminreadaddtheme 参数offset change
const Student = require('../../../models/Student.js');
const ReadTheme = require('../../../models/ReadTheme');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_readAddTheme = async (ctx, next) => {

  const { theme, readTime, readDate, readSite, peopleId, change } = ctx.request.body
  console.log(peopleId)
  if (change == 'add') {
    const readTheme = await ReadTheme.create({
      theme: theme,
      readTime: readTime,
      readDate: readDate,
      readSite: readSite,
      people: peopleId,
      status: 0
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_addtheme.js')
    })
    ctx.body = ctx.app.service("添加主题成功", readTheme)
    return
  }
  if (change === 'delete') {
    const readTheme = await ReadTheme.destroy({
      where: {
        theme: theme,
        readTime: readTime,
        readDate: readDate,
        readSite: readSite,
        people: peopleId,
        status: 0
      }
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /ranking.js')
    })
    ctx.body = ctx.app.service("删除主题成功", readTheme)
    return
  }

  throw new ParameterException("参数错误", 40002)
}
module.exports = fn_readAddTheme