const User = require('./../../models/User')
const bcrypt = require('bcrypt')
const validate = require('./../../validators/changePasswordValidator')
const resetPassword = async (req, res) => {
    try {
        
        const user = await User.findOne({ reset_password_token: req.body.token })
        if(!user) {
            return res.status(400).send("user not found")
        }
        
        if (!req.body.newPassword) {
            return res.status(400).send("new password is required" )
        }
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const salt = await bcrypt.genSalt(Number("10"))
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt)
        await User.findOneAndUpdate({ reset_password_token: req.body.token }, { password: hashPassword, reset_password_token: null })
        res.status(200).send(  "user updated" )
    } catch (error) {
        console.log(error)
        res.status(500).send("internal erro" )
    }
}

module.exports = resetPassword