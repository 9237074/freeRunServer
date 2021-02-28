const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Setting extends Model{}
Setting.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,//设置主键
        autoIncrement: true
    },
    //学期管理
    Semester:{
        type:Sequelize.STRING
    },
    //
},{
    sequelize,
    modelName:'setting'
});

module.exports = Setting;