const express = require('express')
router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')

const multer  = require('multer');
const upload = multer({ dest: './images' });

const path = require("path");
const fs = require("fs");

const userAddImageService = require('./../services/images/userAddImage')

const recipeAddImageService = require('./../services/images/recipeAddImage')
//get image for recipe
router.get('/recipe/:id', (req, res) => {
    res.send("get image for recipe")
})

//get image for user
router.get('/user/:id', (req, res) => {
    res.send("get image for user")
})

//add image for recipe
router.post('/recipe/:id', authenticate, upload.single('file'), (req, res) => {
  recipeAddImageService(req, res)
})

//add image for user
router.post('/user', authenticate, upload.single('file'), (req, res) => {
  userAddImageService(req, res)
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