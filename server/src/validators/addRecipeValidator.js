const joi = require('joi')
const Recipe = require('../models/Recipe')

const TAGS = Recipe.getPossibleTags()

const validate = (data) => {
    const ingredientSchema = joi.object({
        name: joi.string().required(),
        amount: joi.number().required(),
        unit: joi.string().required()
      });
    
    const schema = joi.object({
        name: joi.string().required().label("nazwa"),
        description: joi.string().label("opis"),
        ingredients: joi.array().items(ingredientSchema).required().label("składniki"),
        instructions: joi.array().items(joi.string()).required().label("kroki"),
        tags: joi.array().items(joi.string().valid(...TAGS)).label("tags"),
        difficulty: joi.string().label("truność"),
        calories: joi.number().label("kalorie"),
        portions: joi.number().label("porcje")
    })
    return schema.validate(data)}

module.exports = validate