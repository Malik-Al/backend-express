const Router = require('express')
const router = new Router()
const {create, getAll, getAllBasketLaptop, getOne} = require('../controllers/basket.controller')


router.get('/', getAllBasketLaptop)
router.get('/id', getAll)
router.get('/:id', getOne)
router.post('/:basketId/:laptopId/append/:quantity([0-9]+)', create)


module.exports = router
