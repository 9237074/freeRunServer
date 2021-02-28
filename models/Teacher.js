const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Teacher extends Model{}
Teacher.init({
    //uid
    uid:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        allowNull:false,
        autoIncrement: true
    },
    //账号
    user:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //密码
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //学号
    teacherId:{
        type:Sequelize.STRING,
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
    },
    //分数
    fraction:{
        type:Sequelize.INTEGER
    },
    //审核状态 0是待审核、1是审核通过、2是审核
    status:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:'teacher'
});

module.exports = Teacher;