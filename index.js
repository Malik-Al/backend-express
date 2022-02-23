require('dotenv').config();
require('./models/models');
const express = require('express');
const cors = require('cors');
const path = require('path')
const fileUpload = require('express-fileupload');
const sequelize = require('./db');
const router = require('./routes/index');
const errorHandler = require('./middleware/error.handling')

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}))
app.use('/api', router);

///////////--end--//////////
app.use(errorHandler) // middleware errors



const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    }catch (e) {
        console.log(e.message);
    }
}
start();