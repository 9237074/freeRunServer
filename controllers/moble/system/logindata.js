const Student = require('../../../models/Student');
const Teacher = require('../../../models/Teacher');
const checkToken = require('../../../util/checkToken');
var fn_logindata = async (ctx, next) => {
    var utoken = ctx.query.token;
    var type = ctx.query.type;
    let data = await checkToken(utoken).then((a)=>{return a});
    if(data == null){
        let msg = `参数有误`
        ctx.response.body = 
        `{
            "status":"successful",
            "msg":"${msg}"
        }`
    }else if(data == "参数错误"){
        let msg = `参数错误`
        ctx.response.body = 
        `{
            "status":"successful",
            "msg":"${msg}"
        }`
    }else{
        if(type == "student"){
            var student = await Student.findOne({
                where:{
                    uid:data
                }
            }).then((a)=>{return JSON.parse(JSON.stringify(a))});
            // console.log(student);
            let msg = `{"uid":${student.uid},"user":${student.user},"img":"暂时无"}`
            ctx.response.body = `"status":"successful","msg":${msg}`;
        }else if(type == "teacher"){
            var teacher = await Teacher.findOne({
                where:{
                    uid:data
                }
            }).then((a)=>{return JSON.stringify(a)});
            let msg = `{"uid":${teacher.uid},"user":${teacher.user},"img":"暂时无"}`
            ctx.response.body = `"status":"successful","msg":${msg}`;
        }else{
            let msg = `参数错误`
            ctx.response.body = `"status":"successful","msg":${msg}`
        }
    }
}
module.exports = fn_logindata