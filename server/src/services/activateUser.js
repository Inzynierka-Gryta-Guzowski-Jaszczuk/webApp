const User = require('./../models/User')

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

/**
*@swagger
*paths:
*  /user/activate/{token}:
*    get:
*      tags: [Users]
*      summary: Activate a user
*      description: This endpoint allows a user to activate their account using a token.
*      parameters:
*        - in: path
*          name: token
*          schema:
*            type: string
*          required: true
*          description: The activation token.
*      responses:
*        200:
*          description: The user was successfully activated.
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    description: A message indicating the user was activated successfully.
*        404:
*          description: User not found. The provided activation token does not match any user.
*        500:
*          description: Internal server error.
 */