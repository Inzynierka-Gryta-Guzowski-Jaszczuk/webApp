import express, { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
const router = express.Router()
const authenticate = require('../middlewares/AuthorizationJWT')
import {RecipeDocument, Recipe} from '../models/Recipe'
const User = require('../models/User')

const validateRequest = async (req: Request, res: Response) => {
    //@ts-ignore
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(404).send("Użytkownik nie istnieje")
        return null
    }
    
    
    if(!req.params.id){
        res.status(400).send("Brak id przepisu")
        return null
    }
    const recipe: HydratedDocument<RecipeDocument> | null = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        res.status(404).send("Przepis nie istnieje")
        return null;
    }
    
    return {user, recipe}
}

router.post('/recipe/:id', authenticate, async (req: Request<{id: 'string'}>, res: Response) => {
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
    
    const result = await validateRequest(req, res)
    if(!result){
        return
    }
    const {user, recipe} = result
    const rate = req.body?.rate
    if (!rate) {
        return res.status(400).send("Brak oceny")
    }
    const ratings = recipe.rating

    // check if user already rated
    //@ts-ignore
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

router.get('/recipe/:id', authenticate, async (req: Request<{id: 'string'}>, res: Response) => {
    // #swagger.tags = ['Rating']
    // #swagger.summary = 'Rate recipe, used for changing rate too'
    const result = await validateRequest(req, res)
    if(!result){
        return
    }
    const {user, recipe} = result
    const ratings = recipe.rating
    // @ts-ignore
    const userRating = ratings.find(rating => rating.user.equals(user._id))

    let averageRating: number | null = 0
    if(ratings.length !== 0) {
        const sum = ratings.reduce((total, rating) => total + rating.rate, 0);
        averageRating = sum / ratings.length;
    }else {
        averageRating = null
    }


    if(userRating){
        res.send({rate: averageRating, userRate: userRating.rate})
    }
    else{
        res.send({rate: averageRating, userRate: 0})
    }
})

module.exports = router