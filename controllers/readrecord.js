const readRecord = require('../models/ReadRecord');
const checkToken = require('../util/checkToken');
var fn_readrecord = async (ctx, next) => {
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
        var read = await readRecord.findAll({
                where:{
                    uid: studentId
                },
          		limit:10,
          		offset:10*offset
            }).then((a)=>{return a});
        let b = JSON.stringify(read);
        ctx.response.body =`{"code":0,"msg":"参数正常","data":${b}}`;
    }
}
module.exports = {
    'POST /readrecord': fn_readrecord
};
