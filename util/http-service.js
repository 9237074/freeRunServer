
/**
 * 
 * @param {errorCode} param0 
 * @param {携带信息} param1
 * @param {携带数据} param2
 * @returns 
 */

function httpService(msg = "successful", data = []) {
    return {
        code: 200,
        msg,
        data
    }
}

module.exports = httpService