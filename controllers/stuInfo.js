/*
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const studentInfo = require('../models/studentInfo');
const fs = require("fs");

var stu = []
fn_stuInfo = async(ctx,next)=>{
	var data = fs.readFileSync('output.json');
    stu = JSON.parse(data.toString());
  	console.log(stu)
  	for(var i = 0 ;i<stu.length;i++){
    	studentInfo.create({
            studentId:stu[i].id,
            name:stu[i].name,
            gender:stu[i].gender,
            Department:stu[i].Department,
            profession:stu[i].professuin,
            grade:stu[i].grade
    	}).then(a => {console.log(`插入第${i}条成功`)}).catch(err =>{console.log(`插入第${i}条失败`)})
    }
    ctx.response.body = stu
}

module.exports = {
    "GET /stuInfo" : fn_stuInfo
};   
*/