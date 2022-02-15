const Router = require('express')
const {body} = require('express-validator')
const router = new Router()
const {registration, login, check, activate, logout, getUsers, refresh} = require('../controllers/userController')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/')
router.get('/auth', check)

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 30}),
    registration)
router.post('/login', login)
router.post('/logout', logout)
router.get('/refresh', refresh)
router.get('/users', authMiddleware, getUsers)
router.get('/activate/:link', activate)

router.delete('/:id')

module.exports = router
