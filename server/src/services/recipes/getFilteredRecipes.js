const Recipe = require('../../models/Recipe')
const recipeToDTO = require('./recipeDTO')

const getFiltered = async (req, res) => {
    try {
        
        const x = req.query.name
        console.log(x)
        if(!x) {
            res.status(400).send("Bad request")
        }
        let recipes = []
        const regex = `^.*${x}.*$`
        let recipesTmp = await Recipe.find({ name: { $regex:  regex} }, { _id: 0 });
        recipes = recipes.concat(recipesTmp)
        recipesTmp = await Recipe.find({ tags: { $regex:  regex} }, { _id: 0 });
        recipes = recipes.concat(recipesTmp)
        
        console.log(recipes)
        // let recipes = await Recipe.find({$nor:[{'ingredients':{$elemMatch:{ 'name': {$nin:selected}}}}]},{_id:0})
        const recipesDTO = recipes.map(recipe => recipeToDTO(recipe))
        res.send(recipesDTO)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getFiltered