'use client'
import React, { useState } from 'react'
import Container from '@/app/components/Elements/Container/Index'
import Form from '@/app/components/Elements/Forms/components/Form'
import Input from '@/app/components/Elements/Forms/components/Input/Input';
import { EnvelopeIcon, LockClosedIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import useForm from '@/hooks/forms/useForm';
import initialRegisterForm from '../helpers/initialForms/initialRegisterForm';
import registerSchema from '../helpers/models/joi/RegisterSchema';
import { useUser } from '@/app/components/providers/UserProvider';
import useUsers from '@/hooks/users/useUsers';

export default function Register() {
  const { user } = useUser();
  const { handleRegister,value: { isLoading, error } } = useUsers();

  const { value, handleChange, handleReset, validateForm, onSubmit } = useForm(
    initialRegisterForm,
    registerSchema,
    handleRegister
  );

  
  return (
    <Container>
      <Form 
      title="הרשמה" 
      SubmitButtonName='הרשמה' 
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
        <Input 
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

        />
      </Form>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
            יש לך חשבון?{' '}
            <Link href="/auth/login" className="font-semibold text-gray-600 hover:text-gray-500">
              התחבר
            </Link>
          </p>
    </Container>
  )
}
