const Router = require('koa-router')
const runData = require('./admin_run_data')
const runGrade = require('./admin_run_grade')
const runRecord = require('./admin_run_record')
const runRule = require('./admin_run_rule')

const Run = Router()


Run.post('/runData', runData)
Run.post('/runGrade', runGrade)
Run.post('/runRecord', runRecord)
Run.post('/runRule', runRule)

module.exports = Run