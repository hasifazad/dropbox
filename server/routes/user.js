const express = require("express")
const router = express.Router()
const upload = require('../utils/multer')

const { setFiles, getFiles, downloadFiles, deleteFiles } = require('../controllers/FileController')


router.post('/', upload.single('image'), setFiles)

router.get('/', getFiles)

router.get('/download/:filename', downloadFiles)

router.delete('/delete/:id/:filename', deleteFiles)

module.exports = router