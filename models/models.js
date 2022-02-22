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


const Rating = sequelize.define('rating', {          // Райтинг товара
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})


const Model = sequelize.define('model',{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING, unicode: true, allowNull: false},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Token, {onDelete: 'CASCADE'})  // connect token user
Token.belongsTo(User)

// связь пользователя с рейтингами: пользователь может оценить несколько товаров,
// но каждая запись в таблице ratings связана только с одним пользователем
User.hasMany(Rating, {onDelete: 'CASCADE'})
Rating.belongsTo(User)


Model.hasMany(Laptop, {onDelete: 'CASCADE'})
Laptop.belongsTo(Model)


// связь товара с рейтингами: товар может иметь несколько оценок от разных
// пользователей, но каждая оценка пользователя принадлежит одному товару
Laptop.hasMany(Rating, {onDelete: 'CASCADE'})
Rating.belongsTo(Laptop)


Basket.belongsToMany(Laptop,{through: BasketLaptop, onDelete: 'CASCADE'})
Laptop.belongsToMany(Basket, {through: BasketLaptop})


module.exports = {
    User,
    Token,
    Basket,
    Model,
    Laptop,
    BasketLaptop,
    Rating
}