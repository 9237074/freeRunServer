const sequelize = require('../db');
const Sequelize = require('sequelize');
const Student = require('./Student');
const Model = Sequelize.Model;

//运动记录
class ReadRecord extends Model{}
ReadRecord.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true
    },
    uid:{
        type:Sequelize.INTEGER,
      	allowNull:false
    },
    //晨读时间
    readTime:{
        type:Sequelize.STRING,
      	allowNull:false
    },
  	//晨读周期
  	readDate:{
    	type:Sequelize.STRING,
      	allowNull:false
    },
    //晨读地点
    readSite:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //晨读主题
    theme:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //负责人id
    peopleId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //状态
    status:{
        type:Sequelize.STRING,
        allowNull:false
    },
  	//日期
    date:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName:'ReadRecord'
})
// Student.belongsTo(readRecord,{foreignKey:'studentId',targetKey:'uid'})
// readRecord.hasOne(Student,{foreignKey:'uid',targetKey:'studentId'});
module.exports = ReadRecord;
