/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         commentId:
 *           type: string
 *           description: The auto-generated id of the comment
 *         comment:
 *           type: string
 *           description: Body of the comment
 *         user:
 *           type: string
 *           description: User name of the author
 *         userId:
 *           type: boolean
 *           description: Id of the author
 *     CommentInput:
 *        type: object
 *        properties:
 *         comment:
 *          type: string
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments managing API
 * /comment/recipe/{id}:
 *   post:
 *     security:
 *       - token: []
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 *
 */
/**
*@swagger
*paths:
*    /comment/recipe/{id}:
*        get:
*            security:
*              - token: []
*            tags: [Comments]
*            summary: Get comments for a recipe
*            description: This endpoint retrieves the comments for a recipe by its ID.
*            parameters:
*                  - in: path
*                    name: id
*                    schema:
*                        type: string
*                    required: true
*                    description: The ID of the recipe.
*            responses:
*                200:
*                    description: The comments were successfully retrieved.
*                    content:
*                        application/json:
*                            schema:
*                                type: array
*                                items:
*                                    type: object
*                                    properties:
*                                        user:
*                                            type: string
*                                            description: The ID of the user who made the comment.
*                                        text:
*                                            type: string
*                                            description: The text of the comment.
*                404:
*                    description: Recipe not found. The provided ID does not match any recipe.
*                500:
*                    description: Internal server error.
 */

/**
*@swagger
*paths:
*    /comment/recipe/{id}/comment/{comment_id}:
*        put:
*            security:
*              - token: []
*            tags: [Comments]
*            summary: Edit a comment for a recipe
*            description: This endpoint allows for the editing of a comment by its ID for a specific recipe.
*            parameters:
*                - in: path
*                  name: id
*                  schema:
*                      type: string
*                  required: true
*                  description: The ID of the recipe.
*                - in: path
*                  name: comment_id
*                  schema:
*                      type: string
*                  required: true
*                  description: The ID of the comment.
*            requestBody:
*                required: true
*                content:
*                    application/json:
*                        schema:
*                            type: object
*                            properties:
*                                comment:
*                                    type: string
*                                    description: The new text of the comment.
*            responses:
*                200:
*                    description: The comment was successfully updated.
*                    content:
*                        application/json:
*                            schema:
*                                type: array
*                                items:
*                                    $ref: '#/components/schemas/Comment'
*                403:
*                    description: Forbidden. The user does not have permission to edit this comment.
*                404:
*                    description: Comment or recipe not found. The provided IDs do not match any comment or recipe.
*                500:
*                    description: Internal server error.
*/

/**
*@swagger
*paths:
*    /comment/recipe/{id}/comment/{comment_id}:
*        delete:
*            security:
*              - token: []
*            tags: [Comments]
*            summary: Delete a comment for a recipe
*            description: This endpoint allows for the deletion of a comment by its ID for a specific recipe.
*            parameters:
*                  - in: path
*                    name: id
*                    schema:
*                        type: string
*                    required: true
*                    description: The ID of the recipe.
*                  - in: path
*                    name: comment_id
*                    schema:
*                        type: string
*                    required: true
*                    description: The ID of the comment.
*            responses:
*                200:
*                    description: The comment was successfully deleted.
*                    content:
*                        application/json:
*                            schema:
*                                type: array
*                                items:
*                                    $ref: '#/components/schemas/Comment'
*                403:
*                    description: Forbidden. The user does not have permission to delete this comment.
*                404:
*                    description: Comment or recipe not found. The provided IDs do not match any comment or recipe.
*                500:
*                    description: Internal server error.
*/



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