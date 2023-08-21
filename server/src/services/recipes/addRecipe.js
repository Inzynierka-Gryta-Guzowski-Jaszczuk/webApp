const Recipe = require('../../models/Recipe');
const validate = require('../../validators/addRecipeValidator')

const addRecipe = async (req, res) => {
    try {
        const {error} = validate(req.body)
        let user = await User.findOne({_id: req.user})
        if(!user) {
            res.sendStatus(303)
        }
        let recipe = new Recipe(req.body)
        await recipe.save()
        await user.recipes.push(recipe)
        await user.save()
        res.send("udało się dodać")
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}