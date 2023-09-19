const Recipe = require('../../models/Recipe');
const validate = require('../../validators/addRecipeValidator')
const User = require('../../models/User')

const addRecipeToSaved = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        console.log("user: ", user)
        if(!user) {
            res.sendStatus(303)
        }
        const recipeId = req.body.recipeId
        if(!recipeId) {
            return res.status(400).send({message: "recipeId jest wymagane"})
        }

        let recipe = await Recipe.findOne({_id: recipeId})
        if(!recipe) {
            return res.status(400).send({message: "przepis nie znaleziony"})
        }
        console.log("recipe: ", recipe.author._id)
        console.log("user: ", req.user._id)
        if(recipe.author._id == req.user._id) {
            return res.status(400).send({message: "nie możesz dodać własnego przepisu do ulubionych"})
        }
        if(user.saved_recipes.includes(recipeId)) {
            return res.status(400).send({message: "przepis już jest w ulubionych"})
        }
        user.saved_recipes.push(recipeId)
        await user.save()
        recipe.saved_count += 1
        await recipe.save()
        res.send("udało się dodać")
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = addRecipeToSaved