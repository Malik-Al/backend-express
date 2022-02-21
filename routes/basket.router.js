const Router = require('express')
const router = new Router()
const {create, getAll, createBasket, getAllBasketLaptop} = require('../controllers/basket.controller')


router.get('/', getAllBasketLaptop)
router.get('/one', getAll)
router.get('/create', createBasket)
router.post('/laptop/append', create)


module.exports = router
