const joi = require('joi')
const Recipe = require('../models/Recipe')

const TAGS = Recipe.getPossibleTags()

const validate = (data) => {
    
    const ingredientSchema = joi.object({
        name: joi.string() ,
        amount: joi.number() ,
        unit: joi.string() 
      });
    
    const schema = joi.object({
        id: joi.string().required().label("Id"),
        name: joi.string() .label("Name"),
        description: joi.string() .label("Description"),
        ingredients: joi.array().items(ingredientSchema) .label("Ingredients"),
        instructions: joi.array().items(joi.string()) .label("Instructions"),
        tags: joi.array().items(joi.string().valid(...TAGS)).label("tags"),
        difficulty: joi.string() .label("Difficulty"),
        calories: joi.number() .label("Calories"),
        portions: joi.number() .label("Portions"),
        time: joi.number().label("czas"),
    })
    return schema.validate(data)}

module.exports = validate