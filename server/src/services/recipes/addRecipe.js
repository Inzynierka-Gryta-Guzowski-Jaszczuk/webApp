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

/**
*@swagger
*paths:
*    /recipes:
*        post:
*            summary: Add a new recipe
*            description: This endpoint allows for the addition of a new recipe.
*            requestBody:
*                required: true
*                content:
*                    application/json:
*                        schema:
*                            type: object
*                            properties:
*                                name:
*                                    type: string
*                                    description: The name of the recipe.
*                                description:
*                                    type: string
*                                    description: The description of the recipe.
*                                ingredients:
*                                    type: array
*                                    items:
*                                        type: object
*                                        properties:
*                                            name:
*                                                type: string
*                                                description: The name of the ingredient.
*                                            amount:
*                                                type: integer
*                                                description: The amount of the ingredient.
*                                            unit:
*                                                type: string
*                                                description: The unit of the ingredient.
*                                instructions:
*                                    type: array
*                                    items:
*                                        type: string
*                                        description: The instructions for the recipe.
*                                tags:
*                                    type: array
*                                    items:
*                                        type: string
*                                        description: The tags associated with the recipe.
*                                difficulty:
*                                    type: string
*                                    description: The difficulty level of the recipe.
*                                calories:
*                                    type: integer
*                                    description: The calories in the recipe.
*                                portions:
*                                    type: integer
*                                    description: The number of portions the recipe makes.
*                                time:
*                                    type: integer
*                                    description: The time required to prepare the recipe.
*            responses:
*                201:
*                    description: The recipe was successfully created.
*                400:
*                    description: Bad request. The request body is invalid.
*                500:
*                    description: Internal server error.
*/