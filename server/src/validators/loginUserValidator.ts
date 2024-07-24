import joi from 'joi';

const validate = (data: any) => {
    const schema = joi.object({
        userName: joi.string().required().label("Username"),
        password: joi.string().required().label("Password"),
        })
    return schema.validate(data)
}

module.exports = validate