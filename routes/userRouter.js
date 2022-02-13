const Router = require('express')
const router = new Router()
const {registration, login, check} = require('../controllers/userController')

router.get('/')
router.get('/auth', check)
router.post('/registration', registration)
router.post('/login', login)
router.delete('/:id')

module.exports = router
