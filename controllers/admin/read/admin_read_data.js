//晨跑数据
const checkToken = require('../../../util/checkToken');
const ReadRecord = require('../../../models/ReadRecord');
const ReadGrade = require('../../../models/ReadGrade');
const sequelize = require('../../../db')
const Student = require('../../../models/Student');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');
var fn_admin_read_data = async (ctx, next) => {

	//总晨读次数 allTimes 总参与人数 allPeople 人均参与次数 avgTimes
	const allData = {}
	//汇总
	allData.department = "汇总"
	//汇总的总次数
	allData.allTimes = await ReadRecord.findAll({
		attributes: ['id']
	}).then(a => a.length).catch(e => {
        throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_data.js')
	})
	//汇总的总参与人数
	allData.allPeople = Array.from(new Set(await ReadRecord.findAll({
		attributes: ['uid']
	}).then(a => {
		let arr = [];
		for (item in a) {
			arr.push(a[item].uid)
		};
		return arr
	}).catch(e => {
		throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_data.js')
	}))).length
	//汇总的人均参与次数
	allData.avgTimes = parseInt(allData.allTimes / allData.allPeople)

	let runData = []
	runData.push(allData)
	//分院系统计
	const departmentData = Array.from(new Set(await Student.findAll({
		attributes: ['department'],
		raw: true
	}).then(a => {
		let arr = [];
		for (item in a) {
			arr.push(a[item].department)
		};
		return arr
	}).catch(e => {
		throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_data.js')
	})))
	let abc = []
	for (item in departmentData) {
		//总晨读次数 allTimes 总参与人数 allPeople 人均参与次数 avgTimes
		let majorData = {};
		//院系
		majorData.department = departmentData[item]
		//院系的总次数
		majorData.allTimes = await Student.findAll({
			attributes: ['studentId'],
			where: {
				department: departmentData[item]
			},
			include: [{
				model: ReadRecord,
				as: 'rR',
				where: {
					uid: sequelize.col('student.studentId')
				}
			}]
		}).then(a => a.length).catch(e => {
			throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_data.js')
		})
		//院系的总参与人数
		majorData.allPeople = Array.from(new Set(await Student.findAll({
			attributes: ['studentId'],
			where: {
				department: departmentData[item]
			},
			include: [{
				model: ReadRecord,
				as: 'rR',
				where: {
					uid: sequelize.col('student.studentId')
				}
			}]
		}).then(a => {
			let arr = [];
			for (item in a) {
				arr.push(a[item].rR.uid)
			};
			return arr
		}).catch(e => {
			throw new ServerException("数据库异常", 50001, e.message + ' /admin_read_data.js')
		}))).length
		//院系的人均参与次数
		if (majorData.allPeople != 0) {
			majorData.avgTimes = parseInt(majorData.allTimes / majorData.allPeople)
		} else {
			majorData.avgTimes = 0
		}
		runData.push(majorData)
	}
	ctx.body = ctx.app.service("获取统计数据成功", runData)
}
module.exports = fn_admin_read_data
