const User = require('./../../models/User')
const resetPasswordisTokenActive = async (req, res) => {
    try {
        // change to parametrized query
        const user = await User.findOne({ reset_password_token: req.params.token })
        if (!user) {
            return res.status(400).send("token wygasł")
        }
        
        res.status(200).send("ok")
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

module.exports = resetPasswordisTokenActive