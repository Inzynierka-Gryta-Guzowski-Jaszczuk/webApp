const User = require('./../models/User')

module.exports = async () => {
    const users = await User.find({})
    return users
}