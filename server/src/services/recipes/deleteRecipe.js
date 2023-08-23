const User = require('../../models/User')
const Recipe = require('../../models/Recipe')

const DeleteRecipe = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user})
        console.log("user: ", user)
        if(!user) {
            res.sendStatus(303)
            return
        }

        await Recipe.deleteOne({_id: req.body.id})

        res.status(200).send("udało się usunąć")
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = DeleteRecipe