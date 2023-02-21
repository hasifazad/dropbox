const mongoose = require('mongoose')

const FilesSchema = new mongoose.Schema({
    file: mongoose.Schema.Types.Mixed
}, { timestamps: true })




module.exports = mongoose.model('Files', FilesSchema)