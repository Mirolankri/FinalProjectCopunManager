'use client'
import React, { useEffect, useState } from 'react'
import Container from '@/app/components/Elements/Container/Index'
import Form from '@/app/components/Elements/Forms/components/Form'
import Input from '@/app/components/Elements/Forms/components/Input/Input';
import { EnvelopeIcon, LockClosedIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import useForm from '@/hooks/forms/useForm';
import { useUser } from '@/app/components/providers/UserProvider';
import useUsers from '@/hooks/users/useUsers';
import initialRegisterForm from '@/app/auth/helpers/initialForms/initialRegisterForm';
import registerSchema from '@/app/auth/helpers/models/joi/RegisterSchema';
import initialCouponAdd from '../helpers/initialForms/initialCouponAdd';
import CouponAddSchema from '../models/joi/CouponAddSchema';
import TextArea from '@/app/components/Elements/Forms/components/TextArea/TextArea';
import useCoupon from '../hooks/useCoupon';
import Spinner from '@/app/components/Elements/Spinner/Spinner';
import normalizeCoupon from '../helpers/normalization/normalizeCoupon';

export default function CouponAddOrEdit({OnSubmitCoupon, coupon=null, type}) {
  const { user } = useUser();
  const { value, handleChange, handleReset, validateForm, onSubmit,setData } = useForm(
    initialCouponAdd,
    CouponAddSchema,
    ()=>{
      if(type === 'edit') {
        OnSubmitCoupon(coupon._id, value.data)
      } else {
        OnSubmitCoupon(value.data)
      }
    }
  );
  useEffect(() => {
    if (coupon && type === 'edit') {      
      const normalizedCoupon = normalizeCoupon(coupon);
      setData(normalizedCoupon);
    }
  }, []);
  
  return (
    <Container>
      <Form 
      title="" 
      SubmitButtonName={type === 'edit' ? 'עדכון' : 'הוספה'} 
      onSubmit={onSubmit} 
      spacing={2}
      onReset={handleReset}
      onChange={validateForm}
      >
        <Input 
          variant="default"
          type="text"
          name="code"
          label="קוד שובר"
          required
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<LockClosedIcon />}
          colSpan={2}

        />
        <Input 
          variant="default"
          type="text"
          name="name"
          label="שם השובר"
          required
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<UserIcon />}
        />
        <Input 
          variant="default"
          type="text"
          name="store"
          label="שם החנות"
          required
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<UserIcon />}

        />
        <Input 
          variant="default"
          type="text"
          name="website"
          label="אתר"
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<UserIcon />}

        />
        <Input 
          variant="default"
          type="text"
          name="category"
          label="קטגוריה"
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<PhoneIcon />}

        />
        <Input 
          variant="default"
          type="text"
          name="amount"
          label="סכום השובר"
          required
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<PhoneIcon />}

        />
        <Input 
          variant="default"
          type="text"
          name="discount"
          label="הנחה"          
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<LockClosedIcon />}
        />
        <Input 
          variant="default"
          type="date"
          name="expiryDate"
          label="תאריך תפוגה"          
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<LockClosedIcon />}
        />
        <TextArea 
          name="description"
          label="תיאור"          
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<LockClosedIcon />}
          colSpan={2}
        />
        {type === 'edit' && (
          <>
          סמן כשומש
          </>
          )}
      </Form>
      
    </Container>
  )
}
