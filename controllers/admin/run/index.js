const Router = require('koa-router')
const readData = require('./admin_run_data')
const runGrade = require('./admin_run_grade')
const runRecord = require('./admin_run_record')
const runRule = require('./admin_run_rule')

const Run = Router()


Run.post('/readData', readData)
Run.post('/runGrade', runGrade)
Run.post('/runRecord', runRecord)
Run.post('/runRule', runRule)

module.exports = Run