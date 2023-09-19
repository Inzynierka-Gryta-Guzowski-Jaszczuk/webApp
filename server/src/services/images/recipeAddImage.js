const User = require('./../../models/User')
const Recipe = require('./../../models/Recipe')
const path = require("path");
const fs = require("fs");

const addImage = async (req, res) => {
    const file = req.file;
    const user = await User.findOne({_id: req.user})
    const recipe = await Recipe.findOne({_id: req.query.id})
    if(!user) {
        res.status(400).send("user not found")
    }
    if(!recipe) {
        res.status(400).send("recipe not found")
    }

    console.log("file", file);
    
    const tempPath = req.file.path
    console.log(tempPath)

    let targetPath = path.join(__dirname, `./../../../images/${recipe._id}.png`);
    console.log("user", req.user)
    console.log(targetPath)
    const fileType = path.extname(req.file.originalname).toLowerCase()
    if (fileType === ".png" || fileType === ".jpg" || fileType === ".jpeg") {
        await fs.rename(tempPath, targetPath, async err => {
            if (err) return handleError(err, res);
            console.log("target path",targetPath)
            recipe.image = `/static/${req.user._id}.png`
            await recipe.save()
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
    }

module.exports = addImage