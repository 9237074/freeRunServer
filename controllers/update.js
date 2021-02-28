//版本更新检测

fn_update = async(ctx,next)=>{
  	//当前版本号versionDatad
  	var versionData = ('1.0.4').split(".");
  	var update = "false"
    console.log("versionData:",versionData);
	if(versionData[1].length == 1 ){
    	var two = 0 + versionData[1];
    }else{
    	var two = versionData[1]
    }
  	if(versionData[2].length == 1 ){
    	var three = 0 + versionData[2];
    }else{
    	var three = versionData[2];
    }
  	versionData = versionData[0]+two+three;
    //用户版本号version appid
    var appid = ctx.query.appid;
	var version = ctx.query.version;
  	if(appid == undefined || version == undefined){
    	ctx.response.body = `{"msg":"非法访问"}`;
      	return 0;
    }
  	version = version.split(".");
  	console.log("version:",version)
  	if(version[1].length == 1 ){
    	var two1 = 0 + version[1];
    }else{
    	var two1 = version[1];
    }
  	if(version[2].length == 1 ){
    	var three1 = 0 + version[2];
    }else{
    	var three1 = version[2];
    }
  	version = version[0] + two1 + three1
  	console.log("当前版本号：",versionData,"用户版本号：",version)
  	//判断
  	if(Number(version) < Number(versionData)){
    	ctx.response.body = `{"status":"1","url":"https://ydlp.xysbs.cn:8080/update","update":${update}}`;
    }else{
    	ctx.response.body = `{"status":"0","update":${update}}`;
    }
}

module.exports = {
    "GET /update" : fn_update
};   
