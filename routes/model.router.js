const Router = require('express')
const router = new Router()
const {create, getAll, remove} = require('../controllers/model.controller')

router.get('/', getAll)
router.post('/', create)
router.delete('/:id', remove)

module.exports = router
