const User = require('./../models/User')

const addUser = async (req, res) => {
    try {
       await User.deleteMany({ _id: req.user })
        res.status(200).send({ message: "user deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal erro" })
    }
}

module.exports = addUser