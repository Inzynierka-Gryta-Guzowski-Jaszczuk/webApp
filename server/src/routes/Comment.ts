import express, { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { RecipeDocument } from '../models/Recipe';
import CommentDocument from '../models/Comment';
import { UserDocument } from '../models/User';
const router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')
const User = require('./../models/User')
const Recipe = require('./../models/Recipe')

const commentsToDTO = (comments : CommentDocument[]) => {
    return comments.map(comment => {
        const user = comment.user as UserDocument
        return {
            commentId: comment._id,
            comment: comment.comment,
            user: user.userName,
            userId: user._id
        }
    })
} 

router.get('/recipe/:id', async (req: Request<{id: 'string'}>, res: Response) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get comments for recipe'
    /* #swagger.responses[200] = {
                description: 'Some description...',
                schema: [{ $ref: '#/definitions/Comment' }]
        } */
    if(!req.params.id){
        return res.status(400).send("Brak id przepisu")
    }
    const recipe: HydratedDocument<RecipeDocument> | null = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }
    const commentsDTO = commentsToDTO(recipe.comments)
    res.send(commentsDTO)
    console.log("recipe", recipe)
})

router.post('/recipe/:id', authenticate, async (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Add comment to recipe'
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }

    const comment = req.body.comment
    if (!comment) {
        return res.status(400).send("Brak komentarza")
    }
    //@ts-ignore
    const user = await User.findById(req.user._id)
    recipe.comments.push({
        comment: comment,
        user: user
    })
    await recipe.save()
    const commentsDTO = commentsToDTO(recipe.comments)
    res.send(commentsDTO)
    console.log("recipe", recipe)
})

router.put('/recipe/:id/comment/:comment_id', authenticate, async (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Edit comment for recipe'
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }
    //@ts-ignore
    const user = await User.findById(req.user._id)
    // const comment = recipe.comments.id(req.params.comment_id)[0]
    const comment = recipe.comments.id(req.params.comment_id)
    // recipe.comments.pull(comment)
    if (!comment) {
        return res.status(404).send("Komentarz nie istnieje")
    }
    if (comment.user._id.toString() !== user._id.toString()) {
        return res.status(403).send("Nie masz uprawnień do edycji tego komentarza")
    }
    comment.comment = req.body.comment
    // recipe.comments.push(comment)
    await recipe.save()
    const commentsDTO = commentsToDTO(recipe.comments)
    res.send(commentsDTO)
    console.log("recipe", recipe)
})

router.delete('/recipe/:id/comment/:comment_id', authenticate, async (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Delete comment for recipe'
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }
    //@ts-ignore
    const user = await User.findById(req.user._id)
    const comment = recipe.comments.id(req.params.comment_id)
    if (!comment) {
        return res.status(404).send("Komentarz nie istnieje")
    }
    if (comment.user._id.toString() !== user._id.toString()) {
        return res.status(403).send("Nie masz uprawnień do usunięcia tego komentarza")
    }
    await recipe.comments.pull(comment)
    await recipe.save()
    const commentsDTO = commentsToDTO(recipe.comments)
    res.send(commentsDTO)
    console.log("recipe", recipe)
})


module.exports = router