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

/**
*@swagger
*components:
*  schemas:
*    Register:
*      type: object
*      properties:
*        firstName:
*          type: string
*          description: The first name of the user.
*          example: John
*        lastName:
*          type: string
*          description: The last name of the user.
*          example: Johnson
*        userName:
*          type: string
*          description: The username of the user.
*          example: Johnson123
*        email:
*          type: string
*          description: The email address of the user.
*          example: user@gmail.com
*        password:
*          type: string
*          description: The password of the user.
*          example: !234Qwer
*      required:
*        - firstName
*        - lastName
*        - userName
*        - email
*        - password
 */

/**
*@swagger
*paths:
*  /user/register:
*    post:
*      tags: [Users]
*      summary: Add a new user
*      description: This endpoint allows for the creation of a new user.
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Register'
*      responses:
*        201:
*          description: The user was successfully created.
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    description: A message indicating the user was created successfully.
*        400:
*          description: Bad request. The request body is invalid.
*        409:
*          description: Conflict. The username or email is already in use.
*        500:
*          description: Internal server error.
*/