const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        let type = '';
        if(file.mimetype === "" || file.mimetype ==="application/octet-strem") type = '.jpg'
        cb(null, new Date().toISOString + "-" + file.originalname + type)
    }
});
const upload = multer({storage});

module.exports = upload;