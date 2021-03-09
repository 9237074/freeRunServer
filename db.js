const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    timezone: '+08:00',
    logging: false
});

// const Student = require('./models/Student.js');
// const RunManger = require('./models/RunManger.js');
// const RunRule = require('./models/RunRule.js');
// const ReadRule = require('./models/ReadRule.js');
// const ReadTheme = require('./models/ReadTheme.js');
// const Setting = require('./models/Setting.js');
// const RunRecord = require('./models/RunRecord.js');
// const Teacher = require('./models/Teacher.js');
// const Token = require('./models/Token.js');
// const UserAdmin = require('./models/UserAdmin.js');
// const ReadRecord = require('./models/ReadRecord.js')
// const Admin = require('./models/Admin.js')
// const RunGrade = require('./models/RunGrade.js')
// const ReadGrade = require('./models/ReadGrade.js')
// const StudentInfo = require('./models/StudentInfo.js')
// const LoginLog = require('./models/LoginLog.js')

// Admin.findOrCreate({
//     where: {
//         user: 'admin'
//     },
//     defaults: {
//         password: '12b0526a9e0f55dffc6a9f8535eed68f410d2c34d96895fd85e82a04c12d6e7b',
//         name: 'admin1',
//         studentId: 1,
//         status: 1
//     }
// })

module.exports = sequelize;
// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     timezone: '+08:00'
// });