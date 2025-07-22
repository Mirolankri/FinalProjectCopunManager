import React from 'react'
import CouponCard from './CouponCard'

const Coupons = ({view,coupons, onDelete, onEdit, onShare, companies, categories, onMarkUsed_UnUsed,onFavorite}) => {
  
  return (
    <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
        {coupons.map(coupon => (
            <CouponCard
                key={coupon._id}
                coupon={coupon}
                onDelete={onDelete}
                onEdit={onEdit}
                onShare={onShare}
                companies={companies}
                categories={categories}
                onMarkUsed_UnUsed={onMarkUsed_UnUsed}
                onFavorite={onFavorite}
            />
        ))}
    </div>
  )
}

export default Coupons