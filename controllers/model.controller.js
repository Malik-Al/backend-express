const modelService = require('../service/model.service')

class ModelController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const model = await modelService.createModel(name)
            return res.json(model)
        }catch (e) {
            next(e)
        }
    }


    async getAll(req, res, next) {
        try {
            const models = await modelService.getAllModels()
            return res.json(models)
        }catch (e) {
            next(e)
        }
    }


    async remove(req, res, next) {
        try {
            const {id} = req.params
            const laptop = await modelService.deleteModel(id)
            return res.json(laptop)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new ModelController()