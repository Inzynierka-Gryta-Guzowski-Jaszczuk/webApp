const User = require('../../models/User')
const Recipe = require('../../models/Recipe')

const addRecipe = async (req, res) => {
    try {
        let recipes = await Recipe.find({})

        res.send(recipes)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = addRecipe