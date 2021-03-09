const Router = require('koa-router')
const readCheck = require('./readcheck')
const readPage = require('./readpage')
const readRank = require('./readrank')
const readRecord = require('./readrecord')

const Read = Router()


Read.post('/readCheck', readCheck)
Read.post('/readPage', readPage)
Read.post('/readRank', readRank)
Read.post('/readRecord', readRecord)

module.exports = Read