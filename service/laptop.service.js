const uuid = require("uuid");
const path = require("path");
const {Laptop} = require("../models/models");
const fileImgDelete = require('./delete.img.file')
const ApiError = require("../error/apiError");

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
       const laptop = await Laptop.findOne({where: {id}})
        if(!laptop){
            throw ApiError.badRequest()
        }
        await fileImgDelete(laptop.img)
        return await Laptop.destroy({where: {id}})
    }

    async updateLaptop(name, price, description, modelId, img,id){  // TODO доработать
        let fileName = `${uuid.v4()}.jpg`
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const data = {
            name: name,
            price: price,
            description: description,
            modelId: modelId,
            img: fileName
        }
        return await Laptop.update(data,{where: {id}})

    }

}
module.exports = new LaptopService()