const Sequelize = require('sequelize');
const config = require('./config');

// sequelize.query("CREATE DATABASE freeRun")
// sequelize.query("DROP DATABASE freeRun")
// sequelize.query("select * from information_schema.SCHEMATA where SCHEMA_NAME = 'freeRun'")

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    timezone: '+08:00'
});

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     timezone: '+08:00'
// });

module.exports = sequelize;