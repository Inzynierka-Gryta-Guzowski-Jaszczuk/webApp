const joi = require('joi')



const validate = (data) => {
    const ingredientSchema = joi.object({
        name: joi.string().required(),
        amount: joi.number().required(),
        unit: joi.string().required()
      });
    
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        description: joi.string().label("Description"), //not required
        ingredients: joi.array().items(ingredientSchema).required().label("Ingredients"),
        instructions: joi.array().items(joi.string()).required().label("Instructions"),
        type: joi.string().required().label("Type"),
        difficulty: joi.string().label("Difficulty"),
        calories: joi.number().label("Calories"),
        portions: joi.number().label("Portions")
    })
    return schema.validate(data)}

module.exports = validate