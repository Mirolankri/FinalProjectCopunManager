import React from "react";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react";
import Button from "@/app/components/Elements/Button/Index";

export const CouponAction = ({
  user,
  coupon,
  onEdit,
  HandleShare,
  HandleDelete,
}) => {
  return (
    <div className="flex border-t">
      <Button
        variant="link"
        className=""
        disabled={!user.isAdmin}
        onClick={() => onEdit(coupon)}
      >
        <PencilIcon className="w-4 h-4 ml-2" />
        עריכה
      </Button>
      <div className="w-px bg-gray-200"></div>
      <Button
        variant="link"
        className=""
        disabled={!user.isAdmin}
        onClick={HandleShare}
      >
        <ShareIcon className="w-4 h-4 ml-2" />
        שיתוף ({coupon.totalSharedCoupons})
      </Button>
      <div className="w-px bg-gray-200"></div>
      <Button
        variant="link"
        className="!rounded-bl-lg text-red-600 hover:text-red-800 hover:bg-red-50 "
        disabled={!user.isAdmin}
        onClick={HandleDelete}
      >
        <TrashIcon className="w-4 h-4 ml-2" />
        מחיקה
      </Button>
    </div>
  );
};
