const mongoose = require('mongoose')
const Recipe = require('./Recipe')
const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get('jwt.secret')
const expiresIn = config.get('jwt.expiresIn')
const refreshSecret = config.get('jwt_refresh.secret')
const refreshExpiresIn = config.get('jwt_refresh.expiresIn')

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
    const token = jwt.sign({ _id: this._id }, secret, {
        expiresIn: expiresIn,
    })
    return token
}

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign({ _id: this._id }, refreshSecret, {
        expiresIn: refreshExpiresIn,
    })
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User