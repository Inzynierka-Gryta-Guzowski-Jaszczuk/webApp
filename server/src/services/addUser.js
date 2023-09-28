const validate = require('../validators/addUserValidator')
const User = require('./../models/User')
const bcrypt = require('bcrypt')
const sendConfirmationEmail = require('./email/sendConfirmationEmail')
const addUser = async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        console.log(req.body)
        let user = await User.findOne({ userName: req.body.userName })
        if (user) {
            return res.status(409).send({ message: "nazwa użytkownika jest zajęta" })
        }
        user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(409).send({ message: "adres email jest już użyty" })
        }
        
        const salt = await bcrypt.genSalt(Number("10"))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        newUser = await new User({ ...req.body, password: hashPassword, activated: false })
        newUser.image = "http://localhost:5000/static/defaultUser.png"
        const activationToken = await newUser.generateActivationToken()
        console.log("newUser: ---------------",newUser)
        console.log("activationToken: ---------------",activationToken)
        sendConfirmationEmail(newUser.email, newUser.userName, activationToken)
        await newUser.save()
        res.status(201).send({ message: "User created succesfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal erro" })
    }
}

module.exports = addUser