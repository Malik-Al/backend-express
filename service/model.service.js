const {Model} = require("../models/models");

class ModelService {
    async createModel(name){
       return await Model.create({name})
    }

    async getAllModels(){
        return await Model.findAll()
    }

    async deleteModel(id){
        return await Model.destroy({where: {id}})
    }
}

module.exports = new ModelService()