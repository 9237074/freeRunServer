const Router = require('koa-router')
const runCheck = require('./runcheck')
const runPage = require('./runpage')
const runRank = require('./runrank')
const runRecord = require('./runrecord')
const runGrade = require('./rungrade')

const Run = Router()


Run.post('/runCheck', runCheck)
Run.post('/runPage', runPage)
Run.post('/runRank', runRank)
Run.post('/runRecord', runRecord)
Run.post('/runGrade', runGrade)

module.exports = Run