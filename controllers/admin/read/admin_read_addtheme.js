//晨读主题页面 增加主题 adminreadaddtheme 参数offset change
const Student = require('../../../models/Student.js');
const ReadTheme = require('../../../models/ReadTheme');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_readAddTheme = async (ctx, next) => {

  const { theme, readTime, readDate, readSite, studentId, change } = ctx.request.body

  if (change == 'add') {
    const readTheme = await ReadTheme.create({
      theme: theme,
      readTime: readTime,
      readDate: readDate,
      readSite: readSite,
      people: studentId,
      status: 0
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /ranking.js')
    })
    ctx.body = ctx.app.service("添加主题成功", readTheme)
  }
  if (change == 'delete') {
    const readTheme = await ReadTheme.destroy({
      where: {
        theme: theme,
        readTime: readTime,
        readDate: readDate,
        readSite: readSite,
        people: studentId,
        status: 0
      }
    }).catch(e => {
      throw new ServerException("数据库异常", 50001, e.message + ' /ranking.js')
    })
    ctx.body = ctx.app.service("删除主题成功", readTheme)
  }

  throw new ParameterException("参数错误", 40002)
}
module.exports = fn_readAddTheme