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