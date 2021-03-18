//admin_login
const Admin = require('../../../models/Admin');
const Token = require('../../../models/Token');
const crypto = require("crypto");
const appkey = require('../../../app')
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');


var fn_admin_login = async (ctx, next) => {
	const { user, password, token } = ctx.request.body
	const realToken = ctx.app.checkKey(user + password)
	if (realToken !== token) {
		throw new ParameterException("账号或者密码错误", 40002)
	}
	const student = await Admin.findOne({
		where: {
			user,
			password,
		}
	}).catch(e => {
		throw new ServerException("数据库异常", 50001, e.message + ' /admin_login.js')
	})
	if (!student) {
		throw new ParameterException("账号或者密码错误", 40002)
	}
	if (student.password === password) {
		ctx.body = ctx.app.service("登录成功", student)
	}
	throw new ParameterException("账号或者密码错误", 40002)

}

module.exports = fn_admin_login
