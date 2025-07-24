'use client'
import React, { useEffect, Suspense } from 'react'
import CouponPage from './Page/CouponPage'
import useCoupon from './hooks/useCoupon';
import { useUser } from '@/app/components/providers/UserProvider';
import { useRouter } from 'next/navigation';
import Button from '../components/Elements/Button/Index';
import { PlusIcon } from '@heroicons/react/24/outline';
import ToolTip from '../components/Elements/ToolTip/Index';
import { useModal } from '@/providers/ModalProvider/ModalProvider';
import CouponAddOrEdit from './components/CouponAddOrEdit';
import useCompanies from './hooks/useCompanies';
import Spinner from '../components/Elements/Spinner/Spinner';
import useCategories from './hooks/useCategories';

function CouponsContent() {
  const {user} = useUser();
  const router = useRouter();
  const {setModal} = useModal();
  const { value:{ isLoading, coupons,coupon, error, filteredCoupons }, handleGetCoupons, handleCreateCoupon, handleDeleteCoupon,handleUpdateCoupon,handleShareCoupon,handleMarkUsed_UnUsed,handleMarkFavorite_UnFavorite } = useCoupon();
  const { value:{ isLoading:isLoadingCompanies, companies, company, error:companiesError }, handleGetCompanies } = useCompanies();
  const { value:{ isLoading:isLoadingCategories, categories, category, error:categoriesError }, handleGetCategories } = useCategories();
  
  useEffect(() => {
    const GetData = async () => {
      await handleGetCompanies();
      await handleGetCategories();
      await handleGetCoupons();
    }
    GetData();
  }, []);

  const OnCreateCoupon = async (coupon) => {
    await handleCreateCoupon(coupon);
    await handleGetCoupons();
  }
  const OnDeleteCoupon = async (couponId) => {
    await handleDeleteCoupon(couponId);
    await handleGetCoupons();
  }
  const OnUpdateCoupon = async (couponId,coupon) => {    
    await handleUpdateCoupon(couponId, coupon);
    await handleGetCoupons();
  }
  const OnShareCoupon = async (couponId,sharedData) => {
    const sharedCoupon = await handleShareCoupon(couponId,sharedData);
    await handleGetCoupons();
    return sharedCoupon;
  }
  const OnMarkUsed_UnUsed = async (couponId) => {
    await handleMarkUsed_UnUsed(couponId);
  }
  const OnFavorite = async (couponId) => {
    await handleMarkFavorite_UnFavorite(couponId);
  }  
  if(!companies || !categories) return <Spinner />;
  return (
    <>
      <CouponPage
        isLoading={isLoading}
        coupons={filteredCoupons || coupons}
        onDelete={OnDeleteCoupon}
        error={error}
        onEdit={(coupon) => {
          setModal('עריכת קופון', <CouponAddOrEdit type="edit" categories={categories} companies={companies} OnSubmitCoupon={OnUpdateCoupon} coupon={coupon}/>)
        }}
        onShare={OnShareCoupon}
        companies={companies}
        categories={categories}
        onMarkUsed_UnUsed={OnMarkUsed_UnUsed}
        onFavorite={OnFavorite}
    />
  <div className="fixed start-6 bottom-6 group">
    <ToolTip tip="הוספת קופון חדש">
      <Button onClick={() => setModal('הוספת קופון חדש', <CouponAddOrEdit type="add" categories={categories} companies={companies} OnSubmitCoupon={OnCreateCoupon}/>)} variant="circle">
        <PlusIcon className="size-7 transition-transform group-hover:rotate-45" />
      </Button>
    </ToolTip>
  </div>
    </>
  )
}

export default function Coupons() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    }>
      <CouponsContent />
    </Suspense>
  );
}
