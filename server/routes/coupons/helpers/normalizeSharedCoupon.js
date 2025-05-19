
const normalizeSharedCoupon =  (sharedData, couponId) => { 
     
    return {
        ...sharedData,
        couponId: sharedData.couponId || couponId
    };
};
module.exports = normalizeSharedCoupon;