import React from 'react'
import ToolTip from '@/app/components/Elements/ToolTip/Index'
import { PlusIcon } from 'lucide-react'
import { useModal } from '@/providers/ModalProvider/ModalProvider';
import CouponAddOrEdit from '../CouponAddOrEdit';
import Button from '@/app/components/Elements/Button/Index';
import { CirclePlus } from '@/components/animate-ui/icons/circle-plus';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { Plus } from '@/components/animate-ui/icons/plus';

const AddNewCouponBTN = ({categories,companies,OnCreateCoupon}) => {
     const {setModal} = useModal();
  return (
    <ToolTip tip="הוספת קופון חדש">
        <div className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-indigo-500 hover:to-indigo-500 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 p-0.5 rounded-full cursor-pointer shadow-lg">
            <div className=" bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 hover:from-indigo-200 hover:via-purple-200 hover:to-pink-200 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 p-1.5 rounded-full">
                <AnimateIcon animateOnHover animate={true} animation="path-loop" loop={true} loopDelay={1}>
                    <Plus  className="size-12" onClick={() => setModal('הוספת קופון חדש', <CouponAddOrEdit type="add" categories={categories} companies={companies} OnSubmitCoupon={OnCreateCoupon}/>)} />
                </AnimateIcon>
            </div>
    </div>
    </ToolTip>
  )
}

export default AddNewCouponBTN