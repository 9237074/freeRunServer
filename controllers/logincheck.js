const checkToken = require('../util/checkToken');
const loginLog = require('../models/LoginLog');
const sequelize = require('../db');
fn_loginCheck = async(ctx,next)=>{
    var token = ctx.request.query.token,
        timestamp = ctx.request.query.timestamp;
  	var id = await checkToken(token).then(a=>{return a}).catch(err=>{'logincheck.js err:',err});
    var rtimestamp = await loginLog.max('timestamp',{
    	where:{
        	uid:id
        }
    }).then(a=>{return a}).catch(err=>{console.log(err)})
  	if(id == null){
    	ctx.response.body = `{"code":1,"msg":"请登录","data":null}`
    }else if(timestamp == rtimestamp){
    	ctx.response.body = `{"code":0,"msg":"正常","data":null}`
    }else{
    	ctx.response.body = `{"code":1,"msg":"您的账号已在另一台设备登陆","data":null}`
    }
}

module.exports = {
    "GET /logincheck" : fn_loginCheck
};   
