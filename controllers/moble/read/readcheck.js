const checkToken = require('../../../util/checkToken');
const checkKey = require('../../../util/checkKey');
const ReadRecord = require('../../../models/ReadRecord');
const readGrade = require('../../../models/ReadGrade')
const Student = require('../../../models/Student');
var fn_readcheck = async (ctx, next) => {
    var utoken = ctx.query.token;
    let data = await checkToken(utoken).then((a)=>{return a});
    if(data == null || data == '参数错误'){
        ctx.response.body = `{"status":"successful","msg":"参数错误"}`
    }else{
        var
            utime = ctx.query.time,
            udate = ctx.query.date,
            usite = ctx.query.site,
            utheme = ctx.query.theme,
      		upeople = ctx.query.people,
            key = ctx.query.key,
      		nowDate = new Date(),
        	rkey = await checkKey(utime+udate+usite+utheme+upeople+utoken).then(a=>{return a}).catch(err=>{console.log('readcheck.js err:',err)});
      	console.log('key:',key,'rkey:',rkey)
        if(rkey == key){
        	var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
            //去数据库找一下是否有数据，有就返回签到成功，没有就创建一个 a
            let a = await ReadRecord.findOne({
                where:{
                    uid:data,
                    readTime:utime,
                    readDate:udate,
                    readsite:usite,
                    theme:utheme,
                    peopleId:upeople,
                    date:date
                }
            }).then((a)=>{return a})
              .catch(err=>{console.log('readcheck.js err:',err)})
            if(a == null){
                var readRecord = await ReadRecord.create({
                    uid:data,
                    readTime:utime,
                    readDate:udate,
                    readsite:usite,
                    theme:utheme,
                    peopleId:upeople,
                    date:date,
                    status:0
                }).then((a)=>{return a})
                  .catch(err =>{console.log('readcheck.js err:',err)});
                var readGradeData = await readGrade.findOne({where:{studentId:data}}).then( a =>{return a}).catch( err=>{console.log('readcheck.js err:',err)})
                var studentData = await Student.findOne({where:{studentId:data}}).then(a=>{return a}).catch(err =>{console.log('readcheck.js err:',err)})
                if(readGradeData == null){
                    await readGrade.create({
                        uid:data,
                        name:studentData.name,
                        studentId:data,
                        Department:studentData.Department,
                        morningTimes:1,
                        duration:0,
                        fraction:0
                    }).then(()=>{ ctx.response.body = `{"code":0,"msg":"签到成功","data":"null"}`}).catch(err =>{console.log('readcheck.js err:',err)})
                }else{
                    await readGrade.update({
                        morningTimes:Number(readGradeData.morningTimes)+1
                    },{
                        where:{studentId:data}
                    }).then(()=>{ ctx.response.body = `{"code":0,"msg":"签到成功","data":"null"}`}).catch(err =>{console.log('readcheck.js err:',err)})
                }
            }else{
                ctx.response.body = `{"code":0,"msg":"重复签到","data":"null"}`
            }
        }else{
        	ctx.response.body = `{"code":1,"msg":"key校验失败","data":"null"}`
        }
    }
}
module.exports = fn_readcheck