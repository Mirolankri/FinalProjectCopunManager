'use client'
import React, { useState, useContext, useEffect, useMemo } from "react";
import { node } from "prop-types";
import { getToken, getUser, removeToken } from "@/app/services/localStorageService";
import { useRouter } from "next/navigation";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getToken);  
  const router = useRouter();
  useEffect(() => {
    console.log("token change", token);
    
  }, [token]);
  useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();
      if(!userFromLocalStorage) {
        setLoading(false);
        return router.push('/auth/login');
      }
      setUser(userFromLocalStorage);
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      // check user validity user.exp
      if (!user.exp || user.exp * 1000 < Date.now()) {
        console.log(new Date(Date.now()));
        console.log("Date.now()", Date.now());
        
        console.log("user.exp < Date.now()", user.exp * 1000 < Date.now());
        console.log("user.exp", user.exp);
        console.log("user.exp", user.exp * 1000);
        
        // user.exp to date
        const expDate = new Date(user.exp * 1000);
        console.log("expDate", expDate);
        
        removeToken();
        setUser(null);
        setLoading(false);
        router.push('/auth/login');
      }
    }
  }, [user]);

  const value = useMemo(
    () => ({ user, setUser, token, setToken, loading }),
    [user, token, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

UserProvider.propTypes = {
  children: node.isRequired,
};
