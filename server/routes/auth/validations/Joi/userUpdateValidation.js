const Joi = require('joi');

const userUpdateValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object().keys({
            first: Joi.string().min(2).max(256).required(),
            last: Joi.string().min(2).max(256).required()
        }).required(),
        // isSuperAdmin: Joi.boolean(),
        // isAdmin: Joi.boolean(),
        // isUser: Joi.boolean(),
        // parentuserId: Joi.string().ruleset.regex(/^[0-9a-fA-F]{24}$/).rule({ message: 'parentuserId must be a valid ObjectId' }),
        phone: Joi.string().ruleset.regex(/0[0-9]{2}[0-9]{7}/).rule({ message: 'יש להזין מספר טלפון תיקני 0501234567' }).required(),
        email: Joi.string().ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).rule({ message: 'יש להזין מייל תיקני example@mail.com' }).required(),
        // password: Joi.string().ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{6,20})/).rule({ message: 'סיסמא חייבת לכלול לפחות 6 תווים, אות גדולה, אות קטנה, מספר וסימן מיוחד !@#$%^&*' }).required(),
    });

    return schema.validate(user);
};

module.exports = userUpdateValidation;