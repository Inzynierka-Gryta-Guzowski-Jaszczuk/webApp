const mongoose = require('mongoose')
const Recipe = require('./Recipe')
const jwt = require('jsonwebtoken')
var crypto = require('crypto');
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
    image: {type: String, required: true}, //image url
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
    activated: { type: Boolean, required: true },
    activation_token: { type: String, required: false },
    reset_password_token: { type: String, required: false },
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

userSchema.methods.generateActivationToken = async function () {
    console.log("this in generate", this)
    const buffer = crypto.randomBytes(32)
    const token = buffer.toString('hex')
    this.activation_token = token
    await this.save()
    return token
}

userSchema.methods.generateResetPasswordToken = async function () {
    await crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString('hex')
        this.reset_password_token = token
        await this.save()
        return token
    }
    )
}

const User = mongoose.model('User', userSchema)

module.exports = User