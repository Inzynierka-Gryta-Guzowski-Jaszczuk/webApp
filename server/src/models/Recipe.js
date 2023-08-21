const mongoose = require('mongoose')
const Ingredient = require('./Ingredient')
const commentSchema = require('./Comment')

const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: {
        type: mongoose.Schema.ObjectId,
        require: false,
        ref: Ingredient,
        requred: false
    },
    description: {type: String, require: true},
    instructions: [{
        step: {type: String, required: true}
    }],
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

const Recipe = mongoose.model('Clothes', recipeSchema)

module.exports = Recipe