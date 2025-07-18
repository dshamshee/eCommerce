const multer = require('multer'); // Import multer
const path = require('path'); // Import path 
const crypto = require('crypto'); // Import crypto (It is used to generate a random hash for the uploaded file)

// Disk Storage for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12, function(err, name){
       const fn = name.toString("hex")+path.extname(file.originalname);
          cb(null, fn);
      })
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;



  // Memory Storage for image upload
  // const memoryStorage = multer.memoryStorage()
  // const memoryUpload = multer({ storage: memoryStorage })

  // module.exports = memoryUpload;