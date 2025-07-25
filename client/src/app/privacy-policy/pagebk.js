"use client"

import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              מדיניות פרטיות
            </h1>
            <p className="text-blue-100 text-center mt-2">
              CouPoint - מערכת ניהול קופונים ושוברים
            </p>
          </div>

          <div className="px-6 py-8 space-y-8">
            {/* עדכון אחרון */}
            <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>עדכון אחרון:</strong> {new Date().toLocaleDateString('he-IL')}
              </p>
            </div>

            {/* הקדמה */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                הקדמה
              </h2>
              <p className="text-gray-700 leading-relaxed">
                ברוכים הבאים למערכת CouPoint. אנו מחויבים להגנה על פרטיותכם ולשמירה על המידע האישי שלכם. 
                מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, משתפים ומגנים על המידע האישי שלכם 
                כאשר אתם משתמשים בשירותי CouPoint.
              </p>
            </section>

            {/* מידע שאנו אוספים */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                מידע שאנו אוספים
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">מידע אישי</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>שם מלא</li>
                    <li>כתובת דואר אלקטרוני</li>
                    <li>מספר טלפון</li>
                    <li>תאריך לידה (לצורך אימות גיל)</li>
                    <li>העדפות אישיות ותחומי עניין</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">מידע שימוש</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>פעילות במערכת (קופונים שנשמרו, חיפושים שבוצעו)</li>
                    <li>זמני כניסה ויציאה מהמערכת</li>
                    <li>מידע על המכשיר והדפדפן</li>
                    <li>כתובת IP וגיאולוקציה כללית</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">קופונים ושוברים</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>פרטי הקופונים והשוברים שאתם שומרים</li>
                    <li>תאריכי תפוגה וסטטוס השימוש</li>
                    <li>קטגוריות ותגיות שאתם מגדירים</li>
                    <li>הערות אישיות על קופונים</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* כיצד אנו משתמשים במידע */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                כיצד אנו משתמשים במידע
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>לספק ולשפר את שירותי CouPoint</li>
                <li>לנהל את החשבון שלכם ולאמת את זהותכם</li>
                <li>לשלוח התראות על קופונים שעומדים לפוג</li>
                <li>להתאים המלצות אישיות על קופונים ומבצעים</li>
                <li>לנתח דפוסי שימוש ולשפר את חוויית המשתמש</li>
                <li>לתמוך בכם ולענות על פניותיכם</li>
                <li>למנוע הונאות ולשמור על אבטחת המערכת</li>
                <li>לעמוד בדרישות חוקיות ורגולטוריות</li>
              </ul>
            </section>

            {/* שיתוף מידע */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                שיתוף מידע
              </h2>
              <p className="text-gray-700 mb-4">
                אנו לא מוכרים, משכירים או מעבירים את המידע האישי שלכם לצדדים שלישיים, 
                למעט במקרים הבאים:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>ספקי שירות:</strong> חברות שמסייעות לנו בהפעלת המערכת (אחסון, אבטחה, אנליטיקה)</li>
                <li><strong>דרישות חוקיות:</strong> כאשר נדרש על פי חוק או צו בית משפט</li>
                <li><strong>הגנה על זכויות:</strong> כדי להגן על הזכויות, הרכוש או הבטיחות שלנו או של אחרים</li>
                <li><strong>העברת עסק:</strong> במקרה של מיזוג, רכישה או מכירת נכסים</li>
              </ul>
            </section>

            {/* אבטחת מידע */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                אבטחת מידע
              </h2>
              <p className="text-gray-700 mb-4">
                אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע שלכם:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>הצפנת נתונים בזמן העברה ובמנוחה</li>
                <li>אימות דו-שלבי לחשבונות משתמשים</li>
                <li>גישה מוגבלת למידע על בסיס צורך לדעת</li>
                <li>ניטור רציף לאיתור פעילות חשודה</li>
                <li>גיבויים קבועים ותוכנית התאוששות מאסונות</li>
                <li>עדכונים אבטחה שוטפים</li>
              </ul>
            </section>

            {/* זכויותיכם */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                הזכויות שלכם
              </h2>
              <p className="text-gray-700 mb-4">
                בהתאם לחוק הגנת הפרטיות, יש לכם את הזכויות הבאות:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">זכות עיון</h4>
                  <p className="text-sm text-gray-600">לדעת איזה מידע אישי אנו מחזיקים עליכם</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">זכות תיקון</h4>
                  <p className="text-sm text-gray-600">לתקן מידע שגוי או לא מדויק</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">זכות מחיקה</h4>
                  <p className="text-sm text-gray-600">לבקש מחיקת המידע האישי שלכם</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">זכות הגבלה</h4>
                  <p className="text-sm text-gray-600">להגביל את השימוש במידע שלכם</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">זכות ניידות</h4>
                  <p className="text-sm text-gray-600">לקבל את המידע שלכם בפורמט נייד</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">זכות התנגדות</h4>
                  <p className="text-sm text-gray-600">להתנגד לעיבוד המידע שלכם</p>
                </div>
              </div>
            </section>

            {/* עוגיות */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                עוגיות (Cookies)
              </h2>
              <p className="text-gray-700 mb-4">
                אנו משתמשים בעוגיות כדי לשפר את חוויית השימוש שלכם:
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">עוגיות חיוניות</h4>
                  <p className="text-sm text-gray-600">נדרשות לתפקוד בסיסי של המערכת ולא ניתן לבטל אותן</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">עוגיות פונקציונליות</h4>
                  <p className="text-sm text-gray-600">שומרות על העדפותיכם ומשפרות את חוויית השימוש</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">עוגיות אנליטיות</h4>
                  <p className="text-sm text-gray-600">עוזרות לנו להבין כיצד אתם משתמשים במערכת</p>
                </div>
              </div>
            </section>

            {/* שמירת מידע */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                תקופת שמירת מידע
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>חשבון פעיל:</strong> כל עוד החשבון פעיל</li>
                <li><strong>חשבון לא פעיל:</strong> עד 3 שנים מהכניסה האחרונה</li>
                <li><strong>נתוני שימוש:</strong> עד 2 שנים לצורכי אנליטיקה</li>
                <li><strong>תקשורת:</strong> עד 5 שנים לצורכי תמיכה ומשפטיים</li>
                <li><strong>מידע פיננסי:</strong> בהתאם לדרישות החוק (עד 7 שנים)</li>
              </ul>
            </section>

            {/* קטינים */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                פרטיות קטינים
              </h2>
              <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded">
                <p className="text-gray-700">
                  שירותי CouPoint מיועדים לאנשים מעל גיל 16. אנו לא אוספים במודע מידע אישי 
                  מקטינים מתחת לגיל 16. אם התברר לנו שאספנו מידע כזה, נמחק אותו מיידית.
                </p>
              </div>
            </section>

            {/* שינויים במדיניות */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                שינויים במדיניות פרטיות
              </h2>
              <p className="text-gray-700">
                אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יובאו לידיעתכם 
                באמצעות הודעה במערכת או בדואר אלקטרוני. המשך השימוש במערכת לאחר השינויים 
                מהווה הסכמה למדיניות המעודכנת.
              </p>
            </section>

            {/* יצירת קשר */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                יצירת קשר
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  לשאלות, בקשות או תלונות בנושא פרטיות, אנא פנו אלינו:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>דואר אלקטרוני:</strong> privacy@coupoint.com</p>
                  <p><strong>טלפון:</strong> 03-1234567</p>
                  <p><strong>כתובת:</strong> רחוב הטכנולוגיה 1, תל אביב</p>
                  <p><strong>ממונה על הגנת הפרטיות:</strong> privacy-officer@coupoint.com</p>
                </div>
              </div>
            </section>

            {/* הצהרת סיום */}
            <section className="border-t-2 border-gray-200 pt-6">
              <div className="text-center text-gray-600">
                <p className="mb-2">
                  מדיניות פרטיות זו נכנסה לתוקף ב-{new Date().toLocaleDateString('he-IL')}
                </p>
                <p className="text-sm">
                  © 2024 CouPoint. כל הזכויות שמורות.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
