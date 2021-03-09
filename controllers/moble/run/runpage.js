const RunRecord = require('../../../models/runRecord');
const checkToken = require('../../../util/checkToken');
var fn_runpage = async (ctx, next) => {
    var utoken = ctx.query.token;
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
        var runrecord = await RunRecord.findAll({
                where:{
                    uid:`${data}`
                }
            }).then((sportsRecord)=>{return sportsRecord});
        let a = runrecord.length;
        console.log("a",runrecord);
        ctx.response.body =`{"status":"successful","msg":"${a}"}`;
    }
}
module.exports = fn_runpage

// var runpage = await runpage.findAll({
//     where:{
//         uid:`${uid}`
//     }
// }).then((runpage)=>{return runpage});
// let a = JSON.parse(JSON.stringify(runpage)).length
// console.log("有效条数：",a);