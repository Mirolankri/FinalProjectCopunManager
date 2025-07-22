import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import { ScanQrCode } from 'lucide-react';


const QrCodeModal = ({coupon}) => {
  return (
    <div className="flex flex-col gap-6 text-center">
        <div className="flex items-center justify-center flex-col gap-2">
            <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">
            סרוק אותי
            </h3>
            <ScanQrCode className="size-7" />
            </div>
            
        <QRCodeCanvas
            value={coupon.code}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            marginSize={2}
        />
        </div>        
    </div>
  )
}

export default QrCodeModal