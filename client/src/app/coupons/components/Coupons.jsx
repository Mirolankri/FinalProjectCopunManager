import React from 'react'
import CouponCard from './CouponCard'

const Coupons = ({coupons, onDelete, onEdit, onShare}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {coupons.map(coupon => (
            <CouponCard
                key={coupon._id}
                coupon={coupon}
                onDelete={onDelete}
                onEdit={onEdit}
                onShare={onShare}
            />
        ))}
    </div>
  )
}

export default Coupons