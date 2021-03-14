/**
 * http 错误类型的 对象
 */

class HttpException extends Error {
  /**
   * 构造函数，可以设置默认值
   * @param {返回的错误信息} msg 
   * @param {错误编号} errorCode 
   * @param {httpcode} code 
   */
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class InfoException extends HttpException{
  // 20000 => 默认
  // 20001 => 数据已存在
  constructor(msg="数据异常", errorCode=20000){
    super()
    this.code = 200
    this.msg = msg
    this.errorCode = errorCode
  }
}
/**
   * 参数异常类
   * @param {返回的错误信息} msg
   * @param {errorCode} errorCode
   */
class ParameterException extends HttpException {
  /*
    40001 参数不完整
    40002 参数不符合要求
  */
  constructor(msg="参数错误", errorCode=40000) {
    super();
    this.code = 400
    this.msg = msg
    this.errorCode = errorCode
  }
}

class ServerException extends HttpException{
  // 50000 => 默认
  // 50001 => 数据库异常
  constructor(msg="服务器异常", errorCode=50000, rawMessage){
    super()
    this.code = 500
    this.msg = msg
    this.errorCode = errorCode
    this.message = rawMessage || '未抛出异常信息'
  }
}

module.exports = {
  HttpException,
  InfoException,
  ParameterException,
  ServerException
}