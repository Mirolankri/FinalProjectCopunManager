const Joi = require('joi');

const validateCouponShared = (coupon) => {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    const schema = Joi.object({
        shareName: Joi.string().min(2).max(256).required(),
        expiryDate: Joi.date().required(),
        createdAt: Joi.date().default(Date.now),
        couponId: Joi.string().allow("")
    });

    return schema.validate(coupon);
}

module.exports = validateCouponShared;