const Recipe = require('../../models/Recipe')
const recipeToDTO = require('./recipeDTO')

const getFiltered = async (req, res) => {
    try {
        
        const x = req.query.name
        if(!x) {
            res.status(400).send("Bad request")
        }
        let selected = x.split(",")

        let recipes = []
        for(const element of selected) {
            // console.log(element)
            // console.log(recipes)
            const regex = `^.*${element}.*$`
            let recipesTmp = await Recipe.find({ name: { $regex:  regex} });
            recipes = recipes.concat(recipesTmp)
            recipesTmp = await Recipe.find({ tags: { $regex:  regex} });
            recipes = recipes.concat(recipesTmp)
            // console.log(recipes)
        }

        // let recipes = await Recipe.find({$nor:[{'ingredients':{$elemMatch:{ 'name': {$nin:selected}}}}]},{_id:0})
        let recipesDTO = recipes.map(recipe => recipeToDTO(recipe))
        console.log("RECIPES DTO", recipesDTO)
        const filteredRecipes = recipesDTO.filter((recipe, index, self) =>
            index === self.findIndex((t) => (
                t.recipe_id.equals(recipe.recipe_id)
            ))
        )

        res.send(filteredRecipes)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getFiltered