const Recipe = require('../../models/Recipe')
const User = require('../../models/User')
const recipeToDTO = require('./recipeDTO')

const getRecipes = async (req, res) => {
    try {
        
        const recipes = await Recipe.find({author: req.params.id})
        const recipesDTO = recipes.map(recipe => recipeToDTO(recipe))
        res.send(recipesDTO)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getRecipes