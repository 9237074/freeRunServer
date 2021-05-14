const sequelize = require('../db');
const Sequelize = require('sequelize');
const Student = require('./Student');
const Teacher = require('./Teacher')
const Model = Sequelize.Model;

class ReadGrade extends Model{}
ReadGrade.init({
    //uid
    uid:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true
    },
    //姓名
    name:{
        type:Sequelize.STRING
    },
    //学号
    studentId:{
        type:Sequelize.INTEGER
    },
  	//院系
    department:{
    	type:Sequelize.STRING
    },
    //晨读次数
    morningTimes:{
        type:Sequelize.INTEGER
    },
    //有效时长
    duration:{
        type:Sequelize.INTEGER
    },
    //分数
    fraction:{
        type:Sequelize.INTEGER
    }
},{
    sequelize,
    modelName:'ReadGrade'
})
// Student.belongsTo(readGrade,{foreignKey:'studentId',targetKey:'studentId'})
// readGrade.hasOne(Student,{foreignKey:'studentId',targetKey:'studentId'});
module.exports = ReadGrade;
