const Router = require('express')
const router = new Router()
const {createRating, getOne} = require('../controllers/rating.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.get('/:laptopId', getOne)
router.post('/:laptopId/rate/:rate([1-5])', authMiddleware, createRating)

module.exports = router