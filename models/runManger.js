const sequelize = require('../db');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class runManger extends Model{}
runManger.init({
    //跑区ID
    runId:{
        type:Sequelize.STRING,
        primaryKey: true,//设置主键
    },
    //跑区名称
    runName:{
        type:Sequelize.STRING
    },
    //类型
    runType:{
        type:Sequelize.STRING
    },
    //打卡点
    punchPoint:{
        type:Sequelize.INTEGER
    },
    //累计跑步次数
    runTimes:{
        type:Sequelize.BIGINT
    },
    //累计打卡次数
    punchTimes:{
        type:Sequelize.BIGINT
    },
    //累计里程
    runMileage:{
        type:Sequelize.BIGINT
    },
    //参与人数
    runNumber:{
        type:Sequelize.BIGINT
    }
},{
    sequelize,
    modelName:'runManger'
})

module.exports = runManger;