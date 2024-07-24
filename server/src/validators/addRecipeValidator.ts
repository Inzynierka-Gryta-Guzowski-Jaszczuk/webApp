import joi from 'joi';
const Recipe = require('../models/Recipe')

const TAGS = Recipe.Recipe.getPossibleTags()

const validate = (data: any) => {
    const ingredientSchema = joi.object({
        name: joi.string().required(),
        ammount: joi.number().required(),
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
        portions: joi.number().label("porcje"),
        time: joi.number().label("czas"),
    })
    return schema.validate(data)}

module.exports = validate