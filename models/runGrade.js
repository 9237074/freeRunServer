const sequelize = require('../db');
const Sequelize = require('sequelize');
const Student = require('./Student');
const Teacher = require('./Teacher')
const Model = Sequelize.Model;

class RunGrade extends Model{}
RunGrade.init({
    //uid
    uid:{
        type:Sequelize.INTEGER,
        primaryKey: true//设置主键
    },
    //姓名
    name:{
        type:Sequelize.STRING
    },
    //学号
    studentId:{
        type:Sequelize.INTEGER
    },
    //有效总次数
    runTimes:{
        type:Sequelize.INTEGER
    },
    //有效总里程km
    mileage:{
        type:Sequelize.INTEGER
    },
    //总打卡次数
    punch:{
        type:Sequelize.INTEGER
    },
    //晨跑次数
    morningTimes:{
        type:Sequelize.INTEGER
    },
    //晨跑里程
    morningmileage:{
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
    modelName:'RunGrade'
})

// Student.belongsTo(runGrade, {foreignKey: 'studentId', targetKey: 'studentId'});
// runGrade.hasOne(Student,{foreignKey:'studentId',targetKey:'studentId'});
module.exports = RunGrade;
