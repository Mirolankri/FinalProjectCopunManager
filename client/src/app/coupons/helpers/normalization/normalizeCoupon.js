const normalizeCoupon = (coupon) => {
    return {
        name: coupon.name,
        code: coupon.code,
        store: coupon.store,
        category: coupon.category,
        description: coupon.description,
        amount: coupon.amount,
        discount: coupon.discount,
        used: coupon.used,
        website: coupon.website,
        expiryDate: coupon.expiryDate
    }
}

export default normalizeCoupon;