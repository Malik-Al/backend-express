const uuid = require("uuid");
const path = require("path");
const {Laptop} = require("../models/models");

class LaptopService {
    async createLaptop(name, price, description, modelId, img) {
        let fileName = `${uuid.v4()}.jpg`
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        return await Laptop.create({name, price, description, modelId, img: fileName})
    }

    async getAllLaptops(modelId){
        if(!modelId){
            return await Laptop.findAll()
        }
        return await Laptop.findAll({where: {modelId}})
    }

    async getOneLaptop(id){
       return await Laptop.findOne({where: {id}})
    }


    async deleteLaptop(id){
       return await Laptop.destroy({where: {id}})
    }

    async updateLaptop(id){

    }

}
module.exports = new LaptopService()