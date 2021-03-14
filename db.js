const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    timezone: '+08:00',
    charset: 'utf8',
    logging: false
}); 

module.exports = sequelize;