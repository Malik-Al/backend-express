const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const laptopRouter = require('./laptopRouter')
const modelRouter = require('./modelRouter')

router.use('/user', userRouter)
router.use('/laptop', laptopRouter)
router.use('/model', modelRouter)

module.exports = router
