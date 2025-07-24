"use client";
import React, { useState,useRef } from "react";
import {
  EnvelopeIcon,
  MapPinIcon,
  PaperClipIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Input from "../components/Elements/Forms/components/Input/Input";
import TextArea from "../components/Elements/Forms/components/TextArea/TextArea";
import Button from "../components/Elements/Button/Index";
import useForm from "@/hooks/forms/useForm";
import Container from "../components/Elements/Container/Index";
import Form from "../components/Elements/Forms/components/Form";
import initialContactForm from "./helpers/initialForms/initialContactForm";
import ContactSchema from "./models/joi/ContactSchema";
import { Captions, LetterText, Mail, User } from "lucide-react";
import ContactService from "./services/apiService";
import { ErrorAlert } from "../components/Elements/Alert/ErrorAlert";
import { Confetti } from "@/components/animate-ui/confetti/confetti";
import Link from "next/link";

const contactService = new ContactService();
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const confettiRef = useRef(null);

  const HandleSubmit = async (data) => {
    setLoading(true);
    try {
      await contactService.Create(data);
      setIsCompleted(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const { value, handleChange, handleReset, validateForm, onSubmit,setData } = useForm(
    initialContactForm,
    ContactSchema,
    HandleSubmit
  );  
  return (
    <div className="container mx-auto px-4 py-12">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">צור קשר</h1>
        <p className="text-xl text-gray-600">
          יש לך שאלה? נשמח לעזור! מלא את הטופס ונחזור אליך בהקדם
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <EnvelopeIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">אימייל</h3>
              <p className="text-gray-600 text-sm">
                <Link href="mailto:support@Coupoint.me" className="text-blue-600 hover:underline">support@Coupoint.me</Link>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                זמן תגובה ממוצע: 24 שעות
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">טלפון</h3>
              <p className="text-gray-600 text-sm">054-2412241</p>
              <p className="text-gray-500 text-sm mt-1">א'-ה' | 9:00-17:00</p>
            </div>
          </div>
        </div>

        
      </div>
      
    
    {isCompleted ? (
      <Container className={`bg-white p-6 rounded-xl shadow-sm`}>
        <h2 className="text-2xl font-bold mb-4">הודעה נשלחה בהצלחה</h2>
        <p className="text-gray-600">תודה על פנייתך! נחזור אליך בהקדם.</p>
        <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
      </Container>
    ) : (
      <Container className={`bg-white p-6 rounded-xl shadow-sm`}>
        {error && <ErrorAlert message={error.message} />}
        <Form 
        title="" 
        className="p-6 space-y-6"
        SubmitButtonName={'שלח הודעה'} 
        onSubmit={onSubmit} 
        spacing={2}
        onReset={handleReset}
        onChange={validateForm}
        >
          <Input 
            variant="default"
            type="text"
            name="fullName"
            label="שם מלא"
            required
            onChange={handleChange}
            data={value.data}
            error={value.errors}
            Icon={<User />}
            colSpan={2}

          />
          <Input 
            variant="default"
            type="text"
            name="email"
            label="אימייל"
            required
            autoComplete="off"
            onChange={handleChange}
            data={value.data}
            error={value.errors}
            Icon={<Mail />}
            
          />
          <Input 
            variant="default"
            type="text"
            name="subject"
            label="נושא"
            autoComplete="off"
            onChange={handleChange}
            data={value.data}
            error={value.errors}
            Icon={<Captions />}

          />
          <TextArea 
            name="message"
            label="הודעה"          
            onChange={handleChange}
            data={value.data}
            error={value.errors}
            Icon={<LetterText />}
            colSpan={2}
          />
        </Form>
        
      </Container>
    )}
    </div>
    </div>
  );
}
