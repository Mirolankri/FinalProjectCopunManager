'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { node } from "prop-types";
import AlertCard from "./components/AlertCard";

const AlertContext = React.createContext(null);

export const AlertProvider = ({ children }) => {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackColor, setSnackColor] = useState("DEFAULT");
  const [snackVariant, setSnackVariant] = useState("filled");
  const [snackMessage, setSnackMessage] = useState("in snackbar!");
  const [autoHideDuration, setAutoHideDuration] = useState(5000);

  useEffect(() => {
    let timer;
    if (isSnackOpen && autoHideDuration) {
      timer = setTimeout(() => {
        setOpenSnack(false);
      }, autoHideDuration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSnackOpen, autoHideDuration]);

  const setSnack = useCallback((color, message, variant = "filled") => {
    setOpenSnack(true);
    setSnackColor(color);
    setSnackVariant(variant);
    setSnackMessage(message);
  }, []);

  const closeSnack = useCallback(() => {
    setOpenSnack(false);
  }, []);

  return (
    <>
     {isSnackOpen && <AlertCard type={snackColor} message={snackMessage} />}
      <AlertContext.Provider value={setSnack}>
        {children}
      </AlertContext.Provider>
    </>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within a NameProvider");
  return context;
};

AlertProvider.propTypes = {
  children: node.isRequired,
};
