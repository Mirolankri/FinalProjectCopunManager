<style>*{direction: rtl}</style>
# מערכת ניהול קופונים ושוברים - CouPoint

## תיאור כללי של הפרויקט

מערכת ניהול קופונים ושוברים מתקדמת שפותחה כפרויקט גמר. המערכת מאפשרת למשתמשים לנהל, לארגן ולשתף את כל הקופונים והשוברים שלהם במקום אחד, תוך מעקב אחר תאריכי תפוגה ושיתוף עם אחרים.

### חזון הפרויקט
ליצור פלטפורמה מרכזית וידידותית למשתמש שפותרת בעיה אישית שלי  הבעיה של איבוד קופונים ושכחת תאריכי תפוגה, תוך מתן כלים מתקדמים לניהול ושיתוף.




## ארכיטקטורת המערכת

המערכת בנויה על ארכיטקטורת Full-Stack עם הפרדה בין Client ו-Server:

### Frontend (Client)
- **טכנולוגיה**: Next.js 15.3.1 עם React 19
- **עיצוב**: TailwindCSS
- **אנימציות**: Framer Motion
- **ניהול מצב**: Context API עם Custom Providers
- **אימות**: JWT Tokens
- **UI Components**: Radix UI + Custom Components





### Backend (Server)
- **טכנולוגיה**: Node.js עם Express.js
- **מסד נתונים**: MongoDB עם Mongoose
- **אימות**: JWT + bcryptjs
- **אבטחה**: CORS, Validation עם Joi
- **לוגים**: Morgan



## תכולת הפרויקט

### מבנה התיקיות

```
FinalProjectCopunManager/
├── client/                 # אפליקציית Frontend
│   ├── src/
│   │   ├── app/           # דפי האפליקציה (App Router)
│   │   │   ├── auth/      # מערכת אימות
│   │   │   ├── coupons/   # ניהול קופונים
│   │   │   ├── about/     # דף אודות
│   │   │   ├── contact/   # דף צור קשר
│   │   │   ├── pricing/   # דף תמחור
│   │   │   └── services/  # דף שירותים
│   │   ├── components/    # רכיבי UI נשלפים
│   │   ├── hooks/         # Custom React Hooks
│   │   ├── helpers/       # פונקציות עזר
│   │   ├── providers/     # Context Providers
│   │   └── lib/          # ספריות ותצורות
│   └── public/           # קבצים סטטיים
├── server/                # שרת Backend
│   ├── routes/           # נתיבי API
│   │   ├── auth/         # נתיבי אימות
│   │   ├── coupons/      # נתיבי קופונים
│   │   ├── users/        # נתיבי משתמשים
│   │   └── subscription/ # נתיבי מנויים
│   ├── db/              # חיבור ומודלים של מסד הנתונים
│   ├── middlewares/     # Middleware functions
│   ├── utils/           # פונקציות עזר
│   ├── logs/            # קבצי לוגים
│   └── InitialData/     # נתונים ראשוניים
└── README.md            # תכנית פיתוח
```
## פונקציונליות המערכת

### 1. מערכת אימות ומשתמשים
- **הרשמה**: יצירת חשבון משתמש חדש עם אימות טלפון
- **התחברות**: כניסה למערכת עם JWT tokens
- **ניהול פרופיל**: עדכון פרטים אישיים
- **איפוס סיסמה**: שחזור סיסמה באמצעות טלפון
- **הרשאות**: ניהול הרשאות משתמשים (SuperAdmin) (Admin) (User) (Shared User[Guest])

### 2. ניהול קופונים ושוברים
- **הוספת קופונים**: יצירת קופונים חדשים עם פרטים מלאים
- **עריכה ועדכון**: שינוי פרטי קופונים קיימים
- **מחיקה**: הסרת קופונים שאינם רלוונטיים
- **חיפוש וסינון**: מציאת קופונים לפי קטגוריות, תאריכים, חנויות, שם קופון, קוד קופון, תיאור
- **מיון**: סידור קופונים לפי תאריך תפוגה, מועדפים
- **אפשרויות תצוגה**: רשימה או כרטיסים  
- **QR Codes**: יצירת קודי QR למימוש מהיר
- **ברקודים**: קודי ברקוד למימוש מהיר


### 3. מעקב תאריכי תפוגה
- **תצוגה**: הצגת קופונים שעומדים לפוג
- **סטטוס ויזואלי**: צבעים שונים לקופונים לפי זמן התפוגה

### 4. שיתוף קופונים
- **שיתוף ציבורי**: יצירת קישורים לשיתוף קופונים עם חברים ומשפחה

### 5. דשבורד וסטטיסטיקות
- **סקירה כללית**: מבט על על כל הקופונים

## דפי האפליקציה

### דפים ציבוריים
1. **דף הבית** (`/`) - דף נחיתה עם הצגת התכונות העיקריות
2. **אודות** (`/about`) - מידע על הפרויקט והצוות
3. **צור קשר** (`/contact`) - טופס יצירת קשר

### דפי אימות
1. **התחברות** (`/auth/login`) - כניסה למערכת
2. **הרשמה** (`/auth/register`) - יצירת חשבון חדש
3. **ניהול חשבון** (`/auth/account`) - עדכון פרטים אישיים
4. **ניהול תתי משתמשים** (`/auth/account`) - ניהול בני משפחה וחברים
5. **יציאה** (`/auth/logout`) - יציאה מהמערכת

