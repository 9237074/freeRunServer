//跑步规则
const checkToken = require('../../../util/checkToken');
const Student = require('../../../models/Student');
const RunRule = require('../../../models/RunRule');
const sequelize = require('../../../db');
var fn_admin_run_rule = async (ctx, next) => {

    const manRule = await RunRule.findAll({
        where: {
            gender: "男"
        }
    })
    const womanRule = await RunRule.findAll({
        where: {
            gender: "女"
        }
    })

    ctx.body = ctx.app.service("获取规则成功", {
        manRule,
        womanRule
    })
}
module.exports = fn_admin_run_rule