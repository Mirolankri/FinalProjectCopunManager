'use client'
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from '@/app/components/Elements/Container/Index'
import Form from '@/app/components/Elements/Forms/components/Form'
import Input from '@/app/components/Elements/Forms/components/Input/Input';
import { LockClosedIcon, PhoneIcon } from '@heroicons/react/24/outline';
import useForm from '@/hooks/forms/useForm';
import initialLoginForm from '../helpers/initialForms/initialLoginForm';
import loginSchema from '../helpers/models/joi/loginSchema';
import { useUser } from '@/app/components/providers/UserProvider';
import useUsers from '@/hooks/users/useUsers';

export default function Login() {
  const { user,loading } = useUser();
  const router = useRouter();
  
  const { handleLogin,value: { isLoading, error } } = useUsers();


  const { value, handleChange, handleReset, validateForm, onSubmit } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  if (user) return null;
  
  return (
    <Container className={`sm:max-w-sm`}>
      <Form 
      title="התחברות" 
      SubmitButtonName='התחברות' 
      onSubmit={onSubmit} 
      spacing={1}
      onReset={null}
      onChange={validateForm}
      >
        <Input 
          variant="default"
          type="tel"
          name="phone"
          label="מספר טלפון"
          required
          autoComplete="tel"
          onChange={handleChange}
          data={value.data}
          error={value.errors}
          Icon={<PhoneIcon />}

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

        />
      </Form>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
            אין לך חשבון?{' '}
            <Link href="/auth/register" className="font-semibold text-gray-600 hover:text-gray-500">
              הרשם
            </Link>
          </p>
    </Container>
  )
}
