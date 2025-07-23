'use client'
import React from 'react'
import Barcode from 'react-barcode';

import { Barcode as BarcodeiCon } from 'lucide-react';


const BarcodeModal = ({coupon}) => {
  return (
    <div className="flex flex-col gap-6 text-center">
        <div className="flex items-center justify-center flex-col gap-2">
            <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">
            סרוק אותי
            </h3>
            <BarcodeiCon className="size-7" />
            </div>
            
            <Barcode 
              value={coupon.code}
              format="CODE128"
              width={2}
              height={100}
              displayValue={true}
              fontSize={18}
            />
        </div>        
    </div>
  )
}

export default BarcodeModal