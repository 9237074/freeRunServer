const Student = require('../models/Student.js');
const readTheme = require('../models/readTheme');
const checkToken = require('../util/checkToken');
var fn_readPage = async (ctx, next) => {
    var utoken = ctx.query.token;
  	console.log('utoken:',utoken)
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
                //where:{
                //    uid:`${data}`
                //}
          		attributes: ['theme', 'readTime','readDate','readSite','people']
            }).then((readRecord)=>{return readRecord});
      	/*var people = await Student.findOne({
        	where:{
            	studentId:ReadTheme.people
            }
        }).then((name)=>{return name.name});
      	a.people = people*/
        let a = JSON.stringify(ReadTheme);
        ctx.response.body =`{"status":"successful","msg":${a}}`;
    }
}
module.exports = {
    'GET /readPage': fn_readPage
};

// var ReadRecord = await readRecord.findAll({
//     where:{
//         uid:`${uid}`
//     }
// }).then((readRecord)=>{return readRecord});
// let a = JSON.parse(JSON.stringify(ReadRecord)).length
// console.log("有效条数：",a);