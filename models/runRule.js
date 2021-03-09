const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class RunRule extends Model{}
RunRule.init({
    //跑区id
    runId:{
        type:Sequelize.INTEGER,
        primaryKey: true//设置主键
    },
    //性别
    gender:{
        type:Sequelize.STRING
    },
    //规则时间
    ruleTime:{
        type:Sequelize.STRING
    },
    //总次数
    runTimes:{
        type:Sequelize.INTEGER
    },
    //最小里程
    minMileage:{
        type:Sequelize.INTEGER
    },
    //最大里程
    maxMileage:{
        type:Sequelize.INTEGER
    },
    //单日标准
    dayRule:{
        type:Sequelize.STRING(999)
    },
    //打卡点数
    punchPoints:{
        type:Sequelize.INTEGER
    },
    //可打卡范围
    range:{
        type:Sequelize.INTEGER
    },
    //更新打卡点的最小移动距离
    miniDistance:{
        type:Sequelize.INTEGER
    }
},{
    sequelize,
    modelName:'RunRule'
})

module.exports = RunRule;