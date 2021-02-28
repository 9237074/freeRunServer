//晨读主题页面 增加主题 adminreadaddtheme 参数offset change
const Student = require('../models/Student.js');
const readTheme = require('../models/readTheme');
const checkToken = require('../util/checkToken');
var fn_readAddTheme = async (ctx, next) => {
    var utoken = ctx.query.token
  	var theme = ctx.query.theme
    var readTime = ctx.query.readTime
    var readDate = ctx.query.readDate
    var readSite = ctx.query.readSite
    var people = ctx.query.people
    var change = ctx.query.change
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
        if(change == 'add'){
          console.log(`${theme},${readTime},${readDate},${readSite},${people},${change}`)
        	await readTheme.create({
          		theme : theme, 
          		readTime : readTime,
          		readDate : readDate,
          		readSite : readSite,
          		people : people,
              	status : 0
            }).then((readRecord)=>{ ctx.response.body =`{"status":"successful","msg":"添加成功"}` })
              .catch(ctx.response.body =`{"status":"successful","msg":"添加异常"}`);
        }else if(change == 'delete'){
        	let ReadTheme = await readTheme.destroy({
          		where:{
                	theme : theme, 
                    readTime : readTime,
                    readDate : readDate,
                    readSite : readSite,
                    people : people,
                  	status : 0
                }
            }).then((readRecord)=>{ ctx.response.body =`{"status":"successful","msg":"删除成功"}` })
              .catch(ctx.response.body =`{"status":"successful","msg":"添加异常"}`);
        }else{
        	ctx.response.body = `{"status":"suce","msg":参数错误}`
        }
    }
}
module.exports = {
    'GET /adminreadaddtheme': fn_readAddTheme
};