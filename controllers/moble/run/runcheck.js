const RunRecord = require('../../../models/RunRecord');
const RunGrade = require('../../../models/RunGrade');
const Student = require('../../../models/Student')

const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var runcheck = async (ctx, next) => {

	// 跑步时间 花费时间 里程 签到点数量 速度 gps信息 详细信息 状态 检查密钥
	const { runTime, spendTime, mileage, stepCount, speed, gps, key, studentId } = ctx.request.body
	// 加密信息
	const checkKey = ctx.app.checkKey(runTime + spendTime + mileage + stepCount + speed)
	if (checkKey !== key) {
		throw new ParameterException("非法数据，请正常打卡", 40002)
	}
	// 更新跑步记录
	const [runRecord, isCreatedRecord] = await RunRecord.findOrCreate({
		where: {
			runTime
		},
		defaults: {
			uid: studentId,
			runTime,
			spendTime,
			mileage,
			stepCount,
			speed,
			gps
		}
	}).catch(e => {
		throw new ServerException("数据库更新数据异常", 50001, e.message + ' /runcheck.js')
	})

	if (!isCreatedRecord) {
		throw new InfoException("请勿重复提交数据", 20001)
	}

	// 更新跑步成绩

	const student = await Student.findOne({
		where: {
			studentId
		}
	}).catch(e => {
		throw new ServerException("数据库获取数据异常", 50001, e.message + ' /runcheck.js')
	})
	if (student === null) {
		throw new ParameterException("当前用户不存在", 40002)
	}

	const [runGrade, isCreatedGrade] = await RunGrade.findOrCreate({
		where: {
			studentId
		},
		defaults: {
			name: student.name,
			studentId,
			runTimes: 1,
			mileage,
			duration: spendTime,
			fraction: 1
		}
	}).catch(e => {
		throw new ServerException("数据库创建数据异常", 50001, e.message + ' /runcheck.js')
	})
	if (isCreatedGrade) {
		ctx.body = ctx.app.service("跑步打卡成功", runGrade)
		return
	}

	const [num, runGradeU] = await RunGrade.update({
		runTimes: runGrade.runTimes++,
		mileage: Number(runGrade.mileage) + Number(mileage),
		duration: Number(runGrade.duration) + Number(spendTime),
		fraction: runGrade.fraction + 1
	}, {
		where: {
			studentId
		}
	}).catch(e => {
		throw new ServerException("数据库更新数据异常", 50001, e.message + ' /runcheck.js')
	})

	ctx.body = ctx.app.service("跑步打卡成功", runGradeU)

}
module.exports = runcheck
