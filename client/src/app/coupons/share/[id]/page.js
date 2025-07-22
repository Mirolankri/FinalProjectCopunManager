'use client'
import React, { use, useEffect } from 'react'
import useCoupon from "../../hooks/useCoupon"
import CouponPage from '../../Page/CouponPage';
import useCompanies from '../../hooks/useCompanies';
import useCategories from '../../hooks/useCategories';

export default function CouponSharePage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const {value:{coupons,coupon,isLoading,error},handleGetCoupon,handleShareCoupon} = useCoupon()
  const { value:{ isLoading:isLoadingCompanies, companies, company, error:companiesError }, handleGetCompanies } = useCompanies();
  const { value:{ isLoading:isLoadingCategories, categories, category, error:categoriesError }, handleGetCategories } = useCategories();

    const OnShareCoupon = async (couponId,sharedData) => {
    const sharedCoupon = await handleShareCoupon(couponId,sharedData);
    await handleGetCoupon(id);
    return sharedCoupon;
  }

    useEffect(() => {
      handleGetCompanies();
      handleGetCategories();
      handleGetCoupon(id)
    }, [id])
  
    return (
      <CouponPage
          isLoading={isLoading}
          coupons={coupons}
          onDelete={() => {}}
          error={error}
          onEdit={() => {}}
          onShare={OnShareCoupon}
          companies={companies}
          categories={categories}
       />
    )
  }