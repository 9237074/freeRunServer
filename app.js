//加入koa包
const Koa = require('koa');
//加入koa-bodyparser中间件
const bodyParser = require('koa-bodyparser');
//扫描url
const controller = require('./controller');
//数据库配置
const sequelize = require('./db');
const Student = require('./models/Student.js');
const runManger = require('./models/runManger.js');
const runRule = require('./models/runRule.js');
const readRule = require('./models/readRule.js');
const readTheme = require('./models/readTheme.js');
const setting = require('./models/setting.js');
const sportRecord = require('./models/sportsRecord.js');
const Teacher = require('./models/Teacher.js');
const Token = require('./models/token.js');
const userAdmin = require('./models/userAdmin.js');
const readRecord = require('./models/readRecord.js')
const admin = require('./models/admin.js')
const runGrade = require('./models/runGrade.js')
const readGrade = require('./models/readGrade.js')
const studentInfo = require('./models/studentInfo.js')
const loginLog = require('./models/loginLog.js')
sequelize.sync();
const path = require('path')
const static = require('koa-static')
const staticPath = './dist'

//实例化koa
const app = new Koa();

app.use(static(
  path.join( __dirname,  staticPath)
))
//appKey='55c1e2cb05f44015e857a63138d1cf15'
const appKey = '55c1e2cb05f44015e857a63138d1cf15';
// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(4000,'127.0.0.1');
console.log('app started at port 4000...');

exports.appkey = '55c1e2cb05f44015e857a63138d1cf15'
