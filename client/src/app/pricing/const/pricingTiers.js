import { BoltIcon, RocketLaunchIcon, StarIcon } from "@heroicons/react/24/outline";

const pricingTiers = [
    {
      name: "חינמי",
      icon: <StarIcon className="w-6 h-6 text-gray-500" />,
      price: "₪ 0",
      frequency: "/חודש",
      description: "התחל לנהל את השוברים שלך ללא עלות",
      features: [
        { text: "עד 20 שוברים פעילים", included: true },
        { text: "תמיכה קהילתית", included: true },
        { text: "סנכרון למכשיר אחד", included: true },
        { text: "שיתוף של שוברים", included: false },
        { text: "ללא התראות מתקדמות", included: false },
        { text: "ללא גיבוי אוטומטי", included: false },
      ],
      cta: "התחל בחינם",
      ctaVariant: "outline",
      highlight: false,
    },
    {
      name: "פלוס",
      icon: <BoltIcon className="w-6 h-6 text-blue-500" />,
      price: "₪ 10",
      frequency: "/חודש",
      description: "למשתמשים שרוצים יותר שליטה ונוחות",
      features: [
        { text: "עד 100 שוברים פעילים", included: true },
        { text: "תמיכה באימייל", included: true },
        { text: "שיתוף של שוברים", included: true },
        { text: "סנכרון עד 3 מכשירים", included: true },
        { text: "התראות תפוגה מתקדמות", included: true },
        { text: "ללא גיבוי אוטומטי", included: false },
      ],
      cta: "שדרג לפלוס",
      ctaVariant: "default",
      highlight: true,
    },
    {
      name: "פרו",
      icon: <RocketLaunchIcon className="w-6 h-6 text-purple-500" />,
      price: "₪49",
      frequency: "/חודש",
      description: "כל התכונות ללא הגבלות למשתמשים מתקדמים",
      features: [
        { text: "שוברים ללא הגבלה", included: true },
        { text: "תמיכה פרימיום (טלפון/צ'אט)", included: true },
        { text: "שיתוף של שוברים", included: true },
        { text: "סנכרון ללא הגבלת מכשירים", included: true },
        { text: "התראות תפוגה מתקדמות", included: true },
        { text: "גיבוי אוטומטי בענן", included: true },
      ],
      cta: "שדרג לפרו",
      ctaVariant: "outline",
      highlight: false,
    },
  ];

  export default pricingTiers;