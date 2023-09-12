const express = require('express')
router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')

const multer  = require('multer');
const upload = multer({ dest: './images' });

const path = require("path");
const fs = require("fs");

//get image for recipe
router.get('/recipe/:id', (req, res) => {
    res.send("get image for recipe")
})

//get image for user
router.get('/user/:id', (req, res) => {
    res.send("get image for user")
})

//add image for recipe
router.post('/recipe/:id', authenticate, (req, res) => {
    res.send("add image for recipe")
})

//add image for user
router.post('/user/:id', upload.single('file'), (req, res) => {
    const title = req.body.title;
    const file = req.file;

    console.log("title", title);
    console.log("file", file);
    
    const tempPath = req.file.path
    console.log(tempPath)

    let targetPath = path.join(__dirname, "./../../images/image");
    console.log(targetPath)
    const fileType = path.extname(req.file.originalname).toLowerCase()
    if (fileType === ".png" || fileType === ".jpg" || fileType === ".jpeg") {
        targetPath = targetPath + fileType
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }

})

//delete image for recipe
router.delete('/recipe/:id', authenticate, (req, res) => {
    res.send("delete image for recipe")
})

//delete image for user
router.delete('/user/:id', authenticate, (req, res) => {
    res.send("delete image for user")
})


module.exports = router