'use client'
import React from "react";
import { format } from "date-fns";
import Badge from "@/app/components/Elements/Badge/Badge";
import Button from "@/app/components/Elements/Button/Index";
import { ArrowTopRightOnSquareIcon, BuildingStorefrontIcon, CalendarIcon, ClockIcon, CreditCardIcon, PencilIcon, ShareIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import ToolTip from "@/app/components/Elements/ToolTip/Index";
import { useModal } from "@/providers/ModalProvider/ModalProvider";
import CouponDelete from "./CouponDelete";
import CouponShare from "./CouponShare";
import { copyToClipboard } from "@/helpers/Clipboard/copyToClipboard";
import { useUser } from "@/app/components/providers/UserProvider";
import { ShortString } from "@/helpers/Strings/StringsHelpers";
import { CouponDescription } from "./coupon/CouponDescription";
import { Barcode, Clipboard, ScanQrCode, Star } from "lucide-react";
import QrCodeModal from "./coupon/QrCodeModal";
import BarcodeModal from "./coupon/BarcodeModal";
import MarkUsed from "./coupon/MarkUsed";
import MarkFavorite from "./coupon/MarkFavorite";
import Link from "next/link";
import { CouponAction } from "./coupon/CouponAction";
import { CouponWebSite } from "./coupon/CouponWebSite";

export default function CouponCard({ coupon, onEdit, onDelete, onShare, companies, categories, onMarkUsed_UnUsed,onFavorite }) {
    const AlertInstance = useAlert();
    const {user} = useUser();
    const { setModal } = useModal();
    const isExpired = (date) => {
        if (!date) return false;
        return new Date(date) < new Date();
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
  };
  const HandleShare = () => {
    setModal("שיתוף קופון",<CouponShare coupon={coupon} onShare={onShare} getDaysRemaining={getDaysRemaining} />);
  };
  const handleCopyCoupon = () => {
    copyToClipboard(coupon.code, AlertInstance);
  };
  const handleShowQrCode = () => {
    setModal("תצוגת QR Code", <QrCodeModal coupon={coupon} />);
  };
  const handleShowBarcode = () => {
    setModal("תצוגת ברקוד", <BarcodeModal coupon={coupon} />);
  };

  return (
    <div className="bg-white transition-all hover:shadow-lg rounded-xl shadow-sm border border-gray-200 ">
      <div className="p-0">
        <div className="p-4">
            {/* <div className=""> */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <div className="text-xl">
                          {coupon.name}
                        </div>
                        <div className="flex items-center mb-2">
                            <BuildingStorefrontIcon className="size-5 text-gray-500 ml-2" />
                            <h3 className="font-bold text-2xl">
                            {coupon.store && (
                              <>
                              {companies.find((option) => option.value === coupon.store)?.label}
                              </>
                            )}
                            </h3>
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
                
            {/* </div> */}

          
          {/* body */}
          <div className="flex items-center justify-between mb-3">
            <div className="w-full bg-gray-100 p-3 rounded-md  border border-gray-200 cursor-pointer hover:rounded-3xl transition-all hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="font-mono font-bold">{coupon.code}</div>
                <div className="flex items-center gap-2">
                  <ToolTip tip="העתק קוד">
                    <div className="cursor-pointer hover:text-gray-600"
                    onClick={handleCopyCoupon}>
                      <Clipboard className="size-7" />
                    </div>
                  </ToolTip>
                  <ToolTip tip="הצגת QR Code">
                    <div className="cursor-pointer hover:text-gray-600"
                    onClick={handleShowQrCode}>
                      <ScanQrCode className="size-7" />
                    </div>
                  </ToolTip>
                  <ToolTip tip="הצגת ברקוד">
                    <div className="cursor-pointer hover:text-gray-600"
                    onClick={handleShowBarcode}>
                      <Barcode className="size-7" />
                    </div>
                  </ToolTip>
                </div>
              </div>
              
            </div>
            
          </div>
          {/* body */}

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <MarkUsed coupon={coupon} onMarkUsed_UnUsed={onMarkUsed_UnUsed} />
          </div>
          {/* footer */}
          {/* footer expiry date and  days remaining */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
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
            <div className="flex items-center gap-1">
            {coupon.used ? (
              <Badge color="bg-blue-100" className="bg-blue-50 text-blue-700">נוצל</Badge>
              ) : isExpired(coupon.expiryDate) ? (
              <Badge color="bg-red-100" className=" text-red-700">פג תוקף</Badge>
              ) : null
            }
            </div>
            {coupon.shared_by && (
              <div className="text-blue-600">
                שותף ע"י {coupon.shared_by.split('@')[0]}
              </div>
            )}
          </div>
          

          {/* footer categories and description */}
          <div className="flex items-center justify-between text-xs">
            {coupon.description && 
              <CouponDescription description={coupon.description} />
            }
              <div>
                <div className="flex flex-wrap gap-2 items-center">
                {coupon.category && (
                    <ToolTip tip="קטגוריה">
                    <Badge  className="flex items-center gap-1">
                        <TagIcon className="size-5" />
                        {categories.find((option) => option.value === coupon.category)?.label}
                    </Badge>
                    </ToolTip>
                )}
                <MarkFavorite coupon={coupon} onFavorite={onFavorite} />
                </div>
              </div>
          </div>
          {/* footer */}
        </div>
        
        {user &&
         <CouponAction user={user} coupon={coupon} onEdit={onEdit} HandleDelete={HandleDelete} HandleShare={HandleShare} />
        }
        {coupon.website && 
          <CouponWebSite coupon={coupon} />
        }
      </div>
    </div>
  );
}