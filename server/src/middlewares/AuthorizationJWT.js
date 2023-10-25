const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get('jwt.secret')

const authenticateToken = (req, res, next) => {
    /* #swagger.security = [{
               "bearerAuth": []
        }] */
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send("No token")

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user
        console.log("authorized")
        next()
    })
}

module.exports = authenticateToken