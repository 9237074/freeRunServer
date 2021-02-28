const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sportsRecord = require('../models/sportsRecord');

class Student extends Model{}
Student.init({
    //uid
    uid:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        allowNull:false,
        autoIncrement: true
    },
    //账号
    user:{
        type:Sequelize.STRING,//设置数据类型
        allowNull:false//不允许为空
    },
    //密码
    password:{
        type:Sequelize.STRING,
        allowNull:false
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
    modelName:'student'
});

Student.hasOne(sportsRecord,{as:'sR',foreignKey:'uid',targetKey:'user'});
sportsRecord.belongsTo(Student,{foreignKey:'uid',targetKey:'user'});
module.exports = Student;
