const Recipe = require('../../models/Recipe');
const validate = require('../../validators/updateRecipeValidator')
const User = require('../../models/User')

const updateRecipe = async (req, res) => {
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
        const {id, ...rest} = req.body
        const updated = await Recipe.findByIdAndUpdate(id, rest, {new: true})
        res.status(200).send(updated)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = updateRecipe