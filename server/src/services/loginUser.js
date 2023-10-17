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


/**
*@swagger
*paths:
*  /user/login:
*    post:
*      tags: [Users]
*      summary: Log in a user
*      description: This endpoint allows a user to log in by providing their username and password.
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                userName:
*                  type: string
*                  description: The username of the user.
*                  example: Johnson123
*                password:
*                  type: string
*                  description: The password of the user.
*      responses:
*        200:
*          description: The user was successfully logged in.
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  token:
*                    type: string
*                    description: The authentication token.
*                  refresh:
*                    type: string
*                    description: The refresh token.
*                  message:
*                    type: string
*                    description: A message indicating the user was logged in successfully.
*        400:
*          description: Bad request. The request body is invalid.
*        401:
*          description: Unauthorized. The username or password is incorrect, or the user account is not activated.
*        500:
*          description: Internal server error.
*/