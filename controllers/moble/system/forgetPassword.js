// 忘记密码
// 1、获取用户输入的学号、教务系统密码
// 2、去http://10.255.15.233:31313/execSql获取用户的教务系统密码
// 3、用户输入的教务系统密码和获取到的教务系统密码进行对比
// 4、教务系统密码是SELECT czkl FROM t_xsxx WHERE xh='12345678'
const checkToken = require('../../../util/checkToken');
const crypto = require('crypto');
const Student = require('../../../models/Student');
const Teacher = require('../../../models/Teacher');
const sequelize = require('../../../db');
const checkKey = require('../../../util/checkKey.js');
const appkey = require('../../../app.js')
const fetch = require('node-fetch');

const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');


var fn_forgetPassword = async (ctx, next) => {
	const { studentId, password, newPassword } = ctx.request.body
	const pdToken = ctx.app.checkKey(studentId + password)
	const newPdToken = ctx.app.checkKey(studentId + newPassword)
	const student = await Student.findOne({
		where: {
			studentId: studentId,
			password: pdToken
		}
	}).catch(e => {
		throw new ServerException("数据库异常", 50001)
	})
	
	if(student === null){
		throw new ParameterException("账号或者密码错误", 40002)
	}

	

	// var 
	// 	token = ctx.query.token,
	// 	password = ctx.query.password,
	// 	npassword = ctx.query.npassword,
	// 	xh = ctx.query.xh;
	// var rtoken = await checkKey(xh+password);
	// if(token === rtoken){
	// 	let data = await fetch('http://10.255.15.233:31313/execSql', { 
	// 		method: 'POST',
	// 		headers:{
	// 			'Content-Type': 'application/x-www-form-urlencoded'
	// 		},
	// 		body:`token=underdog123&sql=SELECT+czkl+FROM+t_xsxx+where+xh%3D%27${xh}%27` ,
	// 	})
	// 		.then(function(res) {
	// 	        return res.json();
	// 		}).then(
	// 			data=>{
	// 				return data
	// 			}
	// 		).catch(err=>{
	// 			console.log(err);
	// 			ctx.response.body = {"status":"error","msg":"更改密码发生错误,请重试"}
	// 		});
	// 	if(data.status == 'success'){
	// 		password = crypto.createHash('md5').update(password).digest('hex').slice(8,24);
	// 		if(password == data.result[0].czkl){
	// 			try{
	// 				await Student.update({
	// 					password:crypto.createHmac('sha256',appkey.appkey).update(npassword).digest('hex')
	// 				},{
	// 					where:{
	// 						studentId:xh
	// 					}
	// 				}).then(()=>{
	// 					ctx.response.body = {"status":"success","msg":"密码更改成功"}
	// 				}).catch(err=>{
	// 					console.log(err);
	// 					ctx.response.body = {"status":"error","msg":"更改密码发生错误,请重试"}
	// 				})
	// 			}catch(e){
	// 				ctx.response.body = {"status":"error","msg":"服务器出了小差"}
	// 			}
	// 		}else{
	// 			ctx.response.body = {"status":"error","msg":"教务系统密码错误"}
	// 		}
	// 	}
	// }else{
	// 	ctx.response.body = {"status":"error","msg":"token校验失败","token":token,"rtoken":rtoken,"xh":xh,"password":password}
	// }
}
module.exports = fn_forgetPassword