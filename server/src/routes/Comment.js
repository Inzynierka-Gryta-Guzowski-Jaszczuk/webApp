const express = require('express')
router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')
const User = require('./../models/User')
const Recipe = require('./../models/Recipe')

const commentsToDTO = (comments) => {
    return comments.map(comment => {
        return {
            commentId: comment._id,
            comment: comment.comment,
            user: comment.user.userName,
            userId: comment.user._id
        }
    })
} 

router.get('/recipe/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }
    const commentsDTO = commentsToDTO(recipe.comments)
    res.send(commentsDTO)
    console.log("recipe", recipe)
})

router.post('/recipe/:id', authenticate, async (req, res) => {
    
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }

    const comment = req.body.comment
    if (!comment) {
        return res.status(400).send("Brak komentarza")
    }
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
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }
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
    const recipe = await Recipe.findById(req.params.id).populate('comments.user')
    if (!recipe) {
        return res.status(404).send("Przepis nie istnieje")
    }
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