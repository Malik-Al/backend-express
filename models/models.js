const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    email: {type: DataTypes.STRING, unicode: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING(1000)},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})


const Token = sequelize.define('token',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    refreshToken: {type: DataTypes.STRING(1000), allowNull: false},
})


const Basket = sequelize.define('basket',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
})


const BasketLaptop = sequelize.define('basket_laptop',{
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})


const Laptop = sequelize.define('laptop',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING, unicode: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},

    screen: {type: DataTypes.STRING, allowNull: false}, // экран
    processing: {type: DataTypes.STRING, allowNull: false}, // процессор
    videoCard: {type: DataTypes.STRING, allowNull: false}, // видео карта
    ram: {type: DataTypes.STRING, allowNull: false}, // Оперативная память
    memory: {type: DataTypes.STRING, allowNull: false}, // Встроенная память
})



const Model = sequelize.define('model',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING, unicode: true, allowNull: false},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Token)  // connect token user
Token.belongsTo(User)

Model.hasMany(Laptop)
Laptop.belongsTo(Model)


Basket.belongsToMany(Laptop,{through: BasketLaptop, onDelete: 'CASCADE'})
Laptop.belongsToMany(Basket, {through: BasketLaptop})


module.exports = {
    User,
    Token,
    Basket,
    Model,
    Laptop,
    BasketLaptop,
}