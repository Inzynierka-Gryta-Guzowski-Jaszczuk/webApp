const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const refreshSecret = config.get('jwt_refresh.secret')

module.exports = async (req, res) => {
    const token = req.headers['refresh']
    console.log("refresh headers", req.headers)
    if (token === null) return res.status(401).send("No refresh token")

    jwt.verify(token, refreshSecret, async (err, id) => {
        if (err) return res.status(403).send(err)

        const user = await User.findOne({_id: id})

        const token = user.generateAuthToken();
        const refresh = user.generateRefreshToken();
        console.log("refreshed token")
        res.status(200).send({ token: token, refresh: refresh, message: "refreshed token succesfully" })

        
    })
}

/**
*@swagger
*paths:
*    /user/token:
*        get:
*            tags: [Users]
*            summary: Refresh the authentication token
*            description: This endpoint refreshes the authentication token using a refresh token.
*            parameters:
*                  - in: header
*                    name: refresh
*                    schema:
*                        type: string
*                    required: true
*                    description: The refresh token.
*            responses:
*                200:
*                    description: The token was successfully refreshed.
*                    content:
*                        application/json:
*                            schema:
*                                type: object
*                                properties:
*                                    token:
*                                        type: string
*                                        description: The new authentication token.
*                                    refresh:
*                                        type: string
*                                        description: The new refresh token.
*                                    message:
*                                        type: string
*                                        description: A message indicating the token was refreshed successfully.
*                401:
*                    description: No refresh token provided.
*                403:
*                    description: Invalid refresh token.
*                500:
*                    description: Internal server error. 
 */