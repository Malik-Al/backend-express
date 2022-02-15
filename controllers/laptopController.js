const laptopService = require('../service/laptop.service')

class LaptopController {
    async create(req, res, next) {
        try {
            const {name, price, description, modelId} = req.body
            const {img} = req.files
            const laptop = await laptopService.createLaptop(name, price, description, modelId, img)
            return res.json(laptop)
        }catch (e){
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {modelId} = req.query
            let laptopsModel = await laptopService.getAllLaptops(modelId)
            return res.json(laptopsModel)
        }catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const laptop = await laptopService.getOneLaptop(id)
            return res.json(laptop)
        }catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {  // TODO доработать
        try {
            const {name, price, description, modelId} = req.body
            const {id} = req.params
            const {img} = req.files
            const newLaptop = await laptopService.updateLaptop(name, price, description, modelId, img, id)
            return res.json(newLaptop)

        }catch (e) {
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params
            const laptop = await laptopService.deleteLaptop(id)
            return res.json(laptop)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new LaptopController()