const VUE_TRANS_TAG = "vue_trans"
//import the require modules 
require('dotenv').config()
var fs = require('fs');
let port = process.env.PORT || 5000;

if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
} else {
  console.log('cloudinary config:');
  console.log(process.env.CLOUDINARY_URL);
}
console.log('-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --');
var path = require('path');

var cloudinary = require('cloudinary').v2;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFilePath = `${path.dirname(__filename)}/public/upload/`
console.log("uploadFilePath", uploadFilePath);

const app = express();

var serveStatic = require('serve-static');
app.use(serveStatic(__dirname + "/dist"));

// define multer storage configuration 
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/upload/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({
  storage: storage
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// tag search
app.get('/api/vue_trans_tag', (req, res, next) => {
  try {
    cloudinary.search
      .expression(`tags=${VUE_TRANS_TAG}`)
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute().then(result => {
        // console.log(result)
        let urlCollection = result.resources.map(item=>{
          return item.secure_url
        })
        // console.log(urlCollection)
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json({
          "collection": urlCollection,
          "status": "success",
          "code": "200",
          "message": "search successful"
        })
      });
  } catch (err) {
    console.log(err)
    res.status(404).json({
      "status": "failed",
      "code": "404",
      "message": "No files found"
    });
  }
})


//single file upload api 
app.post('/api/upload/single', upload.single('singleFile'), (req, res, next) => {
  try {
    const file = req.file;
    console.log("file.path", req.file.path)
    if (!file) {
      res.status(400).json({
        "status": "failed",
        "code": "400",
        "message": "Please upload file"
      });
    }

    // upload to cloudinary
    cloudinary.uploader.upload(file.path, {
        tags: VUE_TRANS_TAG
      })
      .then(function (photo) {
        console.log('** file saved');
        return photo;
      })
      .then(function (photo) {
        //delete from file system
        fs.unlink(file.path, function (err) {
          if (!err) {
            console.log('file deleted');
          }
        })
        res.status(200).json({
          "photo_url": photo.secure_url,
          "status": "success",
          "code": "200",
          "message": "file uploaded successfully"
        })
      })
      .catch(err => {
        console.log(err.message);
        res.status(200).json({
          "status": "upload to cloudinary",
          "code": "500",
          "message": err.message
        });
      })
  } catch (err) {
    console.log(err.message);
    res.status(200).json({
      "status": "save to server failed",
      "code": "500",
      "message": err.message
    });
  }
});
app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});