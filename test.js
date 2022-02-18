const {Laptop} = require("./models/models");
const img = 'c4db3b1f-65e1-47c2-9104-0af88f2b3563.jpg'
const res = Laptop.findAll({where: {img}})

console.log('res', res)