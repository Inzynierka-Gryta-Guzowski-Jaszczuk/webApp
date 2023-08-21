const joi = require('joi')

const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        description: joi.string().required().label("Description"),
        ingredients: joi.array().items(joi.string()).required().label("Ingredients"),
        instructions: joi.array().items(joi.string()).required().label("Instructions"),
        type: joi.string().required().label("Type"),
        difficulty: joi.string().required().label("Difficulty"),
        calories: joi.number().required().label("Calories"),
        portions: joi.number().required().label("Portions")
    })
    return schema.validate(data)}

module.exports = validate