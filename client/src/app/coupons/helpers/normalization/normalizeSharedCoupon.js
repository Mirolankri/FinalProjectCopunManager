const normalizeSharedCoupon = (coupon) => {
    return {
        shareName: coupon.shareName,
        expiryDate: coupon.expiryDate
    }
}

export default normalizeSharedCoupon;