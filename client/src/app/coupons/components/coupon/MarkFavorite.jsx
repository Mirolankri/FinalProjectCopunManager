'use client'

import React, { useState } from 'react'
import { useUser } from '@/app/components/providers/UserProvider'
import { CheckCircle, Star, XCircle } from 'lucide-react'
import { useModal } from '@/providers/ModalProvider/ModalProvider'
import { useAlert } from '@/providers/AlertProvider/AlertProvider'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import ToolTip from '@/app/components/Elements/ToolTip/Index'
import { IconButton } from '@/components/animate-ui/buttons/icon'

const MarkFavorite = ({ coupon, onFavorite }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [localFavorite, setLocalFavorite] = useState(coupon.favorite)
  const { user } = useUser()

  const handleToggleFavorite = async() => {
    setIsLoading(true)
    setLocalFavorite(prev => !prev)
    // setTimeout(async() => {
        await onFavorite(coupon._id)
        setIsLoading(false)
    // }, 5000);
    
  }

  return (
    <ToolTip tip="מועדפים">
      <IconButton
      icon={Star}
      size='md'
      active={localFavorite}
      onClick={handleToggleFavorite}
      color={[255, 0, 0]}
    />
    </ToolTip>
  )
}

export default MarkFavorite