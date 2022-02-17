const path = require("path");
const fs = require('fs');
const {promisify} = require('util');
const readdir = promisify(fs.readdir);
const ApiError = require("../error/apiError");

class FolderService{

    pathGenerateUrl(fileName){ // функция со созданию обсалутного пути
        if(fileName){
            return path.resolve(__dirname, '..', 'static', fileName)
        }
        return path.resolve(__dirname, '..', 'static')
    }


    async create(img, fileName){ // создание файла
        const pathUrl = this.pathGenerateUrl()
        if(!fs.existsSync(pathUrl)){ // если папки нет создаем папку
            fs.mkdirSync(pathUrl)  // создаем папку
            console.log('create static folder...')
            await img.mv(path.resolve(this.pathGenerateUrl(fileName))) // перемещаем файл в папку static
            console.log('added img file...')
        }
        else{
            await img.mv(path.resolve(this.pathGenerateUrl(fileName))) // перемещаем файл в папку static
            console.log('added img file...')
        }
    }


    async remove(IdImg){ // удаления файла
        const pathUrl = this.pathGenerateUrl()
        const listFile = await readdir(pathUrl) // список файлов в папке
        if(fs.existsSync(pathUrl)) {
            const img = listFile.filter(file => file.includes(IdImg)) // находим в массиве фаил
            const fileDelete = path.resolve(pathUrl, img[0]) // возврощаем сам файл
            if(!fileDelete){
                throw ApiError.badRequest()
            }
            fs.unlink(fileDelete, function (err) { // удаление файла
                if (err) throw err
                else {
                    console.log('file deleted...')
                    fs.readdir(pathUrl, (err, files) => { // проверить содержимое папки
                        if (err)
                            console.log(err);
                        else {
                            if(!files[0]){ // если папка пуста удалить папку
                                fs.rmdir(pathUrl, err => {
                                    if(err) throw err; // не удалось удалить папку
                                    else { // удаление папки
                                        console.log('deleted static folder...')
                                    }
                                });
                            }
                        }
                    })
                }
            })

        }
    }


}

module.exports = new FolderService()