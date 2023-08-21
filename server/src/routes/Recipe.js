const express = require('express')
router = express.Router()
const authenticate = require('./../middlewares/AuthorizationJWT')


router.post('/', (req, res) => {
    res.send("todo")
})