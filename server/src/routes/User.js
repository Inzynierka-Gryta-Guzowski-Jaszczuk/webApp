const express = require('express')
router = express.Router()
//services
const getAllUsersService = require('./../services/getAllUsers')
const addUserService = require('./../services/addUser')
const loginUserService = require('./../services/loginUser')
const editUserService = require('./../services/editUser')
const getUser = require('./../services/getUser')
const refreshToken = require('./../services/refreshToken')
const deleteUserService = require('./../services/deleteUser')
const activateUserService = require('./../services/activateUser')
//middlewares
const authenticate = require('./../middlewares/AuthorizationJWT')

//get all users
router.get('/', async (req, res) => {
    // #swagger.tags = ['Users']
    users = await getAllUsersService()
    console.log(users)
    res.json(users)
})

//create new user (during registration)
router.post('/register', async (req, res) => {
    // #swagger.tags = ['Users']
    await addUserService(req, res)
})

router.post('/login', async (req, res) => {
    // #swagger.tags = ['Auth']
    console.log("login")
    await loginUserService(req, res)
})

//get user from token (for showing profile)
router.get('/myProfile', authenticate, (req, res) => {
    // #swagger.tags = ['Users']
    getUser(req, res)
})

//edit user
router.put('/myProfile', authenticate, (req, res) => {
    // #swagger.tags = ['Users']
    editUserService(req, res)
})

//send request to this path to check if user can see forms and sites without special user data
router.get('/authenticate', authenticate, (req, res) => {
    // #swagger.tags = ['Auth']
    res.sendStatus(200)
})

router.get("/token", async (req, res) => {
    // #swagger.tags = ['Auth']
    console.log("token")
    await refreshToken(req, res)
})

router.delete('/delete', authenticate, async (req, res) => {
    // #swagger.tags = ['Users']
    deleteUserService(req, res)
})

router.get('/activate/:token', async (req, res) => {
    // #swagger.tags = ['Auth']
    console.log("test123")
    activateUserService(req, res)
})

module.exports = router