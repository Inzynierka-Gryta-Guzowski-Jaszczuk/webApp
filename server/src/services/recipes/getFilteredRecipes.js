const Recipe = require('../../models/Recipe')

const getFiltered = async (req, res) => {
    try {
        
        const x = req.query.name
        console.log(x)
        if(!x) {
            res.status(400).send("Bad request")
        }
        let recipes = []
        const regex = `^.*${x}.*$`
        recipes += await Recipe.find({ name: { $regex:  regex} }, { _id: 0 });
        recipes += await Recipe.find({ tags: { $regex:  regex} }, { _id: 0 });

        // let recipes = await Recipe.find({$nor:[{'ingredients':{$elemMatch:{ 'name': {$nin:selected}}}}]},{_id:0})
        res.send(recipes)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
    
}

module.exports = getFiltered