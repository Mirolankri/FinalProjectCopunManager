import React, { useEffect, useState } from 'react'
import Input from '@/app/components/Elements/Forms/components/Input/Input';
import useForm from '@/hooks/forms/useForm';
import { useModal } from '@/providers/ModalProvider/ModalProvider';
import initialSharedCoupon from '../helpers/initialForms/initialSharedCoupon';
import CouponSharedSchema from '../models/joi/CouponSharedSchema';
import Form from '@/app/components/Elements/Forms/components/Form';
import CouponShareList from './CouponShareList';
import { Share2 } from 'lucide-react';

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
                handleReset();
            }
        }
    )
    
    
  return (
    <div className="flex flex-col gap-1 text-center">
        <div className="flex items-center justify-center">
            <Share2 className="size-12 text-blue-500"/>
        </div>
        <div className='text-lg'>הינך עומד לשתף את הקופון {coupon?.name}?</div>
        <div className='text-lg'> על סך {coupon.amount}</div>
        <div>
            <Form 
            title="" 
            SubmitButtonName="שיתוף" 
            onSubmit={onSubmit} 
            spacing={1}
            onReset={handleReset}
            onChange={validateForm}
            className="p-0"
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
            Icon={<Share2 className="size-5" />}
            colSpan={1}
            />
            </Form>
        </div>
        {localCoupon.sharedCoupons.length > 0 ? <CouponShareList sharedCoupons={localCoupon.sharedCoupons} />:"לא נמצאו שיתופים"}
    </div>
  )
}

export default CouponShare