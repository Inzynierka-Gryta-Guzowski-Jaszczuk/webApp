const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get('jwt.secret')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['token']
    // console.log(req.headers)
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(authHeader)
    if (token == null) return res.status(401).send("No token")

    jwt.verify(token, secret, (err, user) => {
        // console.log(err)
        // console.log(user)
        if (err) return res.sendStatus(403)

        req.user = user
        console.log("authorized")
        next()
    })
}

module.exports = authenticateToken