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
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
})


const Laptop = sequelize.define('laptop',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING, unicode: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})


const Model = sequelize.define('model',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING, unicode: true, allowNull: false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Token)  // connect token user
Token.belongsTo(User)

Basket.hasMany(BasketLaptop)
BasketLaptop.belongsTo(Basket)

Model.hasMany(Laptop)
Laptop.belongsTo(Model)

Laptop.hasMany(BasketLaptop)
BasketLaptop.belongsTo(Laptop)

module.exports = {
    User,
    Token,
    Basket,
    Model,
    Laptop,
    BasketLaptop,
}