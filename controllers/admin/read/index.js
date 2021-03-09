const Router = require('koa-router')
const addtheme = require('./admin_read_addtheme')
const readData = require('./admin_read_data')
const readRecord = require('./admin_read_record')
const readTheme = require('./admin_read_theme')

const Read = Router()


Read.post('/addTheme', addtheme)
Read.post('/readData', readData)
Read.post('/readRecord', readRecord)
Read.post('/readTheme', readTheme)

module.exports = Read