const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Admin extends Model{}
Admin.init({
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
    //工号
    studentId:{ 
        type:Sequelize.INTEGER,
        allowNull:false
    },
    //姓名
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //审核状态 0是待审核、1是审核通过、2是审核
    status:{
        type:Sequelize.INTEGER,
        allowNull:false,
        default: 0
    }
},{
    sequelize,
    modelName:'Admin'
});


module.exports = Admin;