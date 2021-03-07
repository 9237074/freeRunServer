const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const studentInfo = require('../models/StudentInfo');
const Token = require('../models/Token');
const crypto = require('crypto');
const appKey = require('../app');
const fetch = require('node-fetch');

fn_sign = async(ctx,next)=>{
    var 
        id = ctx.query.rid,
        pw = crypto.createHmac('sha256',appKey.appkey).update(ctx.query.rpw).digest('hex'),
        name = ctx.query.rname,
        //gender = ctx.query.rgender,
        Department = ctx.query.rDepartment,
        profession = ctx.query.rprofession,
        grade = ctx.query.rgrade;
	console.log(id,name,Department,profession,grade);
  	// var Info = await studentInfo.findOne({
   //                      where:{
   //                          studentId:id,
   //                          name:name,
   //                          //gender:gender,
   //                          Department:Department,
   //                          profession:`${profession}`,
   //                          grade:grade
   //                      }
   //  				 })
   //  					.then(a => {return a}).catch(err =>{console.log('sign.js err',err)})
   let searchInfo = await fetch('http://10.255.15.233:31313/execSql', {
   		method: 'POST',
   		headers: {
   			'Content-Type': 'application/x-www-form-urlencoded'
   		},
   		body: `token=underdog123&sql=SELECT+*+FROM+t_xsxx+where+xh%3D%27${id}%27`,
   	})
   	.then(function(res) {
   		return res.json();
   	})
   	.then(
   		searchInfo => {
   			return searchInfo
   		}
   	).catch(err => {
   		console.log(err);
   	});
	if (searchInfo.result.length == 0) {
		console.log('das');
		var Info = ''
	} else {
		var Info = await fetch('http://10.255.15.233:31313/execSql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `token=underdog123&sql=SELECT+*+FROM+t_XYZY+WHERE+XYH%3D${searchInfo.result[0].XYH}`,
			})
			.then(function(res) {
				return res.json();
			})
			.then(
				res => {
					if (res.result.length == 0) {
						return ''
					} else {
						if (res.result[0].XYMC == '人工智能学院') {
							return '信息一致'
						} else {
							return ''
						}
					}
				}
			)
	}
    var stuInfo = await Student.findOne({
                        where:{
                            studentId:id,
                            name:name,
                            //gender:gender,
                            Department:Department,
                            profession:`${profession}`,
                            grade:grade
                        }
    				 })
    					.then(a => {return a}).catch(err =>{console.log('sign.js err',err)})
    console.log(Info,'+',stuInfo);
    if(Info == '' && stuInfo == null){
    	ctx.response.body=`{"code":0,"msg":"此用户不存在","data":"null"}`
    }else if(Info != '' && stuInfo != null){
    	ctx.response.body=`{"code":0,"msg":"此用户已存在","data":"null"}`
    }else {
	console.log(JSON.stringify(stuInfo))
    	await Student.create({
          	user:id,
        	studentId:id,
          	password:pw,
            name:name,
            gender:"null",
            Department:Department,
            profession:`${profession}`,
            grade:grade,
          	fraction:0,
          	status:2
        })
      	  .then(() =>{ctx.response.body=`{"code":0,"msg":"注册成功","data":"null"}`})
      	  .catch(err => {ctx.response.body=`{"code":0,"msg":"服务器异常","data":"null"}`})
    }
}

module.exports = {
    "GET /sign" : fn_sign
};   
