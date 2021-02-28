const checkToken = require('../util/checkToken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const sequelize = require('../db');
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
            let msg = {}
            var student = Student.findAll({
                order:[
                    sequelize.fn('max', sequelize.col('fraction')),
                ]
            }).then((a)=>{return JSON.parse(JSON.stringify(a))});
            for(stu of student){
                msg[`${stu.user}`] = stu.fraction
            }
            console.log(`msg:${msg}`);
            ctx.response.body = `"status":"successful","msg":"${msg}"`
        }else if (type =="teacher"){
            let msg = {}
            var teacher = Teacher.findAll({
                order:[
                    sequelize.fn('max', sequelize.col('fraction'))
                ]
            }).then((a)=>{return JSON.parse(JSON.stringify(a))});
            for(tea of teacher){
                msg[`${tea.user}`] = tea.fraction
            }
            console.log(`msg:${msg}`)
            ctx.response.body = `"status":"successful","msg":"${msg}"`
        }
    }
}
module.exports = {
    'GET /ranking': fn_ranking
};