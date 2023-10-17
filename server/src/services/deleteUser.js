const User = require('./../models/User')

const deleteUser = async (req, res) => {
    try {
       await User.deleteMany({ _id: req.user })
        res.status(200).send({ message: "user deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal erro" })
    }
}

module.exports = deleteUser

/**
*@swagger
*paths:
*  /user/delete:
*    delete:
*      tags: [Users]
*      security:
*       - token: []
*      summary: Delete a user
*      description: This endpoint allows for the deletion of a user by their ID.
*      parameters:
*        - in: path
*          name: id
*          schema:
*            type: string
*          required: true
*          description: The ID of the user to delete.
*      responses:
*        200:
*          description: The user was successfully deleted.
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    description: A message indicating the user was deleted successfully.
*        404:
*          description: User not found. The provided ID does not match any user.
*        500:
*          description: Internal server error.
 */