//admin_login
const Admin = require('../../../models/Admin');
const Token = require('../../../models/Token');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');


var fn_admin_login = async (ctx, next) => {
	const { user, password, studentId } = ctx.request.body
	const student = await Admin.findOne({
		attributes: ["user", "password", "studentId", "name", "status", "updatedAt"],
		where: {
			user,
			password,
		}
	}).catch(e => {
		throw new ServerException("数据库异常", 50001, e.message + ' /admin_login.js')
	})
	if (student.password !== password) {
		throw new ParameterException("账号或者密码错误", 40002)
	}
	const newToken = ctx.app.checkKey(user + password)
	console.log(newToken, studentId)
	const [tokenSql, isCreated] = await Token.findOrCreate({
		where: {
			token: newToken,
		},
		defaults: {
			uid: studentId,
			token: newToken,
			time: Date.now() / 1000
		}
	}).catch(e => {
		throw new ServerException("数据库异常", 50001, e.message + ' /login.js')
	})
	student.setDataValue("token", newToken)
	student.setDataValue("password", '')
	ctx.body = ctx.app.service("登录成功", student)

}

module.exports = fn_admin_login
