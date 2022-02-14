const apiError = require('../error/apiError')
const userService = require('../service/auth/user.service')

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password) // передаем поля email, password для регистраций
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // записываем в cookie refreshToken с времени жизни 30 дней
            return res.json(userData)
        }catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next) {
        try {

        }catch (e) {

        }
    }

    async logout(req, res, next) {
        try {

        }catch (e) {

        }
    }

    async activate(req, res, next) {
        try {

        }catch (e) {

        }
    }


    async refresh(req, res, next) {
        try {

        }catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {

        }catch (e) {

        }
    }

    async check(req, res, next) {
        const {id} = req.query
        if(!id){
            return next(apiError.badRequest('Не задан id!'))
        }
        res.json(id)
    }
}

module.exports = new UserController()