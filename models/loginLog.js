const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class loginLog extends Model{}
loginLog.init({
    //id
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        allowNull:false,
        autoIncrement: true
    },
    //账号
    uid:{
        type:Sequelize.STRING,//设置数据类型
        allowNull:false//不允许为空
    },
  	//时间戳
  	timestamp:{
		type:Sequelize.INTEGER,//设置数据类型为INTEGER
      	allowNull:false//不允许为空
	}
    
},{
    sequelize,
    modelName:'loginLog'
});

module.exports = loginLog;