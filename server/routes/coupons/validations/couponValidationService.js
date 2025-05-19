const validateCoupon = require("./Joi/validateCoupon");
const validateCouponShared = require("./Joi/validateCouponShared");

const validator = undefined || 'Joi';


const validateNewCoupon = (coupon) => {
    if(validator === 'Joi') return validateCoupon(coupon);
}

const validateSharedCoupon = (coupon) => {
    if(validator === 'Joi') return validateCouponShared(coupon);
}

exports.validateNewCoupon = validateNewCoupon;
exports.validateSharedCoupon = validateSharedCoupon;