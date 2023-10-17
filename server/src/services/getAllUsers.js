const User = require('./../models/User')

module.exports = async () => {
    const users = await User.find({})
    return users
}

/**
*@swagger
*paths:
*    /user:
*        get:
*            tags: [Users]            
*            summary: Get all users
*            description: This endpoint retrieves all users.
*            responses:
*                200:
*                    description: A list of users was successfully retrieved.
*                    content:
*                        application/json:
*                            schema:
*                                type: array
*                                items:
*                                    $ref: '#/components/schemas/Register'
*                500:
*                    description: Internal server error.
 */