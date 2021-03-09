//admin_login
const Admin = require('../../../models/Admin');
const Token = require('../../../models/Token');
const crypto = require("crypto");
const appkey = require('../../../app')

var fn_admin_login = async(ctx,next)=>{
   	var
        user = ctx.request.body.username,
        password = ctx.request.body.password,
  	    token = ctx.request.body.token
  	console.log('appKey:',appkey.appkey)
  	var 
    	studentId = '',
    	rpassword = '',
  		name = ''
  	var token1 = crypto.createHmac('sha256',appkey.appkey).update(user+password).digest('hex')
  	console.log('user',user,'password:',password,'token:',token,'token1:',token1)
  	if(token1 == token){
      await Admin.findOne({where:{user:user}})
        .then(
        	a => { 
            	console.log(a.studentId);
              	console.log(a.password);
              	console.log(a.name)
              	studentId = a.studentId;
              	rpassword = a.password;
              	name = a.name;
            }
      	)
        .catch(
        	err =>{
              console.log('err:',err);
              studentId = 'null'
              rpassword = 'null'
              name = 'null'
              ctx.response.body = `{"code":0, "msg":"${err}", "data":"null" }`
            }
      	)
      if(studentId == 'null'){
      	ctx.response.body = `{"code":0, "msg":"当前用户不存在", "data":"null" }`
      }else{
      	if(rpassword == password){
      		ctx.response.body = `{"code":0,"msg":"登陆成功","data":{"uuid":"${studentId}","token":"${token1}","name":"${name}"}}`
      	}else{
          	console.log('rpassword:',rpassword,'password:',password,'密码错误')
        	let resp={};
		resp.msg= "账号或密码错误"
		ctx.response.body = "账号或密码错误";
        }
      }
    }else{
      ctx.response.body = '登陆失败'
    }
}

module.exports = fn_admin_login
