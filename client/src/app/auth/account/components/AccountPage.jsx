'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
import Button from '@/app/components/Elements/Button/Index'
import Input from '@/app/components/Elements/Forms/components/Input/Input'
import { EnvelopeIcon, PencilIcon, PencilSquareIcon, PhoneIcon, PlusIcon, UsersIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import useUsers from '@/hooks/users/useUsers'
import useForm from '@/hooks/forms/useForm'
import initialRegisterForm from '../../helpers/initialForms/initialRegisterForm'
import registerSchema from '../../helpers/models/joi/RegisterSchema'
import Form from '@/app/components/Elements/Forms/components/Form'
import mapUser from '../../helpers/normalization/mapUser'

const { password, ...rest } = registerSchema;
const AccountPage = ({userData}) => {
  const [EditMode, setEditMode] = useState(false)
  const { handleUpdateUser,value: { isLoading, error,user, users } } = useUsers();
  
  const { value, handleChange, handleReset, validateForm, onSubmit,setData } = useForm(
    initialRegisterForm,
    rest,
    ()=>{
      handleUpdateUser(userData._id,value.data)      
      setEditMode(false)
    }
  );
  const handleCancelEdit = () => {
    setEditMode(false)
  }
  useEffect(() => {
    if (EditMode) {
      const MapUserData = mapUser(userData);
      setData(MapUserData);
    }
  }, [EditMode, userData]);

  return (
    <Card>
          <CardHeader>
            <CardTitle>חשבון</CardTitle>
            <CardDescription>
              צפייה ועדכון הפרטים האישיים שלך
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between space-y-1 ">
              <div>
                <Button disabled={EditMode} variant="outline" className="flex items-center gap-2" onClick={() => setEditMode(true)}>
                  עריכת פרופיל
                  <PencilSquareIcon className="size-4"/>
                </Button> 
              </div>
              <div className='flex items-center gap-2'>
                <div>
                  <div>{userData.name.first} {userData.name.last}</div>
                  <div>{userData.phone}</div>
                </div>
                <div>                  
                  <Avatar className="size-15">
                    <AvatarImage src="/assets/images/rabbit.png" alt="User Profile" />
                    <AvatarFallback>
                      {userData.name.first[0] + userData.name.last[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
              </div>
            </div>
            <div className="mt-6 rtl-grid">
            <Form 
                  title="" 
                  SubmitButtonName='עדכון' 
                  ResetButtonName='ביטול'
                  onSubmit={onSubmit} 
                  spacing={2}
                  onReset={EditMode ? handleCancelEdit : null}
                  onChange={validateForm}
                  >
            
              <div className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">שם מלא</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {EditMode && (
                    <>
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
                      Icon={<UsersIcon />}
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
                      Icon={<UsersIcon />}
                    /></>
                  )}
                    {userData.name.first} {userData.name.last}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">טלפון</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {EditMode && (
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
                    )}
                  {userData.phone}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">כתובת דואל</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {EditMode && (
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
          
                  />)}
                  {userData.email}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">סיסמא</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">********</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">סוג משתמש</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{userData._id === userData.parentuserId ? 'משתמש ראשי':'משתמש משני'}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">סוג הרשאה</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.isAdmin ? 'מנהל' : 'משתמש'}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">חשבון נוצר בתאריך</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{format(new Date(userData.createdAt), "dd/MM/yyyy")}</dd>
                </div>
              </div>
            </Form>
            </div>
          </CardContent>
          <CardFooter className="items-start w-full">
            {EditMode && (
              <div className="flex gap-2 w-1/2">
                {/* <Button className={`bg-red-500 hover:bg-red-600`} onClick={() => setEditMode(false)}>ביטול</Button> */}
                {/* <Button >שמירת שינויים</Button> */}
              </div>
            )}
          </CardFooter>
        </Card>
  )
}

export default AccountPage