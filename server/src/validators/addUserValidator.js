const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().label("First Name"),
        lastName: joi.string().label("Last Name"),
        userName: joi.string().required().label("Username"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })


    return schema.validate(data)
}

module.exports = validate