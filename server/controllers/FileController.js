const fs = require('fs');
const Files = require('../models/FileModel')

module.exports = {
    setFiles: async (req, res, next) => {
        console.log(req.file);
        try {
            const user = await Files.create({ file: req.file })
            user.save()
            res.json({ status: true, message: 'file uploaded successfully' })
        } catch (error) {
            res.status(401).json({ status: false, message: 'error' })
        }

    },
    getFiles: async (req, res, next) => {
        try {
            let files = await Files.find()
            res.json(files)
        } catch (error) {
            res.status(401).json({ message: 'cannot find the files' })
        }


    },
    downloadFiles: async (req, res, next) => {
        console.log(req.params);
        try {
            res.download(`./public/${req.params.filename}`)
        } catch (error) {
            res.status(401).json({ message: 'cannote download the file' })
        }
    },
    deleteFiles: async (req, res, next) => {
        console.log(req.params);
        try {
            let deleteFile = await Files.deleteOne({ _id: req.params.id })
            fs.unlink(`./public/${req.params.filename}`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ message: 'file deleted successfully' })
                }
            })
        } catch (error) {
            res.json(401).json({ message: 'cannot delete the file' })
        }
    }
}