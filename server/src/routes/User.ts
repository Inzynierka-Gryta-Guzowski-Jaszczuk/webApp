import express, { Request, Response } from 'express';
const router = express.Router();
//services
const getAllUsersService = require('./../services/getAllUsers');
const addUserService = require('./../services/addUser');
const loginUserService = require('./../services/loginUser');
const editUserService = require('./../services/editUser');
const getUser = require('./../services/getUser');
const refreshToken = require('./../services/refreshToken');
const deleteUserService = require('./../services/deleteUser');
const activateUserService = require('./../services/activateUser');
const changePasswordService = require('./../services/changePassword');
//middlewares
const authenticate = require('./../middlewares/AuthorizationJWT');

//get all users
router.get('/', async (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get all users'
    const users = await getAllUsersService();
    console.log(users);
    res.json(users);
})

//create new user (during registration)
router.post('/register', async (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = Create new user (during registration)
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/definitions/Register" },
                  }
              }
          }
        */
    await addUserService(req, res)
})

router.post('/login', async (req: Request, res: Response) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Login user
    /* #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/definitions/Login" },
                  }
              }
          }
        */
    console.log("login")
    await loginUserService(req, res)
})

//get user from token (for showing profile)
router.get('/myProfile', authenticate, async (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = Get user from token (for showing profile)
    getUser(req, res)
})

//edit user
router.put('/myProfile', authenticate, async (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = Edit user
    /* #swagger.RequestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/definitions/EditUser" },
                  }
              }
          }
        */
    editUserService(req, res)
})

//send Request to this path to check if user can see forms and sites without special user data
router.get('/authenticate', authenticate, async (req: Request, res: Response) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Send Request to this path to check if user can see forms and sites without special user data
    res.sendStatus(200)
})

router.get("/token", async (req: Request, res: Response) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Get new token
    console.log("token")
    await refreshToken(req, res)
})

router.delete('/delete', authenticate, async (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = Delete user
    deleteUserService(req, res)
})

router.get('/activate/:token', async (req: Request<{token: 'string'}>, res: Response) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = Activate user
    console.log("test123")
    activateUserService(req, res)
})

router.post('/changePassword', authenticate, async(req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = change password 
    
    changePasswordService(req, res)
})

module.exports = router