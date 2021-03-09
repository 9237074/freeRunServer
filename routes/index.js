const Router = require('koa-router')

const Admin = require('../controllers/admin')
const Moble = require('../controllers/moble')
const Test = require('../controllers/test')

const router = new Router()


const checkToken = async(ctx, next)=>{
    console.log('middleware')
    next('middleware')
}

// router.get('/info',checkToken, async(ctx, next)=>{
//     ctx.response.body = ctx
// })

router.use('/admin', Admin.routes())
router.use('/moble', Moble.routes())
router.use('/test', Test.routes())

module.exports = router