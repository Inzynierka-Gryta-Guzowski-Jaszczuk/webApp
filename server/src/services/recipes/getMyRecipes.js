const User = require('../../models/User')
const recipeToDTO = require('./recipeDTO')

const addRecipe = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        console.log("user: ", user)
        if(!user) {
            res.sendStatus(303)
        }
        await user.populate('my_recipes')
        const recipes = user.my_recipes.map(recipe => {
            return recipeToDTO(recipe)
        })
        res.send(recipes)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = addRecipe