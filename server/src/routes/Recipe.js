const express = require('express')
router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')
const addRecipeService = require('./../services/recipes/addRecipe')
const getUserRecipesService = require('../services/recipes/getUserRecipes')
const getMyRecipesService = require('../services/recipes/getMyRecipes')
const getAllRecipesService = require('./../services/recipes/getAllRecipes')
const getRecipeService = require('./../services/recipes/getRecipe')
const deleteRecipeService = require('./../services/recipes/deleteRecipe')
const updateRecipeService = require('./../services/recipes/updateRecipe')
const getFilteredRecipesFridgeService = require('./../services/recipes/getFilteredRecipesFridge')
const getFilteredRecipesService = require('./../services/recipes/getFilteredRecipes')
const addRecipeToSavedService = require('./../services/recipes/addRecipeToSaved')
const deleteRecipeFromSavedService = require('./../services/recipes/deleteRecipeFromSaved')
const getSavedRecipesService = require('./../services/recipes/getSavedRecipes')
const isRecipeSavedService = require('./../services/recipes/isRecipeSaved')
const Recipe = require('../models/Recipe')
//for not authorized users
router.get('/public/', (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all recipes'
    getAllRecipesService(req, res)
})

//search by ingredients
router.get('/public/search/fridge', (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Search by ingredients'
    // #swagger.description = 'write ingredients after comas'
    getFilteredRecipesFridgeService(req, res)
})

router.get('/public/search', (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Search by name and tags'
    getFilteredRecipesService(req, res)
})

//get specific recipe by id
router.get('/public/:id', (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get specific recipe by id'
    getRecipeService(req, res)
})

//get all recipes of specific user
router.get('/public/user/:id', (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all recipes of specific user'
    getUserRecipesService(req, res)
})

//for authorized users

//get all recipes of logged user
router.get('/all', authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all recipes of logged user'
    getMyRecipesService(req, res)
})

//ad recipe
router.post('/add', authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Add recipe'
   /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/definitions/AddRecipe" },
                  }
              }
          }
        */
    addRecipeService(req, res)
})

//delete recipe 
router.delete('/',authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Delete recipe'
    deleteRecipeService(req, res)
})

//edit recipe
router.put('/',authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Edit recipe'
     /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/definitions/EditRecipe" },
                  }
              }
          }
        */
    updateRecipeService(req, res)
})

//get tags
router.get('/tags', (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get tags'
    res.send(Recipe.getCategorizedTags())
})

//saved recipes

router.get('/saved/:id', authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Check if recipe is saved'
    isRecipeSavedService(req, res)
})

//get all saved recipes of logged user
router.get('/saved', authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Get all saved recipes of logged user'
    getSavedRecipesService(req, res)
})

//add recipe to saved
router.post('/saved', authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Add recipe to saved'
    addRecipeToSavedService(req, res)
})

//delete recipe from saved
router.delete('/saved', authenticate, (req, res) => {
    // #swagger.tags = ['Recipes']
    // #swagger.summary = 'Delete recipe from saved'
    deleteRecipeFromSavedService(req, res)
})



module.exports = router