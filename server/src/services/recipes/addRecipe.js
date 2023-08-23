const Recipe = require('../../models/Recipe');
const validate = require('../../validators/addRecipeValidator')
const User = require('../../models/User')

const addRecipe = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        console.log("user: ", user)
        if(!user) {
            res.sendStatus(303)
        }

        const {error} = validate(req.body)
        if(error) {
            console.log("validation error")
            console.log(error)
            return res.status(400).send({message: error.details[0].message})
        }
        
        console.log({...req.body, saved_count: 0, rating: []})
        let recipe = new Recipe({...req.body, saved_count: 0, rating: [], author: user._id})
        await recipe.save()
        await user.my_recipes.push(recipe)
        await user.save()
        res.send("udało się dodać")
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = addRecipe