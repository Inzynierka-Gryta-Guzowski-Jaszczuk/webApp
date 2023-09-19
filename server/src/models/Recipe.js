const mongoose = require('mongoose')
const commentSchema = require('./Comment')

const TAGS = ["ciasta", "zapiekanki", "pizzy", "makarony", "sushi", "sałatki", "burgery", "ryby", "lody", "desery", "kebaby", 'śniadanie', 'obiad', 'kolacja', 'desery', 'tajskie', 'greckie', 'włoskie', 'chińskie', 'meksykańskie', 'kurczak', ];

const recipeSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    image: {type: String, required: false},
    ingredients: [{
        name:{type: String, required: true}, 
        amount: {type: Number, required: true},
        unit: {type: String, required: true}
    }],
    description: {type: String, require: false},
    instructions: [
        {type: String, required: true}
    ],
    difficulty: {type: String, enum: ['easy', 'medium', 'hard'], required: false},
    tags: [{type: String, required: false}],
    calories: {type: Number, required: false},
    portions: {type: Number, required: false},
    comments: [commentSchema],
    saved_count: {type: Number, required: true},
    rating: [
        {rate: {type: Number, required: true}}
    ]
})

recipeSchema.statics.getPossibleTags = function() {
    return TAGS;
  };

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe