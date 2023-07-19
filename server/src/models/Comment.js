const mongoose = require('mongoose')
const User = require('./User')

const commentSchema = new mongoose.Schema({
    comment: {type: String, required: true},
    user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
})

module.exports = commentSchema