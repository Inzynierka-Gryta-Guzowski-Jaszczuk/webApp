const Recipe = require('../../models/Recipe')
const recipeToDTO = require('./recipeDTO')

// ingredients.forEach((element, index) => {
//     ingredients[index] = element.toLowerCase()
// });
// //delete white spaces
// ingredients.forEach((element, index) => {
//     ingredients[index] = element.trim()
// });

// //delete duplicates
// ingredients.forEach((element, index) => {
//     if(ingredients.indexOf(element) !== index) {
//         ingredients.splice(index, 1)
//     }
// });
const getFilteredFridge = async (req, res) => {
    try {
        const ingredients = req.query.ingredients
        console.log(ingredients)
        if(!ingredients) {
            res.status(400).send("Bad request")
        }
        //ingredients will look like this: "jajo,mleko,piwo,maka", divide into array of strings without commas
        let selected = ingredients.split(",")

        // let recipes = await Recipe.find({'ingredients.name': {$in: ingredients}})
        selected.forEach((element, index) => {
            selected[index] = element.toLowerCase()
        });
        //delete white spaces
        selected.forEach((element, index) => {
            selected[index] = element.trim()
        });
        //delete duplicates
        selected.forEach((element, index) => {
            if(selected.indexOf(element) !== index) {
                selected.splice(index, 1)
            }
        });
        let recipes = await Recipe.find({$nor:[{'ingredients':{$elemMatch:{ 'name': {$nin:selected}}}}]})

        const recipesDTO = recipes.map(recipe => recipeToDTO(recipe))
        res.send(recipesDTO)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getFilteredFridge