const mongoose = require('mongoose')

const connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    const url = "mongodb://127.0.0.1/cooking_app"
    try {
        await mongoose.connect(url, connectionParams)
        console.log('Connected to database')
    } catch(error) {
        console.log(error)
        console.log('could not connect to database')
    }
}

module.exports = connect