const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../' , 'public/images'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('imgFile');

module.exports = upload;