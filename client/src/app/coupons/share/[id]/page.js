'use client'
import React, { use, useEffect } from 'react'
import useCoupon from "../../hooks/useCoupon"
import CouponPage from '../../Page/CouponPage';

export default function CouponSharePage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const {value:{coupons,coupon,isLoading,error},handleGetCoupon} = useCoupon()
    useEffect(() => {
        handleGetCoupon(id)
    }, [id])
  
    return (
      <CouponPage
          isLoading={isLoading}
          coupons={coupons}
          onDelete={() => {}}
          error={error}
          onEdit={() => {}}
          onShare={() => {}}
       />
    )
  }