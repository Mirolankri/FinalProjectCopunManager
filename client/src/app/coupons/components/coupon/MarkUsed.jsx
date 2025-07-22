'use client'

import React, { useState } from 'react'
import { useUser } from '@/app/components/providers/UserProvider'
import { CheckCircle, XCircle } from 'lucide-react'
import { useModal } from '@/providers/ModalProvider/ModalProvider'
import { useAlert } from '@/providers/AlertProvider/AlertProvider'
import Spinner from '@/app/components/Elements/Spinner/Spinner'

const MarkUsed = ({ coupon, onMarkUsed_UnUsed }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [localUsed, setLocalUsed] = useState(coupon.used)
  const { user } = useUser()

  const handleToggleUsed = async() => {
    setIsLoading(true)
    setLocalUsed(prev => !prev)
    // setTimeout(async() => {
        await onMarkUsed_UnUsed(coupon._id)
        setIsLoading(false)
    // }, 5000);
    
  }

  return (
    <div className='flex justify-between items-center w-full'>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">סטטוס:</span>
        {isLoading ? <Spinner size={4} /> : 
        localUsed ? (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="size-4" />
              <span>מומש</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-600">
              <XCircle className="size-4" />
              <span>לא מומש</span>
            </div>
          )
        }
       
      </div>
      
      {user?.isAdmin && (
        <button
          onClick={handleToggleUsed}
          disabled={isLoading}
          className={`text-xs px-2 py-1 rounded-md transition-colors ${localUsed 
            ? 'text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100' 
            : 'text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100'}`}
        >
          {isLoading ? (<div className='flex items-center gap-1'>מעדכן <Spinner size={4} /></div>) : localUsed ? 'סמן כלא מומש' : 'סמן כמומש'}
        </button>
      )}
    </div>
  )
}

export default MarkUsed