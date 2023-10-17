const User = require('./../models/User')
const userToDTO = require('./userDTO')
module.exports = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user})
        if(!user) {
            res.status(400).send("user not found")
        }
        console.log("uzytkownik znaleziony")
        console.log(user)
        const {password, ...rest} = user._doc
        const DTO = userToDTO(rest) 
        res.json(DTO)
    }catch (error) {
        console.log(error)
    }
}
/**
*@swagger
*paths:
*    /user/myProfile:
*        get:
*            tags: [Users]
*            summary: Get my profile data
*            description: This endpoint retrieves the profile data of the currently authenticated user.
*            security:
*             - token: []
*            responses:
*                200:
*                    description: The profile data was successfully retrieved.
*                    content:
*                        application/json:
*                            schema:
*                                $ref: '#/components/schemas/User'
*                400:
*                    description: User not found.
*                500:
*                    description: Internal server error.
 */