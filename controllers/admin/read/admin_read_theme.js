//晨读主题页面 adminreadtheme 参数offset
const Student = require('../../../models/Student.js');
const ReadTheme = require('../../../models/ReadTheme');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

const fn_readTheme = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0
    const readThemesCount = await ReadTheme.findAll({
        attributes: ['theme', 'readTime', 'readDate', 'readSite', 'people']
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_theme.js')
    })
    const readThemes = await ReadTheme.findAll({
        attributes: ['theme', 'readTime', 'readDate', 'readSite', 'people'],
        offset: offset * 10,
        limit: 10
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_theme.js')
    })
    ctx.body = ctx.app.service("获取主题成功", {
        data: readThemes,
        count: readThemesCount.length
    })
}
module.exports = fn_readTheme