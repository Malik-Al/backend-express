const {Laptop, User, Rating} = require('../models/models')
const TokenService = require('./auth/token.service')
const ApiError = require('../error/api.error')

class RatingService {
    async getOne(laptopId) {
        const laptop = await Laptop.findByPk(laptopId)
        if (!laptop) {
            throw ApiError.badRequest()
        }
        const votes = await Rating.count({where: {laptopId}})
        if (votes) {
            const rates = await Rating.sum('rate', {where: {laptopId}})
            return {rates, votes, rating: rates/votes}
        }
        return {rates: 0, votes: 0, rating: 0}
    }


    async create(authUser, laptopId, rate) {
        const userToken = authUser.split(' ')[1]
        const userId = TokenService.validateAccessToken(userToken).id // получаем id ползователя по токену
        const laptop = await Laptop.findByPk(laptopId)
        if (!laptop) {
            throw ApiError.badRequest('Нет laptop с таким id в базе!')
        }
        const user = await User.findByPk(userId)
        if (!user) {
            throw ApiError.badRequest('Нет user с таким id в базе!')
        }
        const rating = await Rating.create({userId, rate, laptopId})
        return rating
    }
}

module.exports = new RatingService()