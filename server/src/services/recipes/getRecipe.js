const User = require('../../models/User')
const Recipe = require('../../models/Recipe')

const getRecipe = async (req, res) => {
    try {
        let recipe = await Recipe.find({_id: req.params.id})
        res.send(recipe)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getRecipe