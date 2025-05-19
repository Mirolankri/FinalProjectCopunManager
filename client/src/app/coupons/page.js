'use client'
import React, { useEffect } from 'react'
import CouponPage from './Page/CouponPage'
import useCoupon from './hooks/useCoupon';
import { useUser } from '@/app/components/providers/UserProvider';
import { useRouter } from 'next/navigation';
import Button from '../components/Elements/Button/Index';
import { PlusIcon } from '@heroicons/react/24/outline';
import ToolTip from '../components/Elements/ToolTip/Index';
import { useModal } from '@/providers/ModalProvider/ModalProvider';
import CouponAddOrEdit from './components/CouponAddOrEdit';

export default function Coupons() {
  const {user} = useUser();
  const router = useRouter();
  const {setModal} = useModal();
  const { value:{ isLoading, coupons,coupon, error }, handleGetCoupons, handleCreateCoupon, handleDeleteCoupon,handleUpdateCoupon,handleShareCoupon } = useCoupon();

  useEffect(() => {
    handleGetCoupons();
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
  
  // if (!user) return router.push('/auth/login');
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/auth/login');
  //   }
  // }, [user]);

  return (
    <>

    <CouponPage
    isLoading={isLoading}
    coupons={coupons}
    onDelete={OnDeleteCoupon}
    error={error}
    onEdit={(coupon) => {
      setModal('עריכת קופון', <CouponAddOrEdit type="edit" OnSubmitCoupon={OnUpdateCoupon} coupon={coupon}/>)
    }}
    onShare={OnShareCoupon}
 />
 <div className="fixed start-6 bottom-6 group">
 <ToolTip tip="הוסף קופון חדש">
  <Button onClick={() => setModal('הוספת קופון חדש', <CouponAddOrEdit type="add" OnSubmitCoupon={OnCreateCoupon}/>)} variant="circle">
    <PlusIcon className="size-7 transition-transform group-hover:rotate-45" />
  </Button>
 </ToolTip>
 </div>
  
    </>
  )
}
