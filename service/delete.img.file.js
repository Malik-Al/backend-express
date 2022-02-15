const path = require("path");
const fs = require('fs')
const {promisify} = require('util')
const readdir = promisify(fs.readdir)
const ApiError = require("../error/apiError");

module.exports = async function (IdImg) {
    const pathUrl = path.resolve(__dirname, '..', 'static')
    if(fs.existsSync(pathUrl)) {
        const listFile = await readdir(pathUrl) // список файлов в папке
        const img = listFile.filter(file => file.includes(IdImg))
        const pathFile = path.resolve(__dirname, '..', 'static') // прямой путь
        const fileDelete = path.resolve(pathFile, img[0])
        if(!fileDelete){
            throw ApiError.badRequest()
        }
        fs.unlink(fileDelete, function (err) {
            if (err) throw err
            else console.log('file deleted')
        })

    }
}
