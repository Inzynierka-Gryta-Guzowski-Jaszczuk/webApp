const User = require('./../models/User')
const bcrypt = require('bcrypt')
const validate = require('./../validators/changePasswordValidator')
const changePassword = async (req, res) => {
    try {
        
        const user = await User.findOne({_id: req.user})
        if(!user) {
            res.status(400).send("user not found")
        }
        
        if (!req.body.newPassword) {
            return res.status(400).send("new password is required" )
        }
        if(!req.body.oldPassword) {
            return res.status(400).send("old password is required")
        }

        const validPassword = await bcrypt.compare(
            req.body.oldPassword,
            user.password
        )
        if (!validPassword)
            return res.status(401).send( "Invalid password" )
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const salt = await bcrypt.genSalt(Number("10"))
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt)
        await User.findOneAndUpdate({ _id: req.user }, { password: hashPassword })
        res.status(200).send({ message: "user updated" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal erro" })
    }
}

module.exports = changePassword