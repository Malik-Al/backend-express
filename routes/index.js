const Router = require('express')
const router = new Router()
const userRouter = require('./user.router')
const laptopRouter = require('./laptop.router')
const modelRouter = require('./model.router')
const basketRouter = require('./basket.router')

router.use('/basket', basketRouter)
router.use('/user', userRouter)
router.use('/laptop', laptopRouter)
router.use('/model', modelRouter)

module.exports = router
