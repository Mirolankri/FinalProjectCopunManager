import { ChartBarIcon, CodeBracketIcon, DevicePhoneMobileIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">אודות האפליקציה</h1>
          <p className="text-xl text-gray-600">
            פלטפורמה מתקדמת לניהול וארגון שוברי מתנה וקופונים
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">הסיפור שלנו</h2>
            <p className="text-gray-600 leading-relaxed">
              האפליקציה נוצרה מתוך הבנה שרבים מאיתנו מתמודדים עם אתגר ניהול השוברים והקופונים שברשותנו.
              ראינו כיצד שוברים יקרי ערך מתפספסים או פגים בתוקף, וכיצד אנשים מתקשים לעקוב אחר השוברים שברשותם.
              מתוך כך, פיתחנו פלטפורמה שמאפשרת ניהול קל, נוח ואינטואיטיבי של כל השוברים במקום אחד.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <UsersIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">המשתמשים שלנו</h3>
                <p className="text-gray-600">
                  אלפי משתמשים כבר נהנים מהיתרונות של ניהול שוברים חכם. 
                  מאנשים פרטיים ועד עסקים קטנים, כולם מוצאים ערך בפלטפורמה שלנו.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">אבטחה ופרטיות</h3>
                <p className="text-gray-600">
                  אנו מקפידים על אבטחת המידע שלך ברמה הגבוהה ביותר.
                  כל המידע מוצפן ומאובטח בסטנדרטים המחמירים ביותר.
                </p>
              </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">הטכנולוגיה שלנו</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CodeBracketIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">פיתוח מתקדם</h4>
                  <p className="text-gray-600 text-sm">
                    שימוש בטכנולוגיות החדשניות ביותר לחווית משתמש מושלמת
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DevicePhoneMobileIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">מותאם לנייד</h4>
                  <p className="text-gray-600 text-sm">
                    עיצוב רספונסיבי מלא לשימוש מושלם בכל מכשיר
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">ניהול מתקדם</h4>
                  <p className="text-gray-600 text-sm">
                    כלים חכמים לניהול וארגון השוברים שלך
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">המשימה שלנו</h2>
            <p className="text-gray-600 leading-relaxed">
              אנחנו מאמינים שניהול שוברים וקופונים צריך להיות פשוט, נוח ויעיל.
              המשימה שלנו היא לעזור לאנשים לנצל בצורה מיטבית את השוברים שברשותם,
              ולחסוך זמן וכסף בתהליך. אנחנו מתחייבים להמשיך ולפתח את הפלטפורמה
              בהתאם לצרכי המשתמשים שלנו.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
