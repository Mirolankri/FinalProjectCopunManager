const Joi = require('joi');

const validateCoupon = (coupon) => {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    const schema = Joi.object({
        name: Joi.string().min(2).max(256).required(),
        code: Joi.string().min(2).max(256).required(),
        store: Joi.string().min(2).max(256).required(),
        category: Joi.string().min(2).max(256).allow(''),
        description: Joi.string().min(2).max(256).allow(''),
        amount: Joi.number().required(),
        discount: Joi.number(),
        used: Joi.boolean().default(false),
        website: Joi.string().ruleset.regex(urlRegex).rule({ message: 'יש להזין כתובת חוקית' }).allow(''),
        sharedWith: Joi.array().items(Joi.object().keys({
            name: Joi.string().min(2).max(256).allow(""),
            url: Joi.string().ruleset.regex(urlRegex).rule({ message: 'יש להזין כתובת חוקית' }).allow(""),
            sharedAt: Joi.date().default(Date.now)
        })),
        expiryDate: Joi.date(),
        createdAt: Joi.date().default(Date.now),
        userId: Joi.string().allow("")
    });

    return schema.validate(coupon);
}

module.exports = validateCoupon;