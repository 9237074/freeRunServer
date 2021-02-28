//学生认证信息 审核拒绝
const checkToken = require('../util/checkToken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const sequelize = require('../db');
var fn_admin_cert_stu_2 = async (ctx, next) => {
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
            var student = await Student.findAll({ 
              attributes: ['uid', 'studentId','name','gender','Department','profession','grade','status'],
              where:{
                status:2
              },
              limit: 10,
            }).then((a)=>{return JSON.stringify(a)});
            // console.log(student);
            let msg = `${student}`
            ctx.response.body = `{"status":"successful","msg":${msg}}`;
        }else if(type == "teacher"){
            var teacher = await Teacher.findOne({
                where:{
                    uid:data
                }
            }).then((a)=>{return JSON.stringify(a)});
            let msg = `{"fraction":"${teacher.fraction}"}`
            ctx.response.body = `"{status":"successful","msg":${msg}}`;
        }else{
            let msg = `参数错误`
            ctx.response.body = `{"status":"successful","msg":${msg}}`
        }
    }
}
module.exports = {
    'GET /certStu2': fn_admin_cert_stu_2
};