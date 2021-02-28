const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class studentInfo extends Model{}
studentInfo.init({
    //id
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        allowNull:false,
        autoIncrement: true
    },
    //学号
    studentId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    //姓名
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //性别
    gender:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //院系
    Department:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //专业
    profession:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //年级
    grade:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName:'studentInfo'
});

module.exports = studentInfo;