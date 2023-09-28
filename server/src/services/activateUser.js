const validate = require('../validators/addUserValidator')
const User = require('./../models/User')
const bcrypt = require('bcrypt')
const sendConfirmationEmail = require('./email/sendConfirmationEmail')
const addUser = async (req, res) => {
    try {
        const token = req.params.token
        let user = await User.findOne({ activation_token: token })
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }

        user.activated = true
        user.activation_token = ""
        await user.save()
        res.status(200).send({ message: "user activated succesfully" })
       
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal erro" })
    }
}

module.exports = addUser