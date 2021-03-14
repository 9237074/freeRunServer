// 忘记密码
const Student = require('../../../models/Student');
const { InfoException, ParameterException, ServerException } = require('../../../util/http-exception');

const fn_forgetPassword = async (ctx, next) => {
	const { studentId, password, newPassword } = ctx.request.body
	const pdToken = ctx.app.checkKey(studentId + password)
	const newPdToken = ctx.app.checkKey(studentId + newPassword)
	const student = await Student.findOne({
		where: {
			studentId: studentId,
			password: pdToken
		}
	}).catch(e => {
		throw new ServerException("数据库查找异常", 50001, e.message + 'forgetPassword.js')
	})

	if (student === null) {
		throw new ParameterException("账号或者密码错误", 40002)
	}

	const studentU = await Student.update({
		password: newPdToken
	}, {
		where: {
			studentId: studentId
		}
	}).catch(e => {
		throw new ServerException("数据库更新异常", 50001, e.message + 'forgetPassword.js')
	})
	ctx.body = ctx.app.service("密码找回成功", studentU)
}
module.exports = fn_forgetPassword