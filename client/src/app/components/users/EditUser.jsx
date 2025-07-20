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
import mapUser from '@/app/auth/helpers/normalization/mapUser';
import { useModal } from '@/providers/ModalProvider/ModalProvider';

const { password, ...rest } = registerSchema;

export default function EditUser({userData,onEditUser}) {
  const { user } = useUser();
  const {closeModal} = useModal()
  const { handleUpdateUser,handleGetMyUsers,value: { isLoading, error } } = useUsers();

  const { value, handleChange, handleReset, validateForm, onSubmit, setData } = useForm(
    initialRegisterForm,
    rest,
    async()=>{
      await onEditUser(userData._id,value.data)
      closeModal()
    }
  );

  useEffect(() => {
    if (userData) {
        const MapUserData = mapUser(userData);
      setData(MapUserData);
    }
  }, [userData]);
  
  return (
    <Container className={`sm:max-w-2xl`}>
      <Form 
      title="עריכת משתמש" 
      SubmitButtonName='עדכון' 
      onSubmit={onSubmit} 
      spacing={2}
      onReset={null}
      onChange={validateForm}
      >
        <Input 
          variant="default"
          type="text"
          name="first"
          label="שם פרטי"
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
          name="last"
          label="שם משפחה"
          required
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<UserIcon />}

        />
        <Input 
          variant="default"
          type="tel"
          name="phone"
          label="מספר טלפון"
          required
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<PhoneIcon />}

        />
        <Input 
          variant="default"
          type="email"
          name="email"
          label="כתובת אימייל"
          required
          autoComplete="off"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<EnvelopeIcon />}

        />
        {/* <Input 
          variant="default"
          type="password"
          name="password"
          label="סיסמא"
          required
          autoComplete="password"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<LockClosedIcon />}
          colSpan={2}

        /> */}
      </Form>

    </Container>
  )
}
