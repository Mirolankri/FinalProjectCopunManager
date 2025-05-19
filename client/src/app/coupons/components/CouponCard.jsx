'use client'
import React from "react";
import { format } from "date-fns";
import Badge from "@/app/components/Elements/Badge/Badge";
import Button from "@/app/components/Elements/Button/Index";
import { ArrowTopRightOnSquareIcon, BuildingStorefrontIcon, CalendarIcon, ClipboardIcon, ClockIcon, CreditCardIcon, PencilIcon, ShareIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import ToolTip from "@/app/components/Elements/ToolTip/Index";
import { useModal } from "@/providers/ModalProvider/ModalProvider";
import CouponDelete from "./CouponDelete";
import CouponShare from "./CouponShare";

export default function CouponCard({ coupon, onEdit, onDelete, onShare }) {
    const AlertInstance = useAlert();
    const { setModal } = useModal();
    const isExpired = (date) => {        
        if (!date) return false;
        return new Date(date) < new Date();
    };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    AlertInstance("SUCCESS", "הקוד הועתק ללוח");
  };
  const getDaysRemaining = (date) => {
    if (!date) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(date);
    expiryDate.setHours(0, 0, 0, 0);
    const diffTime = expiryDate - today;
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === "") return "";
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(amount);
  };
  const HandleDelete = () => {
    setModal("מחיקת קופון",<CouponDelete coupon={coupon} onDelete={onDelete} />);
    // onDelete(coupon._id);
  };
  const HandleShare = () => {
    setModal("שיתוף קופון",<CouponShare coupon={coupon} onShare={onShare} getDaysRemaining={getDaysRemaining} />);
  };

  return (
    <div className=" transition-all hover:shadow-md border border-gray-200 rounded-lg shadow-sm">
      <div className="p-0">
        <div className="p-4">
            <div className="">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <div className="text-xl">
                            שם קופון: {coupon.name}
                        </div>
                        <div className="flex items-center mb-2">
                            <BuildingStorefrontIcon className="size-5 text-gray-500 ml-2" />
                            <h3 className="font-bold text-2xl">{coupon.store}</h3>
                        </div>
                    </div>
                    
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                        {coupon.amount > 0 && (
                            <ToolTip tip="סכום">
                            <Badge color="bg-green-100" size="lg" variant="outline" className="bg-green-50 text-green-700 flex items-center gap-1">
                                <CreditCardIcon className="size-4" />
                                {formatCurrency(coupon.amount)}
                            </Badge>
                            </ToolTip>
                        )}
                        {coupon.discount > 0 && (
                            <ToolTip tip="הנחה">
                            <Badge variant="outline" className="flex items-center gap-1">
                                {coupon.discount}%
                            </Badge>
                            </ToolTip>
                        )}
                    </div>

                </div>
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                    {coupon.category && (
                        <ToolTip tip="קטגוריה">
                        <Badge  className="flex items-center gap-1">
                            <TagIcon className="size-5" />
                            {coupon.category}
                        </Badge>
                        </ToolTip>
                    )}
                    {coupon.used ? (
                        <Badge color="bg-blue-700" className="bg-blue-50 text-blue-700">נוצל</Badge>
                    ) : isExpired(coupon.expiryDate) ? (
                        <Badge color="bg-red-700" className="bg-red-50 text-red-700">פג תוקף</Badge>
                    ) : null}
                    </div>
                </div>
            </div>

          {coupon.description && (
            <p className="text-gray-600 text-sm mb-3">{coupon.description}</p>
          )}

          <div className="bg-gray-100 p-3 rounded-md mb-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="font-mono font-bold">{coupon.code}</div>
              <ToolTip tip="העתק קוד">
                <div
                className="cursor-pointer hover:text-gray-600"
                onClick={() => copyToClipboard(coupon.code)}>
                  <ClipboardIcon className="size-5" />
                </div>
              </ToolTip>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
                <ToolTip tip="תאריך תוקף">
                    <CalendarIcon className="size-5"  />
                </ToolTip>
              {coupon.expiryDate ? (
                <span className={isExpired(coupon.expiryDate) ? "text-red-500" : ""}>
                  {format(new Date(coupon.expiryDate), "dd/MM/yyyy")}
                </span>
              ) : "-"}
              {getDaysRemaining(coupon.expiryDate) > 0 && (
                        <Badge color="bg-yellow-100" className="bg-yellow-100 text-yellow-700 border-0">
                          <ClockIcon className="size-4 ml-1" />
                          {getDaysRemaining(coupon.expiryDate)} ימים
                        </Badge>
                      )}
            </div>
            {coupon.shared_by && (
              <div className="text-blue-600">
                שותף ע"י {coupon.shared_by.split('@')[0]}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex border-t">
          <Button
            variant="link"
            className=""
            onClick={() => onEdit(coupon)}
          >
            <PencilIcon className="w-4 h-4 ml-2" />
            עריכה
          </Button>
          <div className="w-px bg-gray-200"></div>
          <Button
            variant="link"
            className=""
            onClick={HandleShare}
          >
            <ShareIcon className="w-4 h-4 ml-2" />
            שיתוף ({coupon.totalSharedCoupons})
          </Button>
          <div className="w-px bg-gray-200"></div>
          <Button
            variant="link"
            className=" text-red-600 hover:text-red-800 hover:bg-red-50"
            onClick={HandleDelete}
          >
            <TrashIcon className="w-4 h-4 ml-2" />
            מחיקה
          </Button>
        </div>

        {coupon.website && (
          <a
            href={coupon.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 bg-blue-50 text-blue-600 text-center text-sm hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center justify-center">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
              לאתר החנות
            </div>
          </a>
        )}
      </div>
    </div>
  );
}