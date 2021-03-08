//加入koa包
const Koa = require('koa');
//加入koa-bodyparser中间件
const bodyParser = require('koa-bodyparser');
//扫描url
const controller = require('./controller');
//数据库配置
const sequelize = require('./db');
const Student = require('./models/Student.js');
const runManger = require('./models/RunManger.js');
const runRule = require('./models/RunRule.js');
const readRule = require('./models/ReadRule.js');
const readTheme = require('./models/ReadTheme.js');
const setting = require('./models/Setting.js');
const sportRecord = require('./models/SportsRecord.js');
const Teacher = require('./models/Teacher.js');
const Token = require('./models/Token.js');
const userAdmin = require('./models/UserAdmin.js');
const readRecord = require('./models/ReadRecord.js')
const admin = require('./models/Admin.js')
const runGrade = require('./models/RunGrade.js')
const readGrade = require('./models/ReadGrade.js')
const studentInfo = require('./models/StudentInfo.js')
const loginLog = require('./models/LoginLog.js')
sequelize.sync();
const path = require('path')
const static = require('koa-static')
const staticPath = './static'

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

app.listen(4000);
console.log('app started at port 4000...');

exports.appkey = '55c1e2cb05f44015e857a63138d1cf15'
