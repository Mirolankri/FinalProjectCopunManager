
const normalizeCoupon =  (CouponData, userId) => { 
     
    return {
        ...CouponData,
        userId: CouponData.userId || userId
    };
};
module.exports = normalizeCoupon;