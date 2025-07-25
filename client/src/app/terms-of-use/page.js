"use client"

import React from 'react'

const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
        <h1 className="text-3xl font-bold text-white text-center">
              תנאי שימוש
            </h1>
            <p className="text-green-100 text-center mt-2">
              CouPoint - מערכת ניהול קופונים ושוברים
            </p>
          </div>

          <div className="px-6 py-8 space-y-8">
          <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>עדכון אחרון:</strong> {new Date().toLocaleDateString('he-IL')}
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                הסכמה לתנאים
              </h2>
              <p className="text-gray-700 leading-relaxed">
                ברוכים הבאים למערכת CouPoint! תנאי שימוש אלה מהווים הסכם משפטי מלא בינכם לבין CouPoint. 
                שימוש במערכת מהווה הסכמה מלאה לתנאים אלה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                תיאור השירות
              </h2>
              <p className="text-gray-700 mb-4">
                CouPoint היא מערכת דיגיטלית לניהול קופונים ושוברים המאפשרת:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>שמירה וארגון של קופונים ושוברים דיגיטליים</li>
                <li>מעקב אחר תאריכי תפוגה והתראות מתקדמות</li>
                <li>קטגוריזציה ותיגוג של קופונים</li>
                <li>חיפוש וסינון מתקדם</li>
                <li>שיתוף קופונים עם חברים ומשפחה</li>
                <li>דשבורד אישי עם סטטיסטיקות והמלצות</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                דרישות הרשמה וחשבון
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">תנאי הרשמה</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>גיל מינימלי 16 שנים</li>
                    <li>מתן מידע אמתי, מדויק ומעודכן</li>
                    <li>כתובת דואר אלקטרוני תקפה</li>
                    <li>אימות כתובת הדואר האלקטרוני</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">אחריות המשתמש</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>שמירה על סודיות פרטי ההתחברות</li>
                    <li>אחריות לעדכון מידע אישי במידת הצורך</li>
                    <li>הודעה מיידית על שימוש לא מורשה בחשבון</li>
                    <li>שימוש במערכת בהתאם לחוק ולתנאים אלה</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                שימוש מותר ואסור
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 mb-3">שימוש מותר ✓</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
                    <li>שמירת קופונים אישיים</li>
                    <li>שיתוף עם חברים ומשפחה</li>
                    <li>יצירת קטגוריות ותגים</li>
                    <li>שימוש במודולי החיפוש</li>
                    <li>קבלת התראות תפוגה</li>
                    <li>יצוא נתונים אישיים</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-red-800 mb-3">שימוש אסור ✗</h3>
                  <ul className="list-disc list-inside text-red-700 space-y-1 text-sm">
                    <li>שיתוף פרטי התחברות עם אחרים</li>
                    <li>שימוש בבוטים או תוכנות אוטומטיות</li>
                    <li>ניסיון לפרוץ או לעקוף את המערכת</li>
                    <li>העלאת תוכן פוגעני או לא חוקי</li>
                    <li>שימוש למטרות מסחריות ללא אישור</li>
                    <li>הפרת זכויות יוצרים של אחרים</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                הגבלת אחריות
              </h2>
              <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded">
                <p className="text-yellow-700">
                  השירות ניתן "AS IS" ללא אחריות משפטית לזמינות, דיוק או התאמה למטרה מסוימת. 
                  CouPoint לא תישא באחריות לנזקים ישירים או עקיפים הנובעים משימוש במערכת.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                ביטול חשבון
              </h2>
              <p className="text-gray-700">
                אנו שומרים לעצמנו את הזכות לבטל או להשעות חשבונות במקרה של הפרת תנאי השימוש. 
                המשתמש יכול לבטל את חשבונו בכל עת דרך הגדרות החשבון.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                שינויים בתנאים
              </h2>
              <p className="text-gray-700">
                אנו עשויים לעדכן תנאי שימוש אלה מעת לעת. שינויים מהותיים יובאו לידיעתכם 
                באמצעות הודעה במערכת או בדואר אלקטרוני.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                יצירת קשר
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  לשאלות בנושא תנאי השימוש, אנא פנו אלינו:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>דואר אלקטרוני:</strong> support@coupoint.com</p>
                </div>
              </div>
            </section>

            <section className="border-t-2 border-gray-200 pt-6">
              <div className="text-center text-gray-600">
                <p className="mb-2">
                  תנאי שימוש אלה נכנסו לתוקף ב-{new Date().toLocaleDateString('he-IL')}
                </p>
                <p className="text-sm">
                  © 2025 CouPoint. כל הזכויות שמורות.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfUsePage
