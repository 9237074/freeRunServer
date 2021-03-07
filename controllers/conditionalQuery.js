//test
//第一步，先找到所有跑步记录
//第二步，循环获取item的年月日
//第三步，判断item的年月日是否在设定的范围，在的话就push
//第四步，返回json
const checkToken = require('../util/checkToken');
const Student = require('../models/Student');
const sportsRecord = require('../models/SportsRecord');
const runGrade = require('../models/RunGrade');
const readRecord = require('../models/ReadRecord');
const readGrade = require('../models/ReadGrade');
const studentInfo = require('../models/StudentInfo');
const sequelize = require('../db');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
var fn_conditionalquery = async (ctx, next) => {
	//获取开始时间和截至时间
	//startTime 查询开始时间
	//endTime 查询结束时间
	//table 查询表 ['runrecord','rungrade','readrecord','readgrade']
	//sruId 查询学号 默认为'null'
	//department 查询院系 默认为'null'
	var
		startTime = ctx.query.startTime || '2000-01-01',
		endTime = ctx.query.endTime || '9999-12-12',
		table = ctx.query.table || 'null',
		page = ctx.query.page || 0,
		stuId = ctx.query.stuId || 'null',
		department = ctx.query.department || 'null',
		utoken = ctx.query.token || 'null';
	let data = await checkToken(utoken).then((a) => {
		return a
	}).catch((err) => {
		console.log(err);
		return null
	});
	//响应数组a
	var resp = {}
	resp.length = null
	resp.data = []
	var a = []
	if (data == null || data == '参数错误') {
		let msg = `参数有误`
		ctx.response.body =
			`{
	        "status":"successful",
	        "msg":"${msg}"
	    }`
	} else {
		switch (table) {
			//跑步记录
			case 'runrecord':
				if( stuId == 'null' && department == 'null' ){
					resp.length = await sportsRecord.findAll({
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await sportsRecord.findAll({
						attributes: ['id', 'uid', 'runTime', 'spendTime', 'mileage', 'stepCount', 'speed', 'detail', 'status',
							'createdAt'
						],
						include:[{
						    model:Student,
						    as:'Rs',
						    attributes:['Department']
						}],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId != 'null' && department == 'null' ){
					resp.length = await sportsRecord.findAll({
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await sportsRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department']
						}],
						attributes: ['id', 'uid', 'runTime', 'spendTime', 'mileage', 'stepCount', 'speed', 'detail', 'status',
							'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							uid:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId == 'null' && department != 'null' ){
					resp.length = await sportsRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await sportsRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['id', 'uid', 'runTime', 'spendTime', 'mileage', 'stepCount', 'speed', 'detail', 'status',
							'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else{
					resp.length = await sportsRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							uid:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await sportsRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['id', 'uid', 'runTime', 'spendTime', 'mileage', 'stepCount', 'speed', 'detail', 'status',
							'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							uid:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}
				break;
				//跑步成绩
			case 'rungrade':
				if( stuId == 'null' && department == 'null' ){
					resp.length = await runGrade.findAll({
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await runGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department']
						}],
						attributes: ['name', 'uid', 'runTimes', 'punch', 'mileage', 'morningTimes', 'morningmileage', 'duration',
							'fraction', 'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId != 'null' && department == 'null' ){
					resp.length = await runGrade.findAll({
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await runGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department']
						}],
						attributes: ['name', 'uid', 'runTimes', 'punch', 'mileage', 'morningTimes', 'morningmileage', 'duration',
							'fraction', 'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId == 'null' && department != 'null' ){
					resp.length = await runGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await runGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['name', 'uid', 'runTimes', 'punch', 'mileage', 'morningTimes', 'morningmileage', 'duration',
							'fraction', 'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else{
					resp.length = await runGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}}).then((a)=>{return a.length});
					await runGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['name', 'uid', 'runTimes', 'punch', 'mileage', 'morningTimes', 'morningmileage', 'duration',
							'fraction', 'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}
				break;
				//悦读记录
			case 'readrecord':
				if( stuId == 'null' && department == 'null' ){
					resp.length = await readRecord.findAll({
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readrecordData = await readRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department']
						}],
						attributes: ['uid', 'readTime', 'readDate', 'readsite', 'theme', 'peopleId', 'status', 'date', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId != 'null' && department == 'null' ){
					resp.length = await readRecord.findAll({
						where:{
							uid:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readrecordData = await readRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department']
						}],
						attributes: ['uid', 'readTime', 'readDate', 'readsite', 'theme', 'peopleId', 'status', 'date', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							uid:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId == 'null' && department != 'null' ){
					resp.length = await readRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readrecordData = await readRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['uid', 'readTime', 'readDate', 'readsite', 'theme', 'peopleId', 'status', 'date', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else{
					resp.length = await readRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							uid:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readrecordData = await readRecord.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['uid', 'readTime', 'readDate', 'readsite', 'theme', 'peopleId', 'status', 'date', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							uid:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}
				break;
				//悦读成绩
			case 'readgrade':
				if( stuId == 'null' && department == 'null' ){
					resp.length = await readGrade.findAll({
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readgradeData = await readGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department']
						}],
						attributes: ['uid', 'name', 'department', 'morningTimes', 'duration', 'fraction', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId != 'null' && department == 'null' ){
					resp.length = await readGrade.findAll({
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readgradeData = await readGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department']
						}],
						attributes: ['uid', 'name', 'department', 'morningTimes', 'duration', 'fraction', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId == 'null' && department != 'null' ){
					resp.length = await readGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readgradeData = await readGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['uid', 'name', 'department', 'morningTimes', 'duration', 'fraction', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else{
					resp.length = await readGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((a)=>{return a.length});
					var readgradeData = await readGrade.findAll({
						include:[{
							model:Student,
							as:'Rs',
							attributes:['Department'],
							where:{
								Department:department
							}
						}],
						attributes: ['uid', 'name', 'department', 'morningTimes', 'duration', 'fraction', 'createdAt'],
						limit: 10,
						offset: page * 10,
						where:{
							studentId:stuId,
							createdAt:{
								[Op.between]: [startTime, endTime]
							}
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}
				break;
				//学生信息
			case 'students':
				if( stuId == 'null' && department == 'null'){
					resp.length = await Student.findAll().then((a)=>{return a.length});
					await Student.findAll({
						attributes: ['studentId', 'name', 'gender', 'Department', 'profession', 'grade', 'fraction', 'status',
							'createdAt'
						],
						limit: 10,
						offset: page * 10
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId != 'null' && department == 'null' ){
					resp.length = await Student.findAll({where:{studentId:stuId}}).then((a)=>{return a.length});
					await Student.findAll({
						attributes: ['studentId', 'name', 'gender', 'Department', 'profession', 'grade', 'fraction', 'status',
							'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							studentId:stuId
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else if( stuId == 'null' && department != 'null'){
					resp.length = await Student.findAll({where:{Department:department}}).then((a)=>{return a.length});
					await Student.findAll({
						attributes: ['studentId', 'name', 'gender', 'Department', 'profession', 'grade', 'fraction', 'status',
							'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							Department:department
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}else{
					resp.length = await Student.findAll({where:{studentId:stuId,Department:department}}).then((a)=>{return a.length});
					await Student.findAll({
						attributes: ['studentId', 'name', 'gender', 'Department', 'profession', 'grade', 'fraction', 'status',
							'createdAt'
						],
						limit: 10,
						offset: page * 10,
						where:{
							studentId:stuId,
							Department:department
						}
					}).then((res) => {
						resp.data = res;
					}).catch((err) => {
						console.log('testTest', err)
					});
				}
				break;
			default:
				let b = {}
				b.data = "空表"
				a.push(b)
		}
	}
	// resp.data = a
	// resp.length = a.length
	ctx.response.body = resp
}
module.exports = {
	'GET /conditionalquery': fn_conditionalquery
};
