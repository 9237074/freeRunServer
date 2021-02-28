//晨跑数据
const checkToken = require('../util/checkToken');
const readRecord = require('../models/readRecord');
const readGrade = require('../models/readGrade');
const sequelize = require('../db')
const Student = require('../models/Student');
var fn_admin_read_data = async (ctx, next) => {
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
		allData.allTimes = await readRecord.findAll({
			attributes: ['id']
		}).then(a => {
			return a.length
		}).catch(err => {
			console.log('admin_read_data.js err:', err)
		})
		//汇总的总参与人数
		allData.allPeople = Array.from(new Set(await readRecord.findAll({
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
					Department: departmentData[item]
				},
				include: [{
					model: readRecord,
					as: 'rR',
					where: {
						uid: sequelize.col('student.studentId')
					}
				}]
			}).then(a => {
				return a.length
			}).catch(err => {
				console.log('admin_read_data.js err:', err)
			})
			//院系的总参与人数
			majorData.allPeople = Array.from(new Set(await Student.findAll({
				attributes: ['studentId'],
				where: {
					Department: departmentData[item]
				},
				include: [{
					model: readRecord,
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
			}).catch(err => {
				console.log('admin_read_data.js err:', err)
			}))).length
			//院系的人均参与次数
			if(majorData.allPeople != 0){
				majorData.avgTimes = parseInt(majorData.allTimes / majorData.allPeople)
			}else{
				majorData.avgTimes = 0
			}
			runData.push(majorData)
		}
		ctx.response.body = JSON.stringify(runData)
	}
}
module.exports = {
	'GET /adminReadData': fn_admin_read_data
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
