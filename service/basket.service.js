const {Basket} = require('../models/models')
const {Laptop} = require('../models/models')
const {BasketLaptop} = require('../models/models')


class BasketService {

    async getAllBasket(){      // получить корзины
        return await Basket.findAll()
    }

    async getAllBasketLaptop(){
        return await BasketLaptop.findAll() // получить корзину с laptop
    }

    async createBasket(){ // создание корзины
        const basket = await Basket.create()
        return basket
    }

    async appendBasketLaptop(basketId, laptopId, quantity){ // добавление laptop в корзину и количество laptop
        const create = await BasketLaptop.create({quantity, laptopId, basketId })
        return create
    }

}
module.exports = new BasketService()