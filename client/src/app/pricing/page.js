import React from 'react'
import pricingTiers from './const/pricingTiers';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../components/Elements/Button/Index';

const page = () => {
    return (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">תוכניות ומחירים</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              בחר את התוכנית המתאימה ביותר לצרכים שלך והתחל לנהל את השוברים שלך בצורה חכמה ויעילה.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-center">
            {pricingTiers.map((tier) => (
                <div 
                key={tier.name} 
                className={` bg-white border text-foreground flex flex-col ${tier.highlight ? "border-blue-500 shadow-xl scale-105" : "border-gray-200"} rounded-xl overflow-hidden`}
                >
                {tier.highlight && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    הכי פופולרי
                  </div>
                )}
                <div className="p-6 text-center flex flex-col space-y-1.5">
                  <div className="mb-4 flex justify-center">{tier.icon}</div>
                  <h3 className="tracking-tight text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    <span className="text-gray-500">{tier.frequency}</span>
                  </div>
                  <div className="text-sm text-gray-600">{tier.description}</div>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature.text} className="flex items-center">
                        {feature.included ? (
                          <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-800" : "text-gray-500 line-through"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center p-6 bg-gray-50/50">
                  <Button 
                    className={`w-full py-3 text-lg ${tier.ctaVariant === "default" ? "bg-blue-600 hover:bg-blue-700" : ""}`} 
                    variant={tier.ctaVariant}
                  >
                    {tier.cta}
                  </Button>
                </div>
              {/* </Card> */}
              </div>
            ))}
          </div>
    
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">שאלות נפוצות</h2>
            <div className="max-w-2xl mx-auto space-y-4 text-right">
              <div>
                <h3 className="font-medium text-lg">האם אוכל לשנות תוכנית מאוחר יותר?</h3>
                <p className="text-gray-600">
                  כן, תוכל לשדרג או לשנמך את התוכנית שלך בכל עת דרך הגדרות החשבון.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">מהם אמצעי התשלום המקובלים?</h3>
                <p className="text-gray-600">
                  אנו מקבלים את כל כרטיסי האשראי המובילים. כל התשלומים מאובטחים.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">האם יש התחייבות?</h3>
                <p className="text-gray-600">
                  לא, תוכל לבטל את המנוי שלך בכל עת. התוכנית החינמית זמינה ללא הגבלת זמן.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default page