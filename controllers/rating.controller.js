const RatingService = require('../service/rating.service')

class RatingController {
    async getOne(req, res, next) {
        try {
            const rating = await RatingService.getOne(req.params.laptopId)
            res.json(rating)
        } catch(e) {
            next(e.message)
        }
    }

    async create(req, res, next) { // TODO надо до работать
        try {
            const {laptopId, rate} = req.params
            const userId = req.auth.userId
            const rating = await RatingService.create(userId, laptopId, rate)
            res.json(rating)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new RatingController()