const BasketService = require('../service/basket.service')

class BasketController {
    async createBasket(req, res, next) {
        try {
            const basketId = await BasketService.createBasket()
            res.json(basketId)
        }catch (e) {
            next(e)
        }
    }

    async create(req, res, next){
        try {
            const {basketId, laptopId, quantity} = req.body
            const create = await BasketService.appendBasketLaptop(basketId, laptopId, quantity)
            res.json(create)
        }catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next){
        try {
            const getAll = await BasketService.getAllBasket()
            res.json(getAll)
        }catch (e) {
            next(e)
        }
    }

    async getAllBasketLaptop(req, res, next){
        try {
            const getAll = await BasketService.getAllBasketLaptop()
            res.json(getAll)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new BasketController()