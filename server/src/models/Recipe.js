const mongoose = require('mongoose')
const commentSchema = require('./Comment')

// const TAGS = ["ciasta", "zapiekanki", "pizzy", "makarony", "sushi", "sałatki", "burgery", "ryby", "lody", "desery", "kebaby", 'śniadanie', 'obiad', 'kolacja', 'desery', 'tajskie', 'greckie', 'włoskie', 'chińskie', 'meksykańskie', 'kurczak', ];

const CategorizedTags = {
    "Posiłek": ["Śniadania", "Zupy", "Dania główne", "Desery", "Napoje", "Przekąski", "Sałatki", "Przetwory", "Dodatki", "Pieczywo", "Wędliny"],
    "Okazje": ["Wielkanoc", "Boże Narodzenie", "Impreza", "Grill", "Sylwester", "Tłusty czwartek", "Walentynki", "Halloween", "Komunia", "Do pracy"],
    "Kuchnie świata": ["Amerykańska", "Azjatycka", "Czeska", "Polska", "Włoska", "Meksykańska", "Indyjska", "Francuska", "Chińska", "Grecka", "Bałkańska", "Tajska", "Węgierska", "Śródziemnomorska", "Ukraińska", "Żydowska"],
    "Dieta": ["Bez glutenu", "Bez laktozy", "Bez cukru", "Dla dzieci", "Dietetyczne", "Wegetariańskie", "Wegańskie", "Dla zdrowia", "Keto"],
}

const recipeSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    ingredients: [{
        name:{type: String, required: true}, 
        ammount: {type: Number, required: true},
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
        {
            rate: {type: Number, required: true},
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
        }
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