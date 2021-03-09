const checkToken = require('../util/checkToken');
const sequelize = require('../db');
const midCheckToken = async (ctx, next) => {
    console.log('midCheckToken')
    next('midCheckToken')
}
module.exports = midCheckToken