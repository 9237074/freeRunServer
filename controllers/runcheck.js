const sportsRecord = require('../models/SportsRecord');
const runGrade = require('../models/RunGrade');
const Student = require('../models/Student')
const checkToken = require('../util/checkToken');
const checkKey = require('../util/checkKey')
var fn_runcheck = async (ctx, next) => {
	var
		utoken = ctx.request.body.token,
		runTime = ctx.request.body.runTime,
		spendTime = ctx.request.body.spendTime,
		mileage = ctx.request.body.mileage,
		stepCount = ctx.request.body.stepCount,
		speed = ctx.request.body.speed,
		gps = JSON.stringify(ctx.request.body.gps),
		detail = ctx.request.body.detail,
		status = ctx.request.body.status,
		key = ctx.request.body.key;
	let data = await checkToken(utoken).then((a) => {
		return a
	});
	if (data == null || data == "参数错误") {
		console.log('参数错误,data:',data);
		ctx.response.body = {
			"status": "successful",
			"msg": "参数错误"
		}
	} else {
		console.log('data:', spendTime, mileage, speed, utoken);
		var rkey = await checkKey(`${spendTime}+${mileage}+${speed}+${utoken}`).then(a => {
			return a
		}).catch(err => {
			console.log('runcheck.js err:', err)
		})
		console.log('key:', key, 'rkey:', rkey)
		if (rkey == key) {
			var runcheck = await sportsRecord.create({
				uid: data,
				runTime: runTime,
				spendTime: spendTime,
				mileage: mileage,
				stepCount: stepCount,
				speed: speed,
				gps: `${gps}`,
				detail: detail,
				status: 0
			}).then(a => {
				return a
			}).catch(err => {
				console.log('runcheck.js err:', err)
			});
			var runGradeData = await runGrade.findOne({
				where: {
					uid: data
				}
			}).then(a => {
				return a
			}).catch(err => {
				console.log('runcheck.js err:', err)
			})
			if (runGradeData == null) {
				let name = await Student.findOne({
					where: {
						studentId: data
					}
				}).then(a => {
					return a.name
				}).catch(err => {
					console.log('runcheck.js err:', err)
				})
				console.log('name:', JSON.stringify(name))
				await runGrade.create({
						uid: data,
						name: name,
						studentId: data,
						runTimes: 1,
						mileage: mileage,
						punch: 0,
						morningTimes: 0,
						morningmileage: 0,
						duration: 0,
						fraction: 0
					}).then(a => {
						ctx.response.body = `{"code":0,"msg":"跑步完成","data":${a}}`
					})
					.catch(err => {
						console.log('runcheck.js err:', err);
						ctx.response.body = `{"code":1,"msg":"服务器异常","data":"null"}`
					})
			} else {
				let gradeRunTimes = await sportsRecord.findAll({
						where: {
							uid: data
						}
					})
					.then(a => {
						console.log('times.length', a.length);
						return a.length
					})
				await runGrade.update({
						runTimes: gradeRunTimes,
						mileage: Number(mileage) + Number(runGradeData.mileage),
					}, {
						where: {
							studentId: data
						}
					}).then(a => {
						ctx.response.body = `{"code":0,"msg":"跑步完成","data":${a}}`
					})
					.catch(err => {
						console.log('runcheck.js err:', err);
						ctx.response.body = `{"code":1,"msg":"服务器异常","data":"null"}`
					})
			}
		} else {
			ctx.response.body = `{"code":1,"msg":"key校验失败","data":"null"}`
		}
	}
}
module.exports = {
	'POST /runcheck': fn_runcheck
};
