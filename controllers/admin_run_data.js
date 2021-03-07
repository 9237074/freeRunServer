//晨跑数据
const checkToken = require('../util/checkToken');
const sportsRecord = require('../models/SportsRecord');
const runGrade = require('../models/RunGrade');
const sequelize = require('../db')
const Student = require('../models/Student');
var fn_admin_run_data = async (ctx, next) => {
	var utoken = ctx.query.token;
	let data = await checkToken(utoken).then((a) => {
		return a
	});
	if (data == null) {
		let msg = `参数有误`
		ctx.response.body =
			`{
            "status":"successful",
            "msg":"${msg}"
        }`
	} else if (data == "参数错误") {
		let msg = `参数错误`
		ctx.response.body =
			`{
            "status":"successful",
            "msg":"${msg}"
        }`
	} else {
		let runData = []
		//ctx.response.body = `${Array.from(departmentData)}`
		//总晨读次数 allTimes 总参与人数 allPeople 人均参与次数 avgTimes
		var allData = {}
		//汇总
		allData.department = "汇总"
		//汇总的总次数
		allData.allTimes = await sportsRecord.findAll({
			attributes: ['id']
		}).then(a => {
			return a.length
		}).catch(err => {
			console.log('admin_run_data.js err:', err)
		})
		//汇总的总里程
		allData.allmileage = await runGrade.findOne({
			attributes: [
				[sequelize.fn('SUM', sequelize.col('mileage')), 'allmileage']
			]
		}).then(a => {
			return JSON.parse(JSON.stringify(a)).allmileage
		}).catch(err => {
			console.log('admin_read_data.js err:', err)
		})
		//汇总的总参与人数
		allData.allPeople = Array.from(new Set(await sportsRecord.findAll({
			attributes: ['uid']
		}).then(a => {
			let arr = [];
			for (item in a) {
				arr.push(a[item].uid)
			};
			return arr
		}).catch(err => {
			console.log('admin_read_data.js err:', err)
		}))).length
		//汇总的人均里程
		allData.avgmileage = parseInt(allData.allmileage / allData.allPeople)
		//汇总的人均参与次数
		allData.avgTimes = parseInt(allData.allTimes / allData.allPeople)
		runData.push(allData)

		//分院系统计
		var departmentData = Array.from(new Set(await Student.findAll({
			attributes: ['Department'],
			raw: true
		}).then(a => {
			let arr = [];
			for (item in a) {
				arr.push(a[item].Department)
			};
			return arr
		}).catch(err => {
			console.log('admin_read_data.js err:', err)
		})))
		// 迭代一下院系
		for (item in departmentData) {
			//总晨跑次数 allTimes 总参与人数 allPeople 院系总里程allmileage 人均参与次数 avgTimes
			let majorData = {};
			//院系名
			majorData.department = departmentData[item]
			//院系的总次数 allTimes
			majorData.allTimes = await sportsRecord.findAll({
				include: [{
					model: Student,
					where: {
						user: sequelize.col('sportsRecord.uid'),
						Department: departmentData[item]
					}
				}]
			}).then(a => {
				return a.length
			})
			//院系总里程 allmileage
			majorData.allmileage = await runGrade.findAll({
				attributes: ['mileage'],
				include: [{
					model: Student,
					where: {
						user: sequelize.col('runGrade.uid'),
						Department: departmentData[item]
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
			majorData.allPeople = await runGrade.findAll({
				include: [{
					model: Student,
					where: {
						Department: majorData.department
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
		ctx.response.body = JSON.stringify(runData)
	}
}
module.exports = {
	'GET /adminRunData': fn_admin_run_data
};

/*var demo = await Student.findAll({
          attributes:['name','department'],
          	where:{department:'a'},
          	include:[{
          		model:readGrade,
          		as:'rg',
              	attributes:['morningTimes',[sequelize.fn('SUM', sequelize.col('morningTimes')), 'has_times']]
          }],
          raw:true
        }).then(a=>{return JSON.stringify(a)}).catch(err=>{console.log('admin_read_data_demo.js err:',err)})
        ctx.response.body = `${demo}`*/
