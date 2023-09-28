const User = require('../../models/User')
const Recipe = require('../../models/Recipe')
const recipeToDTO = require('./recipeDTO')
const addRecipe = async (req, res) => {
    try {
        let recipes = await Recipe.find({})
        let recipesDTO = recipes.map(recipe => {
            return recipeToDTO(recipe)
        })
        res.send(recipesDTO)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = addRecipe