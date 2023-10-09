const User = require('./../../models/User')
const path = require("path");
const fs = require("fs");

const addImage = async (req, res) => {
    const file = req.file;
    const user = await User.findOne({_id: req.user})
    if(!user) {
        res.status(400).send("user not found")
    }
    console.log("file", file);
    
    const tempPath = req.file.path
    console.log(tempPath)

    let targetPath = path.join(__dirname, `./../../../images/${req.user._id}.png`);
    console.log("user", req.user)
    console.log(targetPath)
    const fileType = path.extname(req.file.originalname).toLowerCase()
    
    if (fileType === ".png" || fileType === ".jpg" || fileType === ".jpeg") {
        await fs.rename(tempPath, targetPath, async err => {
            if (err) return handleError(err, res);
            console.log("target path",targetPath)
            user.image = `http://localhost:5000/static/${req.user._id}.png`
            await user.save()
            res
                .status(200)
                .send(`http://localhost:5000/static/${req.user._id}.png`)
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png and .jpg files are allowed!");
        });
      }
    }

module.exports = addImage