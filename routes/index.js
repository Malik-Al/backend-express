const Router = require('express')
const router = new Router()
const userRouter = require('./userr.router')
const laptopRouter = require('./laptop.router')
const modelRouter = require('./model.router')

router.use('/user', userRouter)
router.use('/laptop', laptopRouter)
router.use('/model', modelRouter)

module.exports = router
