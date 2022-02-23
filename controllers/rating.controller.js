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


    async createRating(req, res, next) {
        try {
            const {laptopId, rate} = req.params
            const authUser = req.headers.authorization
            const rating = await RatingService.create(authUser, laptopId, rate)
            res.json(rating)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new RatingController()