const sequelize = require('../../../db');
const runGrade = require('../../../models/RunGrade');
const checkToken = require('../../../util/checkToken');
var fn_runrank = async (ctx, next) => {
    var
    	utoken = ctx.request.body.token,
        offset = ctx.request.body.offset;
    var studentId = await checkToken(utoken).then((a)=>{return a}).catch(err =>{console.log('runrecord.js -> err',err)});
    if(studentId == null){
        ctx.response.body = 
        `{"code":1,"msg":"用户不存在","data":"null"}`
    }else if(studentId == "参数错误"){
        ctx.response.body = 
        `{"code":1,"msg":"验证失败","data":"null"}`
    }else{
        var read = await runGrade.findAll({
         order: sequelize.literal('mileage DESC'),
          		limit:10,
          		offset:10*offset
            }).then((a)=>{
		var changeStudentReadRank = [];
                        for(item in a){
                            var stu = {};
                            console.log('item',item)
                            var strStudentId = String(a[item].studentId);
                            stu.studentId = strStudentId.substr(0,1)+"****"+strStudentId.substr(6,(strStudentId.length-1))
                            console.log('strStudentId',stu.studentId)
                            stu.duration = a[item].duration
                            stu.fraction = a[item].fraction
                            stu.mileage = a[item].mileage
                            stu.morningTimes = a[item].morningTimes
                            stu.morningmileage = a[item].morningmileage
                            stu.name = a[item].name
                            stu.punch = a[item].punch
                            stu.runTimes = a[item].runTimes
                            changeStudentReadRank.push(stu)
                        };
                        console.log('changeStudentReadRank',JSON.stringify(changeStudentReadRank))
                        return JSON.stringify(changeStudentReadRank);

		});
        ctx.response.body =`{"code":0,"msg":"参数正常","data":${read}}`;
    }
}
module.exports = fn_runrank
