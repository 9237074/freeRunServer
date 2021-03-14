//加入koa包
const Koa = require('koa');
//加入koa-bodyparser中间件
const bodyParser = require('koa-bodyparser');
//扫描url
// const controller = require('./controller');
//加载路由
const router = require('./routes')
//数据库配置
const sequelize = require('./db');
const initData = require('./util/initData')
sequelize.sync({
  // force: true
});
initData()
// 处理服务器数据
const httpService = require('./util/http-service')
// 加密数据
const checkKey = require('./util/checkKey')
// 密钥
const key = require('./config').key

const path = require('path')
const static = require('koa-static')
const staticPath = './static'
const errorHandler = require('./middleware/errorHandler')

//实例化koa
const app = new Koa();

// 全局异常处理
app.use(errorHandler)

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(static(
  path.join(__dirname, staticPath)
))
// parse request body:
app.use(bodyParser());
// 加载路由
// console.log(router.routes())
app.use(router.routes())

app.keys = key
app.service = httpService
app.checkKey = checkKey

app.listen(4000);
console.log('app started at port 4000...');

