const Student = require('../models/Student.js');

var fn_demo = async (ctx, next) => {
//     let promise=Student.create({
//         user:'liu',
//         password:'123',
//         studentId:'172720158',
//         name:'liu',
//         gender:'man',
//         Department:'AI',
//         profession:'通信',
//         grade:'2017',
//         status:0
//     });
//     let student=await promise;
//         ctx.response.body =JSON.stringify(student);
//    };
        ctx.response.body = "demo page";
    };

module.exports = {
    'GET /demo': fn_demo
};