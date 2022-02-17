const apiError = require('../error/api.error')
const tokenService = require('../service/auth/token.service')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization // достаем header запроса
        if(!authorizationHeader){
            return next(apiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1] // достаем accessToken
        if(!authorizationHeader){
            return next(apiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken) // вызываем функцию валидации accessToken
        if(!userData){
            return next(apiError.UnauthorizedError())
        }
        req.user = userData // записываем данные пользователя из токена
        next()

    }catch (e) {
       return  next(apiError.UnauthorizedError())
    }
}