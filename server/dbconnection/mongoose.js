const mongoose = require('mongoose')

const { MONGO_USER, MONGO_PASSWORD, MONGO_URL } = process.env
const db = () => {
    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_URL}`).then((res) => {
        console.log('database connected');
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = db