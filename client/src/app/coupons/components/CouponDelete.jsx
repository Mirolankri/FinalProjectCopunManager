import Button from '@/app/components/Elements/Button/Index'
import { useModal } from '@/providers/ModalProvider/ModalProvider'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const CouponDelete = ({coupon, onDelete}) => {
    const {closeModal} = useModal()

    const handleDelete = async() => {
        await onDelete(coupon._id)
        closeModal()
    }
  return (
    <div className="flex flex-col gap-6 text-center">
        <div className="flex items-center justify-center">
            <InformationCircleIcon className="size-15 text-red-500"/>
        </div>
        <p className='text-lg'>האם אתה בטוח שברצונך למחוק את הקופון {coupon.name}?</p>
        <div className="flex gap-2 justify-center items-center w-1/2 mx-auto">
            <Button variant="outline" onClick={closeModal}>ביטול</Button>
            <Button className="bg-red-600  hover:bg-red-400" onClick={handleDelete}>כן, מחיקת קופון</Button>
        </div>
    </div>
  )
}

export default CouponDelete