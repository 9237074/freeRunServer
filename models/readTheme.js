const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class ReadTheme extends Model{}
ReadTheme.init({
    //晨读id
    readId:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
      	autoIncrement: true//自增
    },
    //晨读主题
    theme:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //晨读时间
    readTime:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //晨读时间
    readDate:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    //晨读地点
    readSite:{
        type:Sequelize.STRING,
        allowNull:false,
    },
  	//状态
  	status:{
    	type:Sequelize.STRING,
        allowNull:false,
    },
    //负责人
    people:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName:'ReadTheme'
})

module.exports = ReadTheme;