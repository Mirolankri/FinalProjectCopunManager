'use client'
import { motion, useInView } from "framer-motion";
import { useUser } from '@/app/components/providers/UserProvider';

import Button from "./components/Elements/Button/Index";
import Link from "next/link";
import { ArrowLeftIcon, ChartPieIcon, CheckIcon, GiftIcon, ShareIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";

export default function Home() {
    const {user} = useUser();
    const HeroRef = useRef(null);
    const HeroInView = useInView(HeroRef, { once: true, threshold: 0.1 });
    const FutureRef1 = useRef(null);
    const FutureInView1 = useInView(FutureRef1, { once: true, threshold: 0.1 });
    const FutureRef2 = useRef(null);
    const FutureInView2 = useInView(FutureRef2, { once: true, threshold: 0.1 });
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        ref={HeroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={HeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            נהל את כל השוברים והקופונים שלך במקום אחד
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            הדרך החכמה לארגן, לעקוב ולשתף את כל השוברים והקופונים שלך. 
            לעולם לא תפספס עוד שובר או תאריך תפוגה!
          </p>
          <div className="max-w-2xs mx-auto">
            <Link href={`${user ? '/coupons' : '/auth/login'}`}>
              <Button variant="outline" className="bg-white ">
                {user ? 'לקופונים שלי' : 'התחל עכשיו'}
                <ArrowLeftIcon className="mr-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">תכונות מרכזיות</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              ref={FutureRef1}
              initial={{ opacity: 0, y: 50 }}
              animate={FutureInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">אבטחה ופרטיות</h3>
              <p className="text-gray-600">
              אצלנו המידע שלך מוגן בהצפנה מקצה לקצה ובאמצעי אבטחה מתקדמים.
              פרטיותך חשובה לנו ואנו שומרים על סודיות מוחלטת.
              </p>
            </div>
            </motion.div>
            <motion.div
              ref={FutureRef1}
              initial={{ opacity: 0, y: 50 }}
              animate={FutureInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <GiftIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ניהול שוברים</h3>
              <p className="text-gray-600">
                נהל את כל השוברים והקופונים שלך במקום אחד. הוסף, ערוך ועקוב אחר תאריכי תפוגה בקלות.
              </p>
            </div>
            </motion.div>


            <motion.div
              ref={FutureRef2}
              initial={{ opacity: 0, y: 50 }}
              animate={FutureInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}

            >
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <ShareIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">שיתוף חכם</h3>
              <p className="text-gray-600">
                שתף שוברים עם משפחה וחברים בקלות. מערכת שיתוף מתקדמת עם אפשרות לאישור ומעקב.
              </p>
            </div>
            </motion.div>
            
            {/* <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <ChartPieIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">סטטיסטיקות וניתוח</h3>
              <p className="text-gray-600">
                קבל תובנות מעמיקות על השימוש בשוברים שלך, כולל נתונים על חסכון וניצול.
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">למה להשתמש באפליקציה?</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">לא תפספס אף שובר</h3>
                <p className="text-gray-600">
                  מערכת התראות חכמה תזכיר לך על שוברים שעומדים לפוג. תמיד תדע איזה שוברים עומדים לרשותך.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">שיתוף קל ונוח</h3>
                <p className="text-gray-600">
                  שתף שוברים עם משפחה וחברים בלחיצת כפתור. מערכת השיתוף המתקדמת מאפשרת לך לעקוב אחר השוברים ששיתפת.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">ארגון וסדר</h3>
                <p className="text-gray-600">
                  כל השוברים מאורגנים בצורה נוחה וברורה. חיפוש, סינון וקטגוריות עוזרים לך למצוא בדיוק את מה שאתה צריך.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">מוכן להתחיל?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            הצטרף לאלף משתמשים שכבר מנהלים את השוברים שלהם בצורה חכמה יותר
          </p>
          <div className="max-w-2xs mx-auto">
            <Link href={`${user ? '/coupons' : '/auth/login'}`}>
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                התחל להשתמש חינם
                <ArrowLeftIcon className="mr-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
      )}
      
    </div>
  );
}
