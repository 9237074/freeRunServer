const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');
const Token = require('../../../models/Token');
const loginLog = require('../../../models/LoginLog')
const crypto =require("crypto");
const appKey = require('../../../app')

var fn_login = async(ctx,next)=>{
    var 
        studentId = ctx.request.body.id || '',
        password = ctx.request.body.password || '',
        token = ctx.request.body.token || '',
       	timestamp = Math.round(new Date().getTime()/1000)
        type = 'student';
  	console.log('appkey',appKey.appkey)
  	var rtoken = crypto.createHmac('sha256', appKey.appkey).update(studentId+password).digest('hex')
    console.log('studentId',studentId,'password',password,'token:',token,'rtoken',rtoken);
    if(rtoken == token){
    	//判断用户身份 老师||学生
    if (type == 'student'){
        var ruser = await Student.findOne({
            where:{
                studentId:studentId
            }
        }).then((rid)=>{return rid});
        console.log("student:",JSON.stringify(ruser));
        if(ruser == null){
            let msg_none = "此用户不存在"
            ctx.response.body = `{"code":2,"msg":"${msg_none}","data":"null"}`
        }else if(studentId == ruser.studentId && password == ruser.password){
          	//临时token ltoken
          	let ltoken = await Token.findOne({where:{uid:studentId}}).then((a)=>{return a}).catch(err =>{console.log('login.js err:',err)})
            if (ltoken == null){
                await Token.create({uid:ruser.studentId,token:rtoken,time:Date.now()/1000})
                  		.then(()=>{
                  			loginLog.create({uid:ruser.studentId,timestamp:timestamp}).then(()=>{console.log('loginLog创建成功')}).catch(()=>{console.log('loginLog创建失败')})
                			ctx.response.body = `{"code":0,"msg":"创建成功","data":{"token":"${token}","studentId":"${ruser.studentId}","name":"${ruser.name}","gender":"${ruser.gender}","Department":"${ruser.Department}","profession":"${ruser.profession}","grade":"${ruser.grade}","fraction":"${ruser.fraction}","status":"${ruser.status}","timestamp":"${timestamp}"}}`;
                		})
              			.catch(err =>{
                  			console.log('login.js->err:',err);
                			ctx.response.body = `{"code":1,"msg":"创建失败","data":"null"`;
                		})
            }else{
                await Token.update({token:rtoken,time:Date.now()/1000},{where:{uid:studentId}})
              			.then(()=>{
                  			loginLog.create({uid:ruser.studentId,timestamp:timestamp}).then(()=>{console.log('loginLog创建成功')}).catch(()=>{console.log('loginLog创建失败')})
                			ctx.response.body = `{"code":0,"msg":"更新成功","data":{"token":"${token}","studentId":"${ruser.studentId}","name":"${ruser.name}","gender":"${ruser.gender}","Department":"${ruser.Department}","profession":"${ruser.profession}","grade":"${ruser.grade}","fraction":"${ruser.fraction}","status":"${ruser.status}","timestamp":"${timestamp}"}}`;
                		})
              			.catch(err =>{
                  			console.log('login.js->err:',err)
                			ctx.response.body = `{"code":1,"msg":"创建失败","data":"null"`;
                		})
            }
        }else{
            ctx.response.body = `{"code":1,"msg":"账号或密码错误","data":"null"}`;
        }
    }else{
        ctx.response.body = 
        `{"code":1,"msg":"参数错误","data":"null"}`
    }
  }else{
  	console.log(id,password,type);
    ctx.response.body = 
        `{"code":1,"msg":"参数错误","data":"null"}`
  }    
}

module.exports = fn_login
