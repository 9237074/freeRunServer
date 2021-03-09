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
sequelize.sync();
const path = require('path')
const static = require('koa-static')
const staticPath = './static'

//实例化koa
const app = new Koa();

app.use(static(
  path.join(__dirname, staticPath)
))
// parse request body:
app.use(bodyParser());
// 加载路由
// console.log(router.routes())
app.use(router.routes())

app.keys = '55c1e2cb05f44015e857a63138d1cf15'

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});

app.listen(4000);
console.log('app started at port 4000...');

