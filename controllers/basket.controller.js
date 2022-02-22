const BasketService = require('../service/basket.service')

class BasketController {

    async create(req, res, next){
        try {
            const {basketId, laptopId, quantity} = req.params
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

    async getOne(req, res, next){
        try {
            const {id} = req.params
            const getAll = await BasketService.getOneBasket(id)
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