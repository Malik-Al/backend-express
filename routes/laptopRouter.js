const Router = require('express')
const router = new Router()
const {create, remove, getAll, getOne, update} = require('../controllers/laptopController')

router.get('/', getAll)
router.post('/', create)
router.get('/:id', getOne)
router.put('/:id', update)
router.delete('/:id', remove)

module.exports = router
