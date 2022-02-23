const {validationResult} = require('express-validator')
const apiError = require('../error/api.error')
const userService = require('../service/auth/user.service')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(apiError.badRequest('Ошибка при валидаций', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password) // передаем поля email, password для регистраций
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // записываем в cookie refreshToken с времени жизни 30 дней
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }


    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // записываем в cookie refreshToken с времени жизни 30 дней
            return res.json(userData)

        }catch (e) {
            next(e)
        }
    }


    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies // достаем refreshToken
            const token = await userService.logout(refreshToken) // передаем refreshToken
            res.clearCookie('refreshToken') // очищаем refreshToken
            return res.json(token)
        }catch (e) {
            next(e)
        }
    }


    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.API_URL_FRONTEND)
        }catch (e) {
            next(e)
        }
    }


    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies // достаем refreshToken
            const refresh = await userService.refresh(refreshToken)
            res.cookie('refreshToken', refresh.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // записываем в cookie refreshToken с времени жизни 30 дней
            return res.json(refresh)
        }catch (e) {
            next(e)
        }
    }


    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        }catch (e) {
            next(e)
        }
    }


    async check(req, res, next) { // TODO пока не используется
        const {id} = req.query
        if(!id){
            return next(apiError.badRequest('Не задан id!'))
        }
        res.json(id)
    }
}

module.exports = new UserController()