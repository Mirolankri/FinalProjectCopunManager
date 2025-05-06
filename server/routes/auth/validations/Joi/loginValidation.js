const Joi = require('joi');

const loginValidation = (user) => {
    const schema = Joi.object({
        phone: Joi.string().ruleset.regex(/0[0-9]{2}[0-9]{7}/).rule({ message: 'יש להזין מספר טלפון תיקני 0501234567' }).required(),
        password: Joi.string().ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{6,20})/).rule({ message: 'סיסמא חייבת לכלול לפחות 6 תווים, אות גדולה, אות קטנה, מספר וסימן מיוחד !@#$%^&*' }).required(),
    })

    return schema.validate(user);
}

module.exports = loginValidation;