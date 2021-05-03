const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const path = require('path');

const upload = async (req, res) => {
  try {
    
   
    await uploadFile(req, res);
    
    console.log('new new new newnewn ewn email? ???????',req.body.text)
    
    let uniqueID = req.body.text + "/";
    const dirPath = path.join(__dirname, "../../resources/static/assets/uploads/" + uniqueID);
    console.log('req.file', req.file);

    // if the directory already exists
    if(fs.existsSync(dirPath)) {
      // copy the file
      copyToEmailDir(req.file.path, dirPath)

      // if the directory doesnt exists make it then copy it
    } else {
      fs.mkdir(dirPath, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('new directory created.');
          copyToEmailDir(req.file.path, dirPath + req.file.originalname)
        }
      })
    }
    
    const copyToEmailDir = (oldPath, newPath) => {

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
      })


    }
    /* console.log("in upload on server side req.body", req.body.text) */


    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/" + req.params.text;

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  console.log('in download')
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
