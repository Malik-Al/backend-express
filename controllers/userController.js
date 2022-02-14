const apiError = require('../error/apiError')

class UserController {
    async registration(req, res, next) {
        try {

        }catch (e) {

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