const mongoose = require('mongoose')
const commentSchema = require('./Comment')

// const TAGS = ["ciasta", "zapiekanki", "pizzy", "makarony", "sushi", "sałatki", "burgery", "ryby", "lody", "desery", "kebaby", 'śniadanie', 'obiad', 'kolacja', 'desery', 'tajskie', 'greckie', 'włoskie', 'chińskie', 'meksykańskie', 'kurczak', ];

const CategorizedTags = {
    "desery": ["ciasta", "desery", "babeczki", "lody", "torty"],
    "wege": ["wegetariańskie", "sałatki", "wege", "wegańskie"],
    "przekąski": ["przekąski", "zapiekanki", "burgery", "kebaby"],
    "śniadania": ["śniadanie"],
    "owoce morza": ["ryby", "owoce morza", "krewetki", "łosoś", "tuńczyk"],
    "orientalne": ["tajskie", "chińskie", "japońskie", "orientalne", "sushi"],
    "zupy": ["zupy", "kremy", "zupa pomidorowa", "zupa krem z brokułów"],
    "dania główne": ["dania główne", "mięsne", "rybne", "wegetariańskie", "wegańskie"],
    "przyjęcie": ["przyjęcie", "kanapki", "sałatki partyjne", "przekąski na imprezę"],
    "pieczywo": ["pieczywo", "chleb", "bułki", "bagietki", "płatki owsiane"],
    "napoje": ["napoje", "koktajle", "soki", "herbata", "kawa"],
    "grill": ["grill", "kotlety", "kiełbaski", "warzywa grillowane"]
}

const recipeSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
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
    ],
    time: {type: Number, required: false},

})

recipeSchema.statics.getPossibleTags = function() {
    const subcategories = Object.values(CategorizedTags)
    const tags = []
    subcategories.forEach(subcategory => {
        subcategory.forEach(tag => {
            tags.push(tag)
        })
    })
    return tags
  };

recipeSchema.statics.getCategorizedTags = function() {
    return CategorizedTags;
}


const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe