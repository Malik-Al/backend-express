const bcrypt = require('bcrypt');
const uuid = require('uuid');
const {User, Basket} = require('../../models/models');
const mailService = require('./mail.service');
const tokenService = require('./token.service')
const UserDto = require('../../dto/user.dto')
const ApiError = require('../../error/apiError')

class UserService {
    async registration(email, password){
        const candidate = await User.findOne({where: {email: email}})  // проверка на наличие пользователя в базе
        if(candidate){
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`) // если пользовател есть в базе выдаем ошибку
        }
        const hashPassword = await bcrypt.hash(password, 5)  // хешируем пароль
        const activationLink = uuid.v4(); // хешируем ссылку

        const user = await User.create({email, password: hashPassword, activationLink}) // создаем пользователя и передаем значения
        await Basket.create({userId: user.id})
        await mailService.sendActivationMail(email, `${process.env.API_URL_BACKEND}/api/user/activate/${activationLink}`) // отправка писма на почту для активаций

        const userDto = new UserDto(user) // только поля email, id, isActivate
        const tokens = tokenService.generateTokens({...userDto}) // разворачиваем объект

        await tokenService.saveToken(userDto.id, tokens.refreshToken) // сохронения refresh токена в базу
        return {...tokens, userId: userDto} // вернет tokens, id, email, isActivate
    }

    async activate(activationLink){
        const user = await User.findOne({where: {activationLink: activationLink}}) // проверка на наличие ссылки активаций
        if(!user){
            throw ApiError.badRequest('Неккоректная ссылка активации') // если ссылка не корректная выбрасываем ошибку
        }
        user.isActivated = true; // меняем поля isActivated в значение true и сохроняем
        await user.save();
    }

    async login(email, password){
        const user = await User.findOne({where: {email: email}})  // проверка на наличие пользователя в базе
        if(!user){
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} не найден`) // если пользовател есть в базе выдаем ошибку
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.badRequest(`Неверный пароль`) // если пользовател есть в базе выдаем ошибку
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken) // сохронения refresh токена в базу
        return {...tokens, userId: userDto} // вернет tokens, id, email, isActivate

    }

}

module.exports = new UserService()