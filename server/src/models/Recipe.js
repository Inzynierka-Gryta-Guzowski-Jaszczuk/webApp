const mongoose = require('mongoose')
const commentSchema = require('./Comment')

const recipeSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    ingredients: [{
    name:{type: String, required: true}, 
    amount: {type: Number, required: true},
    unit: {type: String, required: true}
    }],
    description: {type: String, require: true},
    instructions: [
        {type: String, required: true}
    ],
    difficulty: {type: String, enum: ['easy', 'medium', 'hard'], required: true},
    type: {type: String, enum: ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'], required: true},
    calories: {type: Number, required: false},
    portions: {type: Number, required: true},
    comments: [commentSchema],
    saved_count: {type: Number, required: true},
    rating: [
        {rate: {type: Number, required: true}}
    ]
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe