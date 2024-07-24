import express, { Request, Response } from 'express';
const router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')

const multer  = require('multer');
const upload = multer({ dest: './images' });

const path = require("path");
const fs = require("fs");

const userAddImageService = require('./../services/images/userAddImage')

const recipeAddImageService = require('./../services/images/recipeAddImage')

//add image for recipe
router.post('/recipe/:id', authenticate, upload.single('file'), (req: Request<{id: 'string'}>, res: Response) => {
  // #swagger.tags = ['Images']
  // #swagger.summary = 'Add image for recipe'
  recipeAddImageService(req, res)
})

//add image for user
router.post('/user', authenticate, upload.single('file'), (req: Request<{id: 'string'}>, res: Response) => {
  // #swagger.tags = ['Images']
  // #swagger.summary = 'Add image for user'
  userAddImageService(req, res)
})


module.exports = router