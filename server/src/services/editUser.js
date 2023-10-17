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

/**
*@swagger
*paths:
*  /user/myProfile:
*    put:
*      security:
*       - token: []
*      tags: [Users]
*      summary: Edit a user
*      description: This endpoint allows for the editing of a user
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Register'
*      responses:
*        200:
*          description: The user was successfully updated.
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    description: A message indicating the user was updated successfully.
*        400:
*          description: Bad request. The request body is invalid or user not found.
*        500:
*          description: Internal server error.
 */