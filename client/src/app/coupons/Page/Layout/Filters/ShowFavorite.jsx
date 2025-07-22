'use client'

import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { GetValueLocalStorage, SetValueLocalStorage } from '@/app/services/localStorageService'

export const ShowFavorite = ({onShowFavorite}) => {
  const [showFavorite, setShowFavorite] = useState(false);
  const handleToggle = () => {
    const newState = !showFavorite;
    setShowFavorite(newState);
    onShowFavorite(newState);
  };

  return (
    <div 
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${showFavorite ? 'bg-red-100 hover:bg-red-200 text-red-600' : 'hover:bg-gray-100'}`}
      onClick={handleToggle}
    >
      <Star className={`size-5 ${showFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      <span className="text-sm font-medium">הצג מועדפים בלבד</span>
    </div>
  )
}
