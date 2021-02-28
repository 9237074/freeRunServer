//跑步规则
const checkToken = require('../util/checkToken');
const Student = require('../models/Student');
const runRule = require('../models/runRule');
const sequelize = require('../db');
var fn_admin_run_rule = async (ctx, next) => {
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
            var manRule = await runRule.findAll({
            	where:{
                	gender:"男"
                }
            }).then((a)=>{return JSON.stringify(a)});
            // console.log(student);
            let msg1 = `${manRule}`
            var womanRule = await runRule.findAll({
            	where:{
                	gender:"女"
                }
            }).then((a)=>{return JSON.stringify(a)});
            // console.log(student);
            let msg2 = `${womanRule}`
            ctx.response.body = `{"status":"successful","msg":[${msg1},${msg2}]}`;
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
    'GET /adminRunRule': fn_admin_run_rule
};