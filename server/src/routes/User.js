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
    users = await getAllUsersService()
    console.log(users)
    res.json(users)
})

//create new user (during registration)
router.post('/register', async (req, res) => {
    await addUserService(req, res)
})

router.post('/login', async (req, res) => {
    console.log("login")
    await loginUserService(req, res)
})

//get user from token (for showing profile)
router.get('/myProfile', authenticate, (req, res) => {
    getUser(req, res)
})

router.post('/myProfile', authenticate, (req, res) => {
    editUserService(req, res)
})

//send request to this path to check if user can see forms and sites without special user data
router.get('/authenticate', authenticate, (req, res) => {
    res.sendStatus(200)
})

router.get("/token", async (req, res) => {
    console.log("token")
    await refreshToken(req, res)
})

router.delete('/delete', authenticate, async (req, res) => {
    deleteUserService(req, res)
})

router.get('/activate/:token', async (req, res) => {
    console.log("test123")
    activateUserService(req, res)
})

module.exports = router

/**
*@swagger
*paths:
*    /user/authenticate:
*        get:
*            tags: [Users]
*            summary: Authenticate a user
*            description: This endpoint checks if a user can see forms and sites without special user data.
*            security:
*               - token: []
*            responses:
*                200:
*                    description: The user is authenticated.
*                401:
*                    description: Unauthorized. The user is not authenticated.
*                500:
*                    description: Internal server error.
*/