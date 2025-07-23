import React from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const CouponWebSite = ({ coupon }) => {
  return (
    <Link
      href={coupon.website}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-2 rounded-lg bg-blue-50 text-blue-600 text-center text-sm hover:bg-blue-100 transition-colors"
    >
      <div className="flex items-center justify-center">
        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
        לאתר החנות
      </div>
    </Link>
  );
};
