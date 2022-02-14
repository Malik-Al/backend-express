const jwt = require('jsonwebtoken');
const {Token} = require('../../models/models')

class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, // вшиваем данные и генерим token
            {expiresIn: '30m'}
        )
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, // вшиваем данные и генерим refresh
            {expiresIn: '30d'}
        )
        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where: {userId: userId}}) // поиск token по userID
        if(tokenData){
            tokenData.refreshToken = refreshToken // если есть token у пользователя перезаписать token
            return tokenData.save()
        }
        const token = await Token.create({userId: userId, refreshToken}) // если нет токена создать token
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await Token.destroy({where: {refreshToken}}) // поиск и удаление refreshToken
        return tokenData
    }

}

module.exports = new TokenService()