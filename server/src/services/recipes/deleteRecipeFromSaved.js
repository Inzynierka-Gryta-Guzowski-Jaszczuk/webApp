const Recipe = require('../../models/Recipe');
const User = require('../../models/User')

const deleteRecipeToSaved = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        console.log("user: ", user)
        if(!user) {
            res.sendStatus(303)
        }
        const recipeId = req.params.id
        if(!recipeId) {
            return res.status(400).send({message: "recipeId jest wymagane"})
        }

        let recipe = await Recipe.findOne({_id: recipeId})
        if(!recipe) {
            return res.status(400).send({message: "przepis nie znaleziony"})
        }
        if(!user.saved_recipes.includes(recipeId)) {
            return res.status(400).send({message: "przepis nie jest w ulubionych"})
        }
        user.saved_recipes = user.saved_recipes.filter((recipe) => recipe != recipeId)
        await user.save()
        recipe.saved_count -= 1
        await recipe.save()
        res.send("udało się dodać")
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = deleteRecipeToSaved