const qrcode = require('qrcode');

// qrcode.toDataURL("i am code",(err,url)=>{console.log(url)});
const readTheme = require('../../../models/ReadTheme');
const checkToken = require('../../../util/checkToken');
var fn_qrcode = async (ctx, next) => {
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
        var theme = await readTheme.findOne({
                where:{
                    people: studentId
                }
            }).then((a)=>{return a});
      	let url = await qrcode.toDataURL(`${JSON.stringify(theme)}`).then((url)=>{return url})
        if(theme == null){
        	ctx.response.body = `{"code":0,"msg":"参数正常","data":"没有权限"}`
        }else{
        	ctx.response.body =`{"code":0,"msg":"参数正常","data":"${url}"}`
        }
      	
    }
}
module.exports = fn_qrcode
