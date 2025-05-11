import Joi from "joi";

const loginSchema = {
  phone: Joi.string()
        .ruleset.regex(/0[0-9]{2}[0-9]{7}/)
        .rule({ message: 'יש להזין מספר טלפון תיקני 0501234567' })
        .messages({
            'string.empty': 'שדה טלפון לא יכול להיות ריק',            
        })
        .required(),
  password: Joi.string()
            .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{6,20})/)
            .rule({ message: 'סיסמא חייבת לכלול לפחות 6 תווים, אות גדולה, אות קטנה, מספר וסימן מיוחד !@#$%^&*' })
            .messages({
                'string.empty': 'שדה סיסמא לא יכול להיות ריק',
            })
            .required()
};

export default loginSchema;
