const joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);


const validate = (data) => {
    const schema = joi.object({
        newPassword: joiPassword.string().min(8).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).minOfSpecialCharacters(1).required().label("nowe hasło").messages({
            'password.minOfUppercase': 'hasło powinno zawierać conajmniej jedną wielką literę',
            'password.minOfSpecialCharacters':
                  'hasło powinno zawierać conajmniej jeden specjalny znak',
            'password.minOfLowercase': 'hasło powinno zawierać conajmniej jedną małą literę',
            'password.minOfNumeric': 'hasło powinno zawierać conajmniej jedną cyfrę',
            'password.noWhiteSpaces': 'hasło nie powinno zawierać spacji',
            'password.string.base': 'hasło powinno zawierać conajmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden specjalny znak',
            'password.string.empty': 'hasło nie może być puste',
            'password.string.min': 'hasło powinno zawierać conajmniej 8 znaków',
            'string.min': `hasło powinno mieć przynajmniej 8 znaków`,
        }),
        oldPassword: joi.string(),
        token: joi.string()
    })


    return schema.validate(data)
}

module.exports = validate