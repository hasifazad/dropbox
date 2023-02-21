let multer = require("multer")



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
})
// const upload = multer({ dest: 'C:/Users/hasifazad/Desktop/drop/server/public' })

var upload = multer({ storage: storage })

module.exports = upload