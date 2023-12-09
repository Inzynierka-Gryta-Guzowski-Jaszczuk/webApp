const User = require('./../../models/User')
const sendResetPasswordEmail = require('../email/sendResetPasswordEmail')
const resetPasswordSendRequest = async (req, res) => {
    try {
        // change to parametrized query
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(409).send("nie ma użytkownika z takim adresem email")
        }
        
        const resetPasswordToken = await user.generateResetPasswordToken()
        console.log(resetPasswordToken)
        sendResetPasswordEmail(req.body.email,  resetPasswordToken)
        res.status(201).send("Email wysłany")
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}

module.exports = resetPasswordSendRequest