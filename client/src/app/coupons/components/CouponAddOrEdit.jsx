'use client'
import React, { useEffect, useState } from 'react'
import Container from '@/app/components/Elements/Container/Index'
import Form from '@/app/components/Elements/Forms/components/Form'
import Input from '@/app/components/Elements/Forms/components/Input/Input';
import useForm from '@/hooks/forms/useForm';
import { useUser } from '@/app/components/providers/UserProvider';
import initialCouponAdd from '../helpers/initialForms/initialCouponAdd';
import CouponAddSchema from '../models/joi/CouponAddSchema';
import TextArea from '@/app/components/Elements/Forms/components/TextArea/TextArea';
import Spinner from '@/app/components/Elements/Spinner/Spinner';
import normalizeCoupon from '../helpers/normalization/normalizeCoupon';
import { Banknote, Barcode, BarcodeIcon, CalendarCheck, ChartColumnStacked, Globe, LetterText, Percent, TicketPercent } from 'lucide-react';
import { SelectSearch } from '@/app/components/Elements/Forms/components/Select/SelectSearch';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CouponAddOrEdit({OnSubmitCoupon, coupon=null, type,companies,categories}) {
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
  if(!companies || !categories) return <Spinner />;
  
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
          Icon={<Barcode />}
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
          Icon={<TicketPercent />}
          
        />
        <SelectSearch 
          options={companies}
          value={value.data.store}
          onChange={(value, name) => handleChange({target: {value, name}})}
          placeholder="בחר חנות"
          searchPlaceholder="חפש חנות..."
          emptyMessage="לא נמצאו חנות"
          Icon={<ChartColumnStacked />}
          name="store"
          className="w-full"
          label={'חברה'}
          required={true}
          allowCustomInput={true}
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
          Icon={<Globe />}

        />
        
        <SelectSearch 
          options={categories}
          value={value.data.category}
          onChange={(value, name) => handleChange({target: {value, name}})}
          placeholder="בחר קטגוריה"
          searchPlaceholder="חפש קטגוריה..."
          emptyMessage="לא נמצאו קטגוריות"
          Icon={<ChartColumnStacked />}
          name="category"
          className="w-full"
          label={'קטגוריה'}
          required={true}
          allowCustomInput={true}
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
          Icon={<Banknote />}

        />
        <Input 
          variant="default"
          type="text"
          name="discount"
          label="הנחה"          
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<Percent />}
        />
        <Input 
          variant="default"
          type="date"
          name="expiryDate"
          label="תאריך תפוגה"          
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<CalendarCheck />}
        />
        <TextArea 
          name="description"
          label="תיאור"          
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<LetterText />}
          colSpan={2}
        />
        {type === 'edit' && (
          <div className="flex items-center space-x-2">
          <Checkbox
              id="used"
              checked={value.data.used}
              onCheckedChange={(checked) => {
                return checked
                  ? handleChange({target: {value: true, name: 'used'}})
                  : handleChange({target: {value: false, name: 'used'}})
              }}
            />
          <Label htmlFor="used">סמן קופון כמומש</Label>
        </div>
          )}
      </Form>
      
    </Container>
  )
}