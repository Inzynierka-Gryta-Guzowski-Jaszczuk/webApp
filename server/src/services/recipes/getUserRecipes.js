const Recipe = require('../../models/Recipe')
const User = require('../../models/User')

const getRecipes = async (req, res) => {
    try {
        
        const recipes = await Recipe.find({author: req.params.id})
        res.send(recipes)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getRecipes