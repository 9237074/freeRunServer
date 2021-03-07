const Token = require('../models/Token');

var fn_checkTokn = async(token)=>{
    var rtoken = await Token.findOne({
        where:{
            token:`${token}`
        }
    }).then((rtoken)=>{return rtoken});
    if(rtoken == null){
        let msg = null;
        return msg;
    }else if(rtoken.token == token){
        //验证成功后处理
        rtoken = rtoken.dataValues;
        var uid = rtoken.uid
        return uid;
    }else{
    	let msg = "参数错误"
    	return msg;
    }
}
module.exports = fn_checkTokn
