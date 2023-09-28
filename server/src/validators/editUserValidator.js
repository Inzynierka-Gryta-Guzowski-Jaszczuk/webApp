const joi = require('joi')
// const passwordComplexity = require('joi-password-complexity')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);


const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().label("First Name"),
        lastName: joi.string().label("Last Name"),
        userName: joi.string().label("Username"),
        email: joi.string().email().label("Email"),
    })


    return schema.validate(data)
}

module.exports = validate