### דפי ניהול קופונים
1. **דשבורד קופונים** (`/coupons`) - תצוגה כללית של כל הקופונים
2. **הוספת קופון** (Modal) - יצירת קופון חדש
3. **עריכת קופון** (Modal) - עדכון קופון קיים
4. **צפייה בקופון**  תצוגה מפורטת של קופון
5. **שיתוף קופון** (`/coupons/share/[id]`) - שיתוף קופון עם אחרים

## אפשרויות והתממשקות

### API Endpoints (Server)

#### אימות (`/auth`)
- `POST /register` - הרשמת משתמש חדש
- `POST /login` - התחברות משתמש
- `POST /logout` - יציאה מהמערכת
- `POST /forgot-password` - איפוס סיסמה

#### קופונים (`/coupons`)
- `GET /` - קבלת כל הקופונים של המשתמש
- `POST /` - יצירת קופון חדש
- `PUT /:id` - עדכון קופון
- `DELETE /:id` - מחיקת קופון
- `GET /?q=[params]` - חיפוש קופונים
- `POST /share/:couponId` - שיתוף קופון
- `GET /share/:couponId` - קבלת קופון משותף 
- `GET /:couponId/mark-favorite-unfavorite` - סימון קופון כמועדף/לא מועדף 
- `GET /:couponId/mark-used-unused` - סימון קופון כמומש/לא מומש

#### משתמשים (`/users`)
- `GET /` - קבלת כל המשתמשים
- `POST /` - יצירת משתמש חדש
- `GET /my-users` - קבלת בני משפחה וחברים
- `PATCH /make-admin/:userId` - הפיכת משתמש למנהל
- `DELETE /:userId` - מחיקת משתמש
- `PUT /:userId` - עדכון משתמש
- `GET /me` - אימות טוקן

#### קטגוריות (`/categories`)
- `GET /` - קבלת קטגוריות

#### חברות (`/companies`)
- `GET /` - קבלת חברות

#### מנויים (`/subscription`)
- `GET /` - קבלת הכל
- `POST /` - יצירת Subscription
- `GET /:email` - קבלת Subscription למי דואל

### תכונות UI/UX מתקדמות

1. **עיצוב רספונסיבי**: תמיכה מלאה במכשירים ניידים וטאבלטים
2. **אנימציות**: אנימציות חלקות עם Framer Motion
3. **נגישות**: תמיכה בכלי נגישות
4. **טעינה מהירה**: אופטימיזציה לביצועים

## הגדרות סביבת פיתוח

### Client Environment Variables (.env)
```env
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5555
NEXT_PUBLIC_ENV=development
```


### Server Environment Variables (.env)
```env
PORT=5555
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/coupoint
API_URL=http://localhost
LOGGER=morgan
DB=mongoDB
TOKEN_GENERATOR=jwt
JWT_KEY=Av4a5s6d7f8g9h0j1k2l3z4x5c6v7b8n9m0
ENCRYPTION_KEY=d8f3a7b1c6e9452f0183a4b2c7d5e9f6
```

## הוראות התקנה והפעלה

### דרישות מערכת
- Node.js (גרסה 18 ומעלה)
- MongoDB (מקומי או cloud)
- npm או yarn

### התקנת Client
```bash
cd client
mv .env.example .env
npm install
npm run dev
```
האפליקציה תרוץ על: http://localhost:3000

### התקנת Server
```bash
cd server
mv .env.example .env
npm install
npm run dev
```
השרת ירוץ על: http://localhost:5555

### הגדרת מסד הנתונים
1. התקן MongoDB מקומית או השתמש ב-MongoDB Atlas
2. צור מסד נתונים בשם `coupoint`
3. עדכן את ה-MONGODB_URI בקובץ .env

## טכנולוגיות ותלויות

### Frontend Dependencies
- **Next.js 15.3.1**: React Framework
- **React 19**: ספריית UI
- **Framer Motion**: אנימציות
- **TailwindCSS**: CSS Framework
- **Radix UI**: Component Library
- **Axios**: HTTP Client
- **JWT Decode**: JWT Handling
- **QRCode.react**: יצירת QR Codes
- **React Barcode**: יצירת ברקודים

### Backend Dependencies
- **Express.js**: Web Framework
- **MongoDB/Mongoose**: מסד נתונים
- **JWT**: אימות
- **bcryptjs**: הצפנת סיסמאות
- **Joi**: Validation
- **CORS**: Cross-Origin Resource Sharing
- **Morgan**: HTTP Logger

## אבטחה

1. **הצפנת סיסמאות**: bcryptjs
2. **JWT Tokens**: אימות מאובטח
3. **CORS**: הגנה על בקשות cross-origin
4. **Validation**: אימות נתונים עם Joi
5. **Environment Variables**: הסתרת מידע רגיש

## תכונות עתידיות

1. **אפליקציה ניידת**: פיתוח אפליקציה ל-iOS ו-Android
2. **בינה מלאכותית**: המלצות חכמות על קופונים
3. **אינטגרציות**: חיבור לחנויות מקוונות
4. **התראות Push**: הודעות בזמן אמת
5. **ניתוח מתקדם**: דוחות וסטטיסטיקות מתקדמות

### לוגים
המערכת שומרת לוגים בתיקיית `server/logs/` לצורך דיבוג ומעקב.
