const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class UserAdmin extends Model{}
UserAdmin.init({
    //uid
    uid:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        allowNull:false,
        autoIncrement: true
    },
    //账号/手机号码
    user:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //密码
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },//姓名
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //工号
    jobNumber:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    //角色
    role:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //上次登陆方式
    loginMethod:{
        type:Sequelize.STRING
    },
    //上次登陆时间
    loginTime:{
        type:Sequelize.DATE
    }
},{
    sequelize,
    modelName:'UserAdmin'
});

module.exports = UserAdmin;