const apiError = require('../error/apiError')
const {createLaptop, getAllLaptops, getOneLaptop, deleteLaptop, updateLaptop} = require('../service/laptop.service')

class LaptopController {
    async create(req, res, next) {
        try {
            const {name, price, description, modelId} = req.body
            const {img} = req.files
            const laptop = await createLaptop(name, price, description, modelId, img)
            return res.json(laptop)
        }catch (e){
            next(apiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {modelId} = req.query
            let laptopsModel = await getAllLaptops(modelId)
            return res.json(laptopsModel)
        }catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const laptop = await getOneLaptop(id)
            return res.json(laptop)
        }catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {  // TODO доработать
        try {
            const {name, price, description, modelId} = req.body
            const {id} = req.params
            const {img} = req.files
            const newLaptop = await updateLaptop(name, price, description, modelId, img, id)
            return res.json(newLaptop)

        }catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params
            const laptop = await deleteLaptop(id)
            return res.json(laptop)
        }catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new LaptopController()