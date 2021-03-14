const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
//运动记录
class RunRecord extends Model{}
RunRecord.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true
    },
  	//学号
    uid:{
        type:Sequelize.INTEGER
    },
  	//姓名
  	//学院
    //跑步时间
    runTime:{
        type:Sequelize.STRING
    },
    //用时
    spendTime:{
        type:Sequelize.STRING
    },
    //里程
    mileage:{
        type:Sequelize.INTEGER
    },
    //步数
    stepCount:{
        type:Sequelize.INTEGER
    },
    //配速
    speed:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //经纬度
    gps:{
        type:Sequelize.TEXT(),
        allowNull:false
    },
    //状态
    status:{
        type:Sequelize.STRING,
        defaultValue: 1 // 0 是错误信息 1 是正常信息
    }
},{
    sequelize,
    modelName:'RunRecord'
})

module.exports = RunRecord;
