import joi from 'joi';
// const passwordComplexity = require('joi-password-complexity')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);


const validate = (data: any) => {
    const schema = joi.object({
        firstName: joi.string().label("First Name"),
        lastName: joi.string().label("Last Name"),
        userName: joi.string().label("Username"),
    })


    return schema.validate(data)
}

module.exports = validate