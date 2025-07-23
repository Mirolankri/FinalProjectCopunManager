import React from "react";
import ToolTip from "@/app/components/Elements/ToolTip/Index";
import { copyToClipboard } from "@/helpers/Clipboard/copyToClipboard";
import { ShareData } from "@/helpers/Share/Share";
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import { format } from "date-fns";
import { Clipboard, MessageCircle, Share } from "lucide-react";

const CouponShareList = ({ sharedCoupons }) => {
  const AlertInstance = useAlert();
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
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {sharedCoupon.shareName}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {sharedCoupon.expiryDate
                      ? format(new Date(sharedCoupon.expiryDate), "dd/MM/yyyy")
                      : "-"}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <div className="flex items-center gap-2">
                    <ToolTip tip="שיתוף" position="right">
                      <Share
                        className="size-6 cursor-pointer"
                        onClick={() =>
                          ShareData({
                            title: "Coupoint",
                            text: "משתף איתך קופון שלי",
                            url: `${url}${sharedCoupon.url}`,
                            AlertInstance,
                          })
                        }
                      />
                    </ToolTip>

                    <ToolTip tip="העתקה" position="right">
                      <Clipboard
                        className="size-6 cursor-pointer"
                        onClick={() =>
                          copyToClipboard(
                            `${url}${sharedCoupon.url}`,
                            AlertInstance
                          )
                        }
                      />
                    </ToolTip>
                    <ToolTip tip="שיתוף Whatsapp" position="right">
                      <MessageCircle
                        className="size-6 cursor-pointer"
                        onClick={() => {
                          window.open(
                            `https://wa.me/?text=משתף איתך קופון שלי %0A ${url}${sharedCoupon.url}`
                          );
                        }}
                      />
                    </ToolTip>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CouponShareList;