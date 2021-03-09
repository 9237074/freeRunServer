const checkToken = require('../../../util/checkToken');
const Student = require('../../../models/Student');
const Teacher = require('../../../models/Teacher');
const sequelize = require('../../../db');
var fn_ranking = async (ctx, next) => {
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
            var student = await sequelize.query(`select user,Department,fraction from students ORDER BY fraction DESC`).then((a)=>{return JSON.parse(JSON.stringify(a))[0]});
            let msg = JSON.stringify(student)
            console.log(`msg:${msg}`);
            ctx.response.body = `"status":"successful","msg":"${msg}"`
        }else if (type =="teacher"){
            var teacher = await sequelize.query(`select user,Department,fraction from teacher ORDER BY fraction DESC`).then((a)=>{return a});
            let msg = JSON.stringify(teacher)
            ctx.response.body = `"status":"successful","msg":"${msg}"`
        }
    }
}
module.exports = fn_ranking