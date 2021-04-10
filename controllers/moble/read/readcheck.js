const ReadRecord = require('../../../models/ReadRecord');
const ReadGrade = require('../../../models/ReadGrade')
const Student = require('../../../models/Student');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_readcheck = async (ctx, next) => {
    // 读书时间 读书地点 读书主题 负责人id 读书时间 加密key
    const { readTime, readSite, theme, peopleId, readDate, key, studentId } = ctx.request.body
    const str = `${readTime} + ${readSite} + ${theme} + ${peopleId} + ${readDate}`
    const checkKey = ctx.app.checkKey(str)

    if (checkKey !== key) {
        throw new ParameterException({
            msg: "非法数据，请正常打卡",
            data: {
                checkKey,
                key,
                str
            }
        }, 40002)
    }
    //去数据库找一下是否有数据，有就返回签到成功，没有就创建一个 a
    const [readRecords, isCreated] = await ReadRecord.findOrCreate({
        where: {
            uid: studentId,
            readTime,
            readDate,
            readSite,
            theme,
            peopleId
        },
        defaults: {
            uid: studentId,
            readTime,
            readDate,
            readSite,
            theme,
            peopleId,
            date: Date.now(),
            status: 0
        }
    }).catch(e => {
		throw new ServerException("数据库更新数据异常", 50001, e.message + ' /readcheck.js')
	})

    if(isCreated){
        const student = await Student.findOne({
            where: {
                studentId
            }
        })
        const [readGrade, gradeIsCreated] = await ReadGrade.findOrCreate({
            where: {
                studentId
            },
            defaults: {
                name: student.name,
                studentId,
                department: student.department,
                morningTimes: 0,
                duration: 0,
                fraction: 0
            }
        })
        if(!gradeIsCreated){
            const readGradeUpdate = await ReadGrade.update({
                morningTimes: readGrade.morningTimes + 1,
                duration: readGrade.duration + 1,
                fraction: readGrade.fraction + 1
            },{
                where: {
                    studentId
                }
            })
        }
        ctx.body = ctx.app.service("签到成功", readRecords)
    }else{
        throw new InfoException("请勿重复提交数据", 20001)
    }
}
module.exports = fn_readcheck