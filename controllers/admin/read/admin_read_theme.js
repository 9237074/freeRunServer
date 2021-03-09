//晨读主题页面 adminreadtheme 参数offset
const Student = require('../../../models/Student.js');
const readTheme = require('../../../models/ReadTheme');
const checkToken = require('../../../util/checkToken');
var fn_readTheme = async (ctx, next) => {
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
        var ReadTheme = await readTheme.findAll({
          		attributes: ['theme', 'readTime','readDate','readSite','people']
            }).then((readRecord)=>{return readRecord});
        let a = JSON.stringify(ReadTheme);
        ctx.response.body =`{"status":"successful","msg":${a}}`;
    }
}
module.exports = fn_readTheme