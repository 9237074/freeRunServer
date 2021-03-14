const sequelize = require('../db');
const Sequelize = require('sequelize');
const Student = require('./Student');
const Teacher = require('./Teacher')
const Model = Sequelize.Model;

class RunGrade extends Model { }
RunGrade.init({
    //uid
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true//设置主键
    },
    //姓名
    name: {
        type: Sequelize.STRING
    },
    //学号
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    //有效总次数
    runTimes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    //有效总里程km
    mileage: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    //有效时长
    duration: {
        type: Sequelize.BIGINT,
        defaultValue: 0
    },
    //分数
    fraction: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'RunGrade'
})

// Student.belongsTo(runGrade, {foreignKey: 'studentId', targetKey: 'studentId'});
// runGrade.hasOne(Student,{foreignKey:'studentId',targetKey:'studentId'});
module.exports = RunGrade;
