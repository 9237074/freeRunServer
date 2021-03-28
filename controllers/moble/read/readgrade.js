//晨读成绩
const Student = require('../../../models/Student');
const ReadGrade = require('../../../models/ReadGrade');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

const read_grade = async (ctx, next) => {
    const { studentId } = ctx.request.body
    const readGrade = await ReadGrade.findOne({
        where:{
            studentId
        }
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /readgrade.js')
    })
    ctx.body = ctx.app.service("获取成绩数据成功", readGrade)
}
module.exports = read_grade