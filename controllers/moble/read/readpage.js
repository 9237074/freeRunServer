const Student = require('../../../models/Student.js');
const ReadTheme = require('../../../models/ReadTheme');
var fn_readPage = async (ctx, next) => {
    const offset = ctx.request.body.offset || 0
    const readThemes = await ReadTheme.findAll({
        attributes: ['readId', 'theme', 'readTime', 'readDate', 'readSite', 'people'],
        offset: offset * 10,
        limit: 10
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /readPage.js')
    })
    const readThemeCount = await ReadTheme.findAll({}).then(res => res.length).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /readPage.js')
    })
    ctx.body = ctx.app.service("获取主题成功", {
        data: readThemes,
        count: readThemeCount
    })

}
module.exports = fn_readPage
