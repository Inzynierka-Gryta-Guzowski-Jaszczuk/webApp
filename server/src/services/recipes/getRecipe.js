const User = require('../../models/User')
const Recipe = require('../../models/Recipe')

const getRecipe = async (req, res) => {
    try {
        if(req.params.id === undefined || req.params.id === null || req.params.id.length < 12 ) {
            res.status(400).send("Bad request")
            return
        }
        let recipe = await Recipe.findOne({_id: req.params.id})
        if(recipe === null) {
            res.status(404).send("Recipe not found")
            return  
        }
        res.send(recipe)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getRecipe