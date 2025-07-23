'use client'
import React, { use, useEffect } from 'react'
import useCoupon from "../../hooks/useCoupon"
import CouponPage from '../../Page/CouponPage';
import useCompanies from '../../hooks/useCompanies';
import useCategories from '../../hooks/useCategories';

export default function CouponSharePage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const {value:{coupons,coupon,isLoading,error},handleGetCoupon,handleShareCoupon,handleMarkUsed_UnUsed,handleMarkFavorite_UnFavorite} = useCoupon()
  const { value:{ isLoading:isLoadingCompanies, companies, company, error:companiesError }, handleGetCompanies } = useCompanies();
  const { value:{ isLoading:isLoadingCategories, categories, category, error:categoriesError }, handleGetCategories } = useCategories();

  const OnShareCoupon = async (couponId,sharedData) => {
    const sharedCoupon = await handleShareCoupon(couponId,sharedData);
    await handleGetCoupon(id);
    return sharedCoupon;
  }
  const OnMarkUsed_UnUsed = async (couponId) => {
    await handleMarkUsed_UnUsed(couponId);
    await handleGetCoupon(id);
  }
  const OnFavorite = async (couponId) => {
    await handleMarkFavorite_UnFavorite(couponId);
    await handleGetCoupon(id);
  }  

    useEffect(() => {
      const GetData = async () => {
        await handleGetCompanies();
        await handleGetCategories();
        await handleGetCoupon(id);
      }
      GetData();      
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
          onMarkUsed_UnUsed={OnMarkUsed_UnUsed}
          onFavorite={OnFavorite}
        />
    )
  }