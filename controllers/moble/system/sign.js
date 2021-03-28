const Student = require('../../../models/Student');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

const sign = async (ctx, next) => {
	const { user, password, studentId, name, department, profession, grade } = ctx.request.body
	// console.log({user, password, studentId, name, department, profession, grade})
	if (String(password).length < 8) {
		throw new ParameterException("密码长度需要大于8位", 40002)
	}
	const [student, isCreated] = await Student.findOrCreate({
		attributes: ["user", "studentId", "name", "department", "profession", "grade", "fraction", "status"],
		where: {
			studentId: studentId
		},
		defaults: {
			user,
			password: ctx.app.checkKey(studentId + password),
			studentId: studentId,
			name,
			department,
			profession,
			grade
		}
	}).catch(e => {
		throw new ServerException("数据库异常", 50001, e.message + ' /sign.js')
	})
	if (isCreated) {
		ctx.body = ctx.app.service("注册成功", student)
	} else {
		throw new InfoException("该用户已存在", 20001)
	}
}

module.exports = sign
