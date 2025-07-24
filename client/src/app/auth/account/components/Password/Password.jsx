import React, { useState } from 'react'
import initialChangePassworf from '@/app/auth/helpers/initialForms/initialChangePassworf'
import ChangePasswordSchema from '@/app/auth/helpers/models/joi/ChangePasswordSchema'
import Form from '@/app/components/Elements/Forms/components/Form'
import Input from '@/app/components/Elements/Forms/components/Input/Input'
import { Button } from '@/components/ui/button'
import useForm from '@/hooks/forms/useForm'
import { Lock, LockKeyhole } from 'lucide-react'
import AuthService from '@/app/auth/services/apiService'
import { useAlert } from '@/providers/AlertProvider/AlertProvider'

const apiService = new AuthService()
export const Password = ({userData}) => {
        const AlertInstance = useAlert();
    
    const [EditPassword, setEditPassword] = useState(false)
    
    const { value, handleChange, handleReset, validateForm, onSubmit,setData } = useForm(
        initialChangePassworf,
        ChangePasswordSchema,
        async()=>{
            try {
                await apiService.UpdateUserPassword({userId: userData._id, _body: value.data})
                setEditPassword(false)
                AlertInstance("SUCCESS", "סיסמא עודכנה בהצלחה");

            } catch (error) {
                console.log(error)
                setEditPassword(false)
                AlertInstance("ERROR", error.response.data);

            }
        }
    );
    
    const getPasswordMismatch = () => {
        const { password, verifyPassword } = value.data;
        return password && verifyPassword && password !== verifyPassword;
    };
    
    const validateFormWithPasswordMatch = () => {
        const formErrors = validateForm();
        const passwordMismatch = getPasswordMismatch();
        return formErrors || passwordMismatch;
    };
  const handleCancelEdit = () => {
    setEditPassword(false)
    handleReset()
  }

    
  return (
    <>
    {EditPassword ? (
        <>
        <Form
        title=""
        SubmitButtonName='שינוי סיסמא' 
        ResetButtonName='ביטול'
        onSubmit={onSubmit} 
        spacing={2}
        onReset={EditPassword ? handleCancelEdit : null}
        onChange={validateFormWithPasswordMatch}
        >
            <Input 
            variant="default"
            type="password"
            name="password"
            label="סיסמא"
            required
            autoComplete="off"
            onChange={handleChange}
            data={value.data}
            error={value.errors}
            Icon={<Lock />}

            />
            <Input 
            variant="default"
            type={'password'}
            name={'verifyPassword'}
            label="אימות סיסמא"
            required
            autoComplete="off"
            onChange={handleChange}
            data={value.data}
            error={value.errors}
            Icon={<LockKeyhole />}
            />
            {getPasswordMismatch() && (
                <div className="col-span-2 text-sm text-red-400 mt-1">
                    הסיסמאות אינן תואמות
                </div>
            )}
        </Form>
        </>):(<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">********</dd>)
    }
    {EditPassword === false && <Button variant="outline" onClick={() => setEditPassword(true)}>שינוי סיסמא</Button>}
    </>
  )
}

