const User = require('./../models/User')
const bcrypt = require("bcrypt")
const validate = require('../validators/loginUserValidator')

const loginUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        console.log(req.body.userName)
        
        const user = await User.findOne({ userName: req.body.userName })
        // const allUsers = await User.find()
        // console.log(allUsers)
        if (!user)
            return res.status(401).send({ message: "Niepoprawne dane logowania" })

        //check if user is activated
        if (!user.activated)
            return res.status(401).send({ message: "Konto użytkownika nie jest aktywowane" })
        
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password 2" })
        const token = user.generateAuthToken();
        const refresh = user.generateRefreshToken();
        res.status(200).send({ token: token, refresh: refresh, message: "logged in successfully" })
        console.log(token)
        console.log('asfd')
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }
}

module.exports = loginUser