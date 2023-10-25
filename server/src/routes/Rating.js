const express = require('express')
router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')
const Recipe = require('./../models/Recipe')
const User = require('./../models/User')

const validateRequest = async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(404).send("Użytkownik nie istnieje")
    }
    
    if(!req.params.id){
        return res.status(400).send("Brak id przepisu")
    }
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }
    
    return {user, recipe}
}

router.post('/recipe/:id', authenticate, async (req, res) => {
    // #swagger.tags = ['Rating']
    // #swagger.summary = 'Rate recipe, used for changing rate too'
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/definitions/Rating" },
                  }
              }
          }
        */
    
    const {user, recipe} = await validateRequest(req, res)
    const rate = req.body?.rate
    if (!rate) {
        return res.status(400).send("Brak oceny")
    }
    const ratings = recipe.rating

    // check if user already rated
    const userRating = ratings.find(rating => rating.user.equals(user._id))
    if(userRating){
        userRating.rate = rate
    }
    else{
        ratings.push({
            rate: rate,
            user: user
        })
    }
    await recipe.save()
    res.status(200).send("Udało się ocenić przepis")
    console.log("recipe", recipe)
})

router.get('/recipe/:id', authenticate, async (req, res) => {
    // #swagger.tags = ['Rating']
    // #swagger.summary = 'Rate recipe, used for changing rate too'
    const {user, recipe} = await validateRequest(req, res)
    const ratings = recipe.rating
    const userRating = ratings.find(rating => rating.user.equals(user._id))
    if(userRating){
        res.send({rate: userRating.rate})
    }
    else{
        res.send({rate: 0})
    }
})

module.exports = router