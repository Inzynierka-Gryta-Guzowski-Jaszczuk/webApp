const mongoose = require('mongoose')
const Recipe = require('./Recipe')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: {type: String, required: true},
    my_recipes: [{
        type: mongoose.Schema.ObjectId,
        require: false,
        ref: Recipe,
        requred: false
    }],
    saved_recipes: [{
        type: mongoose.Schema.ObjectId,
        require: false,
        ref: Recipe,
        requred: false
    }],
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'abcdefg', {
        expiresIn: "1d",
    })
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User