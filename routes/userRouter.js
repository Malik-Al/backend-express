const Router = require('express')
const router = new Router()
const {registration, login, check, activate, logout, getUsers, refresh} = require('../controllers/userController')

router.get('/')
router.get('/auth', check)

router.post('/registration', registration)
router.post('/login', login)
router.post('/logout', logout)
router.get('/refresh', refresh)
router.get('/users', getUsers)
router.get('/activate/:link', activate)

router.delete('/:id')

module.exports = router
