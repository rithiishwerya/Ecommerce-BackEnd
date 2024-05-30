const path = require('path'); 
const multer = require("multer");

const imageStorage = multer.diskStorage({
  destination: 'uploads',
  filename:(req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
});

const imageUpload = multer({

  storage : imageStorage,
  limits: {
    filesize :1000000
  },
  fileFilter(req ,file ,cb){
    if (!file.originalname.match(/\.(png|webp|jpg|jpeg|doc)$/)){
      return cb(new Error('Please upload a image'))
    }
    cb(undefined, true)
  }
})



module.exports = {
  imageUpload,
}