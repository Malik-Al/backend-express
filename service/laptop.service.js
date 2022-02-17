const uuid = require("uuid");
const path = require("path");
const {Laptop, LaptopInfo} = require("../models/models");
const ApiError = require("../error/apiError");
const folderService = require('./folder.service')

class LaptopService {

    async createLaptop(
        name,
        price,
        modelId,
        screen,
        processing,
        videoCard,
        ram,
        memory,
        img
    ) {
        let fileName = `${uuid.v4()}.jpg`
        await folderService.create(img, fileName)
        return await Laptop.create({
            name,
            price,
            modelId,
            screen,
            processing,
            videoCard,
            ram,
            memory,
            img: fileName})
    }


    async getAllLaptops(modelId){
        if(!modelId){
            return await Laptop.findAll()
        }
        return await Laptop.findAll({where: {modelId}})
    }


    async getOneLaptop(id){
      return await Laptop.findOne({where: {id},})
    }


    async deleteLaptop(id){
       const laptop = await Laptop.findOne({where: {id}})
        if(!laptop){
            throw ApiError.badRequest()
        }
        if(laptop.img){
            await folderService.remove(laptop.img)
        }
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