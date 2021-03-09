const checkToken = require('../../../util/checkToken');
const ReadRecord = require('../../../models/ReadRecord');
const readGrade = require('../../../models/ReadGrade');
const sequelize = require('../../../db')
const Student = require('../../../models/Student');
var fn_admin_read_department = async (ctx, next) => {
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
      	let arr = []
        var demo = await Student.findAll({
          attributes:['Department'],
          raw:true
        }).then(a=>{for(item in a){arr.push(a[item].Department)};return a}).catch(err=>{console.log('admin_read_data_demo.js err:',err)})
      	var departmentData = new Set(arr)
        console.log('arr:',arr)
        console.log('arr:',departmentData)
        ctx.response.body = `${Array.from(departmentData)}`
    }
}
module.exports = fn_admin_read_department

/*var demo = await Student.findAll({
          attributes:['name','department'],
          	where:{department:'a'},
          	include:[{
          		model:readGrade,
          		as:'rg',
              	attributes:['morningTimes',[sequelize.fn('SUM', sequelize.col('morningTimes')), 'has_times']]
          }],
          raw:true
        }).then(a=>{return JSON.stringify(a)}).catch(err=>{console.log('admin_read_data_demo.js err:',err)})
        ctx.response.body = `${demo}`*/