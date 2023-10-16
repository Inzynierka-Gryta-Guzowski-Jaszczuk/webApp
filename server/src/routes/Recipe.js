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
    getAllRecipesService(req, res)
})

//search by ingredients
router.get('/public/search/fridge', (req, res) => {
    console.log("search")
    getFilteredRecipesFridgeService(req, res)
})

router.get('/public/search', (req, res) => {
    getFilteredRecipesService(req, res)
})

//get specific recipe by id
router.get('/public/:id', (req, res) => {
    getRecipeService(req, res)
})

//get all recipes of specific user
router.get('/public/user/:id', (req, res) => {
    getUserRecipesService(req, res)
})

//for authorized users

//get all recipes of logged user
router.get('/all', authenticate, (req, res) => {
    getMyRecipesService(req, res)
})

//ad recipe
router.post('/add', authenticate, (req, res) => {
    addRecipeService(req, res)
})

//delete recipe 
router.delete('/',authenticate, (req, res) => {
    deleteRecipeService(req, res)
})

//edit recipe
router.put('/',authenticate, (req, res) => {
    updateRecipeService(req, res)
})

//get tags
router.get('/tags', (req, res) => {
    res.send(Recipe.getCategorizedTags())
})

//saved recipes

router.get('/saved/:id', authenticate, (req, res) => {
    isRecipeSavedService(req, res)
})

//get all saved recipes of logged user
router.get('/saved', authenticate, (req, res) => {
    getSavedRecipesService(req, res)
})

//add recipe to saved
router.post('/saved', authenticate, (req, res) => {
    addRecipeToSavedService(req, res)
})

//delete recipe from saved
router.delete('/saved', authenticate, (req, res) => {
    deleteRecipeFromSavedService(req, res)
})



module.exports = router