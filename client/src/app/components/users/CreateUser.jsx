'use client'
import React, { useEffect, useState } from 'react'
import Container from '@/app/components/Elements/Container/Index'
import Form from '@/app/components/Elements/Forms/components/Form'
import Input from '@/app/components/Elements/Forms/components/Input/Input';
import { EnvelopeIcon, LockClosedIcon, PhoneIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import useForm from '@/hooks/forms/useForm';
import { useUser } from '@/app/components/providers/UserProvider';
import useUsers from '@/hooks/users/useUsers';
import initialRegisterForm from '@/app/auth/helpers/initialForms/initialRegisterForm';
import registerSchema from '@/app/auth/helpers/models/joi/RegisterSchema';
import { useModal } from '@/providers/ModalProvider/ModalProvider';
import { Button } from '@/components/ui/button';
import { generateRandomPassword } from '@/helpers/Password/PasswordHelpers';
import ToolTip from '../Elements/ToolTip/Index';
import { copyToClipboard } from '@/helpers/Clipboard/copyToClipboard';
import { useAlert } from '@/providers/AlertProvider/AlertProvider';

export default function CreateUser({onCreateUser}) {
  const { user } = useUser();
  const {closeModal} = useModal()
  const AlertInstance = useAlert();
  const { value: { isLoading, error } } = useUsers();

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(8);
    handleChange({ target: { name: 'password', value: newPassword } });
    // setData(prev => ({ ...prev, password: newPassword }));
    copyToClipboard(newPassword,AlertInstance)
  };

  const { value, handleChange, validateForm, onSubmit, setData } = useForm(
    initialRegisterForm,
    registerSchema,
    async()=>{
      await onCreateUser(value.data)
    }
  );
  
  return (
    <Container className={`sm:max-w-2xl`}>
      <Form 
      title="יצירת משתמש" 
      SubmitButtonName='יצירה' 
      onSubmit={onSubmit} 
      spacing={2}
      onReset={null}
      onChange={validateForm}
      className=""
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
        <div className="col-span-2 space-y-2">
          <div className="flex gap-2">
            
              <Input 
                variant="default"
                type="text"
                name="password"
                label="סיסמא"
                required
                onChange={handleChange}
                data={value.data}
                error={value.errors}
                Icon={<LockClosedIcon />}
                colSpan={2}
              />
            
            <div className="flex items-end">
              <ToolTip tip="בחירת סיסמא אקראית">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleGeneratePassword}
                className="h-10 w-10"
                title="בחירת סיסמא אקראית"
              >
                <KeyIcon className="h-4 w-4" />
              </Button>
              </ToolTip>
            </div>
          </div>
        </div>
      </Form>

    </Container>
  )
}
