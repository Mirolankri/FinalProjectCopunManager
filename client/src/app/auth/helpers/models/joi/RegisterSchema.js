import Joi from "joi";
export const hebrewJoiMessages = {
    'string.base': 'השדה חייב להיות טקסט',
    'string.empty': 'השדה לא יכול להיות ריק',
    'string.min': 'השדה חייב להכיל לפחות {#limit} תווים',
    'string.max': 'השדה לא יכול להכיל יותר מ-{#limit} תווים',
    'string.email': 'יש להזין כתובת אימייל תקינה',
    'string.pattern.base': 'הערך אינו תואם את הפורמט הנדרש',
    'number.base': 'השדה חייב להיות מספר',
    'number.min': 'הערך חייב להיות גדול או שווה ל-{#limit}',
    'number.max': 'הערך חייב להיות קטן או שווה ל-{#limit}',
    'array.base': 'השדה חייב להיות מערך',
    'array.min': 'יש לבחור לפחות {#limit} פריטים',
    'array.max': 'אין לבחור יותר מ-{#limit} פריטים',
    'any.required': 'שדה חובה',
    'any.only': 'ערך לא חוקי'
  };
  const HebrewJoi = Joi.defaults((schema) => {
    return schema.messages(hebrewJoiMessages);
  });
  
const registerSchema = {
  first: HebrewJoi
            .string()
            .min(2)
            .max(256)
            .required(),
  last: HebrewJoi
            .string()
            .min(2)
            .max(256)
            .required(),
  phone: HebrewJoi.string()
        .ruleset.regex(/0[0-9]{2}[0-9]{7}/)
        .rule({ message: 'יש להזין מספר טלפון תיקני 0501234567' })
        .required(),
  email: HebrewJoi.string()
        .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'יש להזין מייל תיקני example@mail.com' })
        .required(),
  password: HebrewJoi.string()
            .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{6,20})/)
            .rule({ message: 'סיסמא חייבת לכלול לפחות 6 תווים, אות גדולה, אות קטנה, מספר וסימן מיוחד !@#$%^&*' })
            .required()
};

export default registerSchema;
