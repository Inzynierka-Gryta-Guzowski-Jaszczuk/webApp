const express = require('express')
const app = express()
const cors = require('cors')
//routers
const userRouter = require('./src/routes/User')
const recipeRouter = require('./src/routes/Recipe')
const imagesRouter = require('./src/routes/Images')
const connectDB = require('./src/configs/configDB')

connectDB()
app.use(cors())
app.use(express.json())
app.use( '/static', express.static('images'))


// app.use('/outfits', outfitRouter)
app.use('/user', userRouter)
app.use('/recipe', recipeRouter)
app.use("/image", imagesRouter)
// app.use('/clothes', clothesRouter)

app.get('/tester', (req, res) => {
    res.send("hello")
})

app.listen(5000, () => console.log('Nasluchiwanie na porcie', 5000))