const {Basket} = require('../models/models')
const {Laptop} = require('../models/models')
const {BasketLaptop} = require('../models/models')

const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.laptops = []
    console.log('basket.laptops', data)
    if (basket.laptops) {
        data.laptops = basket.laptops.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                modelId: item.modelId,
                screen: item.screen,
                processing: item.processing,
                videoCard: item.videoCard,
                ram: item.ram,
                memory: item.memory,
                img: item.img,
                quantity: item.basket_laptop.quantity
            }
        })
    }
    return data
}

class BasketService {

    async getAllBasket(){      // получить корзины
        return await Basket.findAll()
    }

    async getOneBasket(id){      // получить корзины
        let basket = await Basket.findByPk(id, {
            attributes: ['id'],
            include: [{model: Laptop,
                attributes: ['id', 'name', 'price', 'modelId', 'screen', 'processing', 'videoCard', 'ram', 'memory', 'img']}
            ],
        })
        return pretty(basket)
    }


    async getAllBasketLaptop(){
        const basket = await BasketLaptop.findAll() // получить корзину с laptop
        return basket
    }


    async appendBasketLaptop(basketId, laptopId, quantity){ // добавление laptop в корзину и количество laptop
        return await BasketLaptop.create({quantity, laptopId, basketId })
    }

}
module.exports = new BasketService()