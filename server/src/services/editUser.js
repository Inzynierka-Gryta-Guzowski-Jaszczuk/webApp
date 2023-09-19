const validate = require('../validators/editUserValidator')
const User = require('./../models/User')
const bcrypt = require('bcrypt')
const addUser = async (req, res) => {
    try {
        
        const user = await User.findOne({_id: req.user})
        if(!user) {
            res.status(400).send("user not found")
        }
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        await User.findOneAndUpdate({ _id: req.user }, req.body)
        res.status(200).send({ message: "user updated" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal erro" })
    }
}

module.exports = addUser