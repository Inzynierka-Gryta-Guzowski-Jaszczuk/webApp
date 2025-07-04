const User = require('../../models/User')
const recipeToDTO = require('./recipeDTO')

const getSavedRecipes = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        console.log("user: ", user)
        if(!user) {
            res.sendStatus(303)
        }
        await user.populate('saved_recipes')
        const recipesDTO = user.saved_recipes.map(recipe => recipeToDTO(recipe))
        res.send(recipesDTO)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getSavedRecipes