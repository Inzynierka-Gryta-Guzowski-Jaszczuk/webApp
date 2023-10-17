const express = require('express')
const app = express()
const cors = require('cors')
//routers
const userRouter = require('./src/routes/User')
const recipeRouter = require('./src/routes/Recipe')
const imagesRouter = require('./src/routes/Images')
const commentRouter = require('./src/routes/Comment')
const connectDB = require('./src/configs/configDB')

//swagger
bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            // description:
            //     "This is a simple CRUD API application made with Express and documented with Swagger",
            // license: {
            //     name: "MIT",
            //     url: "https://spdx.org/licenses/MIT.html",
            // },
            // contact: {
            //     name: "LogRocket",
            //     url: "https://logrocket.com",
            //     email: "info@email.com",
            // },
        },
        components: {
            securitySchemes: {
                token: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    name: "costam",
                    in: "header",
                }
            }
        }
        // servers: [
        // {
        //     url: "http://localhost:3000",
        // },
        // ],
    },
    apis: ["./src/routes/*.js", "./src/services/*.js", "./src/services/recipes/*.js"],
};
  
const specs = swaggerJsdoc(options);
app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(specs, { explorer: true })
);

connectDB()
app.use(cors())
app.use(express.json())
app.use( '/static', express.static('images'))


// app.use('/outfits', outfitRouter)
app.use('/user', userRouter)
app.use('/recipe', recipeRouter)
app.use("/image", imagesRouter)
app.use('/comment', commentRouter)
// app.use('/clothes', clothesRouter)

app.get('/tester', (req, res) => {
    res.send("hello")
})

app.listen(5000, () => console.log('Nasluchiwanie na porcie', 5000))