const User = require('./../../models/User')
const path = require("path");
const fs = require("fs");

const addImage = async (req, res) => {
    const file = req.file;
    const user = await User.findOne({_id: req.query.id})
    if(!user) {
        res.status(400).send("user not found")
    }
    const path = "/static/" + req.query.id + ".png"
    res.send(path)    
}

module.exports = addImage