const Router = require('express')
const router = new Router()
const {create, getOne} = require('../controllers/rating.controller')


router.get('/:laptopId', getOne)
router.post('/:laptopId/rate/:rate([1-5])', create)

module.exports = router