const Recipe = require('../../models/Recipe');
const validate = require('../../validators/addRecipeValidator')
const User = require('../../models/User')

const addRecipe = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        if(!user) {
            res.sendStatus(303)
        }
        console.log(req.body)
        const {error} = validate(req.body)
        if(error) {
            return res.status(400).send({message: error.details[0].message})
        }
        
        console.log({...req.body, saved_count: 0, rating: []})
        let recipe = new Recipe({...req.body, saved_count: 0, rating: [], author: user._id})
        recipe.image = "http://localhost:5000/static/defaultRecipe.png"
        await recipe.save()
        await user.my_recipes.push(recipe)
        await user.save()
        res.status(200).send(recipe._id)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = addRecipe