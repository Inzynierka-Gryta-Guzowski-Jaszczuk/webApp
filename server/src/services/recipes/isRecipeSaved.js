const User = require('../../models/User')
const recipeToDTO = require('./recipeDTO')

const getSavedRecipes = async (req, res) => {
    try {
        const recipeId = req.params.id
        let user = await User.findOne({_id: req.user})
        console.log("user: ", user)
        if(!user) {
            res.status(303).send("user not found")
        }
        await user.populate('saved_recipes')
        //if recipeId is provided, check if recipe is saved
        if(recipeId) {
            const recipe = await user.saved_recipes.find(recipe => recipe._id == recipeId)
            console.log("recipe: ", recipe)
            if(recipe) {
                res.send(true)
            } else {
                res.send(false)
            }
            return
        }else {
            res.status(400).send("recipe id not provided")
            return
            
        }
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getSavedRecipes