import Button from '@/app/components/Elements/Button/Index';
import Input from '@/app/components/Elements/Forms/components/Input/Input';
import useForm from '@/hooks/forms/useForm';
import { useModal } from '@/providers/ModalProvider/ModalProvider';
import { ShareIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import initialSharedCoupon from '../helpers/initialForms/initialSharedCoupon';
import CouponSharedSchema from '../models/joi/CouponSharedSchema';
import Form from '@/app/components/Elements/Forms/components/Form';
import CouponShareList from './CouponShareList';

const CouponShare = ({coupon, onShare}) => {
    const {closeModal} = useModal()
    const [localCoupon, setLocalCoupon] = useState(coupon);
    const { value, handleChange, handleReset, validateForm, onSubmit, setData } = useForm(
        initialSharedCoupon,
        CouponSharedSchema,
        async ()=>{
            const newSharedCoupon = await onShare(coupon._id,{...value.data})
            if (newSharedCoupon) {
                setLocalCoupon({
                    ...localCoupon,
                    sharedCoupons: [...localCoupon.sharedCoupons, newSharedCoupon],
                    totalSharedCoupons: localCoupon.totalSharedCoupons + 1
                });
                handleReset(); // איפוס הטופס לאחר שליחה
            }
        }
    )
    
    
  return (
    <div className="flex flex-col gap-6 text-center">
        <div className="flex items-center justify-center">
            <ShareIcon className="size-12 text-blue-500"/>
        </div>
        <p className='text-lg'>הינך עומד לשתף את הקופון {coupon.name}?</p>
        <p className='text-lg'> על סך {coupon.amount}</p>
        <div>
            <Form 
            title="" 
            SubmitButtonName="שיתוף" 
            onSubmit={onSubmit} 
            spacing={1}
            onReset={handleReset}
            onChange={validateForm}
            >
            <Input 
            label="שם לשיתוף"
            name="shareName"
            type="text"
            data={value.data}
            required={true}
            placeholder='שם, מספר טלפון, כתובת דוא״ל' 
            onChange={handleChange}
            error={value.errors}
            Icon={<ShareIcon className="size-5" />}
            colSpan={1}
            />
            </Form>
        </div>
        {localCoupon.sharedCoupons.length > 0 ? <CouponShareList sharedCoupons={localCoupon.sharedCoupons} />:"לא נמצאו שיתופים"}
    </div>
  )
}

export default CouponShare