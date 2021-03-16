const Student = require('../../../models/Student');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_myrank = async (ctx, next) => {

    const { studentId } = ctx.request.body;

    const student = await Student.findOne({
        where: {
            uid: studentId
        }
    }).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /myrank.js')
    })
    
    ctx.body = ctx.app.service("获取我的分数数据成功", student)
}
module.exports = fn_myrank
