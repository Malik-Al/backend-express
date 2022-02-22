const {Laptop, User, Rating} = require('../models/models')


class RatingService {
    async getOne(laptopId) {
        const laptop = await Laptop.findByPk(laptopId)
        if (!laptop) {
            throw new Error('Laptop не найден в БД')
        }
        const votes = await Rating.count({where: {laptopId}})
        if (votes) {
            const rates = await Rating.sum('rate', {where: {laptopId}})
            return {rates, votes, rating: rates/votes}
        }
        return {rates: 0, votes: 0, rating: 0}
    }

    async create(userId, laptopId, rate) { // TODO надо до работать
        console.log('userId', userId)
        console.log('laptopId', laptopId)
        console.log('rate', rate)

        const laptop = await Laptop.findByPk(laptopId)
        if (!laptop) {
            throw new Error('Laptop не найден в БД')
        }
        const user = await User.findByPk(userId)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        const rating = await Rating.create({rate, userId, laptopId})
        return rating
    }
}


module.exports = new RatingService()