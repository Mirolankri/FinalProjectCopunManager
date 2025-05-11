'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const notificationAction = {
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
  ALERT: "ALERT",
  DELETE: "DELETE",
  ADD: "ADD",
  INACTIVE: "INACTIVE",
};
function AlertCard({ type, message }) {
  const [bgColor, setBgColor] = useState("alert-success");
  useEffect(() => {
    switch (type) {
      case notificationAction.ERROR:
        setBgColor("bg-red-300");
        break;
      case notificationAction.SUCCESS:
        setBgColor("bg-green-300");
        break;
      case notificationAction.WARNING:
        setBgColor("bg-yellow-300");
        break;
      default:
        setBgColor("bg-blue-300");
        break;
    }
  }, [type, message]);

  return (
    <motion.div 
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 70, opacity: 1, }}
    transition={{ 
      delay: 0.4,
      duration: 0.3,
      type: "spring",
      stiffness: 150
    }}

    // exit={{ y: 300, opacity: 0 }}
    className={`fixed w-full z-50 mt-8 flex justify-center`}
  >
    <div className={`w-fit rounded-lg p-3 ${bgColor}`}>
        <div>{message}</div>
    </div>
  </motion.div>
    
    
  );
}

export default AlertCard;
