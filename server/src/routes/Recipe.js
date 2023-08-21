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
const getFilteredRecipesService = require('./../services/recipes/getFilteredRecipes')
//for not authorized users
router.get('/public/', (req, res) => {
    getAllRecipesService(req, res)
})

//search by ingredients
router.get('/public/search', (req, res) => {
    console.log("search")
    getFilteredRecipesService(req, res)
})

router.get('/public/:id', (req, res) => {
    getRecipeService(req, res)
})

router.get('/public/user/:id', (req, res) => {
    getUserRecipesService(req, res)
})



//for authorized users
router.get('/all', authenticate, (req, res) => {
    getMyRecipesService(req, res)
})

router.post('/add', authenticate, (req, res) => {
    addRecipeService(req, res)
})

router.delete('/',authenticate, (req, res) => {
    deleteRecipeService(req, res)
})

router.put('/',authenticate, (req, res) => {
    updateRecipeService(req, res)
})

module.exports = router