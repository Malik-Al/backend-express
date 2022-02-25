const laptopService = require('../service/laptop.service')

class LaptopController {
    async create(req, res, next) {
        try {
            const {name, price, modelId, screen, processing, videoCard, ram, memory} = req.body
            const {img} = req.files
            const laptop = await laptopService.createLaptop(
                name,
                price,
                modelId,
                screen,
                processing,
                videoCard,
                ram,
                memory,
                img)
            return res.json(laptop)
        }catch (e){
            next(e)
        }
    }


    async getAll(req, res, next) {
        try {
            const {modelId} = req.params
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


    async update(req, res, next) {
        try {
            const {name, price, modelId, screen, processing, videoCard, ram, memory} = req.body
            const {id} = req.params
            const img = req.files?.img ?? ''
            const newLaptop = await laptopService.updateLaptop(name, price, modelId, screen, processing, videoCard, ram, memory, img, id)
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

    async search(req, res, next){
        try {
            const {query} = req.query
            const searchQuery = await laptopService.searchLaptop(query)
            return res.json(searchQuery)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new LaptopController()