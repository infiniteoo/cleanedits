const util = require("util");
const multer = require("multer");
const maxSize = 50000000;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('in storage, file & req', req)
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
