var fs = require("fs");
fs.readFile('stuData.json',function(err,data){
	if(err){
		return console.error(err);
	}else{
		stu = JSON.parse(data.toString());
		console.log(stu.length)
		for(var i = 7445 ;i<stu.length;i++){
			console.log(`学号:${stu[i].学号} 姓名:${stu[i].姓名} 性别:${stu[i].性别} 院系:${stu[i].院系} 专业:${stu[i].专业} 年级:${stu[i].年级} `)
		}
	}
})