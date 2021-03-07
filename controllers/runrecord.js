const sportsRecord = require('../models/SportsRecord');
const checkToken = require('../util/checkToken');
var fn_runrecord = async (ctx, next) => {
    var
    	utoken = ctx.request.body.token,
        offset = ctx.request.body.offset;
    var studentId = await checkToken(utoken).then((a)=>{return a}).catch(err =>{console.log('runrecord.js -> err',err)});
    if(studentId == null){
        ctx.response.body = 
        `{"code":0,"msg":"参数错误","data":"null"}`
    }else if(studentId == "参数错误"){
        ctx.response.body = 
        `{"code":0,"msg":"参数错误","data":"null"}`
    }else{
        var run = await sportsRecord.findAll({
                where:{
                    uid: studentId
                },
          		limit:10,
          		offset:10*offset
            }).then((a)=>{return a});
        let b = JSON.stringify(run);
        ctx.response.body =`{"code":0,"msg":"参数正常","data":${b}}`;
    }
}
module.exports = {
    'POST /runrecord': fn_runrecord
};
