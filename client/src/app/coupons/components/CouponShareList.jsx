import ToolTip from '@/app/components/Elements/ToolTip/Index';
import { ArrowTopRightOnSquareIcon, ChatBubbleOvalLeftEllipsisIcon, LinkIcon, LinkSlashIcon, Square2StackIcon, TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react'

const CouponShareList = ({sharedCoupons}) => {
    const url = window.location.origin;
    sharedCoupons = [...sharedCoupons].reverse();
  return (
   <div className="h-50 w-full overflow-y-auto">
    <ul className="max-w-lg mx-auto divide-y divide-gray-200 dark:divide-gray-700">
        {sharedCoupons.map((sharedCoupon) => {
        return (
            <li className="py-3 sm:pb-4" key={sharedCoupon._id}>
                <div className="flex items-start space-x-4 ml-1 space-x-reverse">
                    <div className="min-w-0 flex-1 text-right">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{sharedCoupon.shareName}</p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">{sharedCoupon.expiryDate ? format(new Date(sharedCoupon.expiryDate), "dd/MM/yyyy") : "-"}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                        
                        <ToolTip tip="קישור" position='right'>
                            <Link href={`${url}${sharedCoupon.url}`}><ArrowTopRightOnSquareIcon className="size-8" /></Link>
                        </ToolTip>
                        
                        <ToolTip tip="העתקה" position='right'><Square2StackIcon className="size-8" /></ToolTip>
                        <ToolTip tip="שיתוף בהודעה" position='right'><ChatBubbleOvalLeftEllipsisIcon className="size-8" /></ToolTip>
                        <ToolTip tip="מחיקה" position='right'><TrashIcon className="size-8 text-red-500" /></ToolTip>
                        </div>
                    </div>
                </div>
            </li>
        )
    })}
    </ul>
    </div>
  )
}

export default CouponShareList

{/* <div className="flex items-start justify-between text-center">
        <div>שם לשיתוף</div>
        <div>תאריך תוקף</div>
        <div>קישור</div>
      </div>
    {sharedCoupons.map((sharedCoupon) => (
      <div key={sharedCoupon._id} className="flex items-start justify-between text-center">
        <div>{sharedCoupon.shareName}</div>
        <div>{sharedCoupon.expiryDate ? format(new Date(sharedCoupon.expiryDate), "dd/MM/yyyy") : "-"}</div>
        <div>
        <div className="flex items-center gap-2">
            <ToolTip tip="קישור">
                <Link href={`${url}${sharedCoupon.url}`}><ArrowTopRightOnSquareIcon className="size-8" /></Link>
            </ToolTip>
            <ToolTip tip="העתקה"><Square2StackIcon className="size-8" /></ToolTip>
            <ToolTip tip="שיתוף בהודעה"><ChatBubbleOvalLeftEllipsisIcon className="size-8" /></ToolTip>
            <ToolTip tip="מחיקה"><TrashIcon className="size-8 text-red-500" /></ToolTip>
        </div>
        </div>
      </div>
    ))} */}