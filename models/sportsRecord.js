const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Student = require('./Student')
//运动记录
class sportsRecord extends Model{}
sportsRecord.init({
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
    //详情记录
    detail:{
        type:Sequelize.STRING
    },
    //状态
    status:{
        type:Sequelize.STRING
    }
},{
    sequelize,
    modelName:'sportsRecord'
})

module.exports = sportsRecord;
