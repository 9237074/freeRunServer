
const Admin = require('../models/Admin')

function initData() {
    Admin.findOrCreate({
        where: {
            uid: 1
        },
        defaults: {
            uid: 1,
            user: "admin",
            password: '12b0526a9e0f55dffc6a9f8535eed68f410d2c34d96895fd85e82a04c12d6e7b',
            name: 'admin',
            studentId: 1,
            status: 1
        }
    }).then(val => {
        console.log('初始化数据成功')
    })
}

module.exports = initData