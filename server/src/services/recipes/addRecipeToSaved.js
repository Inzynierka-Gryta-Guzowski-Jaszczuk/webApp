const Recipe = require('../../models/Recipe');
const validate = require('../../validators/addRecipeValidator')
const User = require('../../models/User')

const addRecipeToSaved = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        console.log("user->>>>>>>>>>>>>>>>: ", user)
        if(!user) {
            res.sendStatus(303)
            return 
        }

        const recipeId = req.body.recipeId
        console.log("recipeId: ", recipeId)
        if(!recipeId) {
            res.status(400).send({message: "recipeId jest wymagane"})
            return 
        }

        let recipe = await Recipe.findOne({_id: recipeId})
        if(!recipe) {
            res.status(400).send({message: "przepis nie znaleziony"})
            return
        }
        console.log("recipe: ", recipe)
        console.log("user: ", req.user._id)
        if(user.saved_recipes.includes(recipeId)) {
            res.status(400).send({message: "przepis już jest w ulubionych"})
            return
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