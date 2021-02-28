const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Token extends Model{}
Token.init({
    //uid
    uid:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        allowNull:false,
        autoIncrement: true
    },
    //账号
    token:{
        type:Sequelize.STRING,
        allowNull:false
    },
    //time
    time:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:'token'
});

module.exports = Token;