"use client";
import React, { useState } from "react";
import {
  EnvelopeIcon,
  MapPinIcon,
  PaperClipIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Input from "../components/Elements/Forms/components/Input/Input";
import TextArea from "../components/Elements/Forms/components/TextArea/TextArea";
import Button from "../components/Elements/Button/Index";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await SendEmail({
        to: "support@example.com", // החלף לכתובת המייל הרצויה
        subject: `פנייה חדשה מ-${formData.name}: ${formData.subject}`,
        body: `
          שם: ${formData.name}
          אימייל: ${formData.email}
          נושא: ${formData.subject}
          
          הודעה:
          ${formData.message}
        `,
      });

      toast({
        description: "פנייתך התקבלה בהצלחה. נחזור אליך בהקדם.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        description: "אירעה שגיאה בשליחת הפנייה. אנא נסה שוב מאוחר יותר.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">צור קשר</h1>
          <p className="text-xl text-gray-600">
            יש לך שאלה? נשמח לעזור! מלא את הטופס ונחזור אליך בהקדם
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">אימייל</h3>
                <p className="text-gray-600 text-sm">support@Coupoint.me</p>
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

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">כתובת</h3>
                <p className="text-gray-600 text-sm">רחוב הברזל 1, תל אביב</p>
                <p className="text-gray-500 text-sm mt-1">קומה 4,משרד 405</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">שם מלא</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={[]}
                required
                placeholder="הכנס את שמך המלא"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">אימייל</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={[]}
                required
                placeholder="הכנס את כתובת האימייל שלך"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">נושא הפנייה</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={[]}
                required
                placeholder="נושא הפנייה"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">תוכן הפנייה</label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={[]}
                required
                placeholder="כתוב את הודעתך כאן..."
                className="min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white ml-2"></div>
                  שולח...
                </>
              ) : (
                <>
                  <PaperClipIcon className="w-4 h-4 ml-2" />
                  שלח הודעה
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
