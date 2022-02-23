const Router = require('express')
const router = new Router()
const {create, getAll, getAllBasketLaptop, getOne} = require('../controllers/basket.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.get('/', getAllBasketLaptop)
router.get('/id', getAll)
router.get('/:id', getOne)
router.post('/:basketId/laptop/:laptopId/append/:quantity([0-9]+)', authMiddleware, create)


module.exports = router
