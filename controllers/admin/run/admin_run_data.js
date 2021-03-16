//晨跑数据
const checkToken = require('../../../util/checkToken');
const RunRecord = require('../../../models/runRecord');
const RunGrade = require('../../../models/RunGrade');
const sequelize = require('../../../db')
const Student = require('../../../models/Student');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

var fn_admin_run_data = async (ctx, next) => {
	let runData = []
	//ctx.response.body = `${Array.from(departmentData)}`
	//总晨读次数 allTimes 总参与人数 allPeople 人均参与次数 avgTimes
	const allData = {}
	//汇总
	allData.department = "汇总"
	//汇总的总次数
	allData.allTimes = await RunRecord.findAll({
		attributes: ['id']
	}).then(a => a.length).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
	})
	//汇总的总里程
	allData.allmileage = await RunGrade.findOne({
		attributes: [
			[sequelize.fn('SUM', sequelize.col('mileage')), 'allmileage']
		]
	}).then(a => {
		return JSON.parse(JSON.stringify(a)).allmileage
	}).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
	})
	//汇总的总参与人数
	allData.allPeople = Array.from(new Set(await RunRecord.findAll({
		attributes: ['uid']
	}).then(a => {
		let arr = [];
		for (item in a) {
			arr.push(a[item].uid)
		};
		return arr
	}).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
	}))).length
	//汇总的人均里程
	allData.avgmileage = parseInt(allData.allmileage / allData.allPeople)
	//汇总的人均参与次数
	allData.avgTimes = parseInt(allData.allTimes / allData.allPeople)
	runData.push(allData)

	//分院系统计
	const departmentData = Array.from(new Set(await Student.findAll({
		attributes: ['department'],
		raw: true
	}).then(a => {
		let arr = [];
		for (item in a) {
			arr.push(a[item].Department)
		};
		return arr
	}).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_run_data.js')
	})))
	// 迭代一下院系
	for (item in departmentData) {
		//总晨跑次数 allTimes 总参与人数 allPeople 院系总里程allmileage 人均参与次数 avgTimes
		let majorData = {};
		//院系名
		majorData.department = departmentData[item]
		//院系的总次数 allTimes
		majorData.allTimes = await RunRecord.findAll({
			include: [{
				model: Student,
				where: {
					user: sequelize.col('RunRecord.uid'),
					Department: departmentData[item]
				}
			}]
		}).then(a => a.length)
		//院系总里程 allmileage
		majorData.allmileage = await runGrade.findAll({
			attributes: ['mileage'],
			include: [{
				model: Student,
				where: {
					user: sequelize.col('RunGrade.uid'),
					department: departmentData[item]
				}
			}]
		}).then(a => {
			let allmileage = 0;
			for (item in a) {
				allmileage = allmileage + a[item].mileage;
			};
			return allmileage
		})
		//院系参与人数 allPeople
		majorData.allPeople = await RunGrade.findAll({
			include: [{
				model: Student,
				where: {
					department: majorData.department
				}
			}]
		}).then(a => {
			return a.length
		})
		if (majorData.allPeople != 0) {
			//院系的人均里程
			majorData.avgmileage = parseInt(majorData.allmileage / majorData.allPeople)

			//院系的人均参与次数
			majorData.avgTimes = parseInt(majorData.allTimes / majorData.allPeople)
		} else {
			majorData.avgmileage = 0;
			majorData.avgTimes = 0;
		}
		runData.push(majorData)
	}
	ctx.body = ctx.app.service("获取跑步统计数据成功", runData)
}
module.exports = fn_admin_run_data

