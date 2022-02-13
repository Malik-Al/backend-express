const Router = require('express')
const router = new Router()
const {createModel, getAllModels, deleteModel} = require('../controllers/modelController')

router.get('/', getAllModels)
router.post('/', createModel)
router.delete('/:id', deleteModel)

module.exports = router
