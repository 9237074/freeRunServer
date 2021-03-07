//跑步记录 token type status={all vaild invaild}
const checkToken = require('../util/checkToken');
const Student = require('../models/Student');
const sportsRecord = require('../models/SportsRecord');
const sequelize = require('../db');
var fn_admin_run_record = async (ctx, next) => {
    var utoken = ctx.query.token;
    var type = ctx.query.type;
  	var status = `${ctx.query.status}`;
  	var offset = parseInt(ctx.query.offset);
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
            if(status == "all" ){
              let all = await sportsRecord.findAll({
                offset:offset,
                limit:10
              }).then((a)=>{return JSON.stringify(a)});
              let len =await sportsRecord.findAll({}).then((a)=>{return a.length});
              // console.log(student);
              let msg1 = `${all}`
              ctx.response.body = `{"status":"successful","msg":${msg1},"len":${len}}`;
            }else if(status == "valid"){
              let valid = await sportsRecord.findAll({
                where:{
                  status:"valid",
                },
                offset:offset,
                limit:10
              }).then((a)=>{return JSON.stringify(a)});
              // console.log(student);
              let msg1 = `${valid}`
              ctx.response.body = `{"status":"successful","msg":${msg1}}`;
            }else if(status == "invalid"){
              let invalid = await sportsRecord.findAll({
                where:{
                  status:"invalid",
                },
                offset:offset,
                limit:10
              }).then((a)=>{return JSON.stringify(a)});
              // console.log(student);
              let msg1 = `${invalid}`
              ctx.response.body = `{"status":"successful","msg":${msg1}}`;
            }else{
              let msg1 = "参数错误"
              ctx.response.body = `{"status":"successful","msg":"${msg1}"}`
            }
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
            ctx.response.body = `{"status":"successful","msg":"${msg}"}`
        }
    }
}
module.exports = {
    'GET /adminRunRecord': fn_admin_run_record
};