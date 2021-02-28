require("fs").readdirSync("node_modules").map((v)=>{if(require("fs").existsSync("node_modules/"+v+"/package.json"))console.log("\""+v+"\""+":"+JSON.parse(require("fs").readFileSync("node_modules/"+v+"/package.json")+"").version+",");})

