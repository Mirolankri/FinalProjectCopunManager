'use client'
import React, { useState, useContext, useEffect, useMemo, useCallback } from "react";
import { node } from "prop-types";
import { getToken, getUser, removeToken } from "@/app/services/localStorageService";
import { useRouter, usePathname } from "next/navigation";
import { userNavigation } from "../layout/header/TopNavBar/Menu";
import AuthService from "@/app/auth/services/apiService";
import useAxios from "@/hooks/Axios/useAxios";
import useUsers from "@/hooks/users/useUsers";

const AuthServiceInstance = new AuthService();

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getToken);  
  const router = useRouter();
  const pathname = usePathname();
  // useAxios();
  const HandleGetMe = useCallback(async (user) => {    
    try {
      const userData = await AuthServiceInstance.GetMe();
      const mergedUser = {...userData, exp: user.exp, iat: user.iat };
      setUserData(mergedUser);
    } catch (error) {
      // setError(error.message);
    }
  }, []);
  useEffect(() => {
    // console.log("token change", token);
    
  }, [token]);
  useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();
      
      if(!userFromLocalStorage) {
        const filteredRequiredLogin = userNavigation.filter(item => item.requiredLogin);
        setLoading(false);
        if(filteredRequiredLogin.includes(pathname))
        return router.push('/auth/login');
      }
      setUser(userFromLocalStorage);
      HandleGetMe(userFromLocalStorage);
      setLoading(false);
    }
    if (user) {
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
      
      // HandleGetMe(user);
    }
  }, [user]);
  // useEffect(() => {
  //   if (user) {
  //     // HandleGetMe();
  //     // check user validity user.exp
  //     if (!user.exp || user.exp * 1000 < Date.now()) {
  //       console.log(new Date(Date.now()));
  //       console.log("Date.now()", Date.now());
        
  //       console.log("user.exp < Date.now()", user.exp * 1000 < Date.now());
  //       console.log("user.exp", user.exp);
  //       console.log("user.exp", user.exp * 1000);
        
  //       // user.exp to date
  //       const expDate = new Date(user.exp * 1000);
  //       console.log("expDate", expDate);
        
  //       removeToken();
  //       setUser(null);
  //       setLoading(false);
  //       router.push('/auth/login');
  //     }
  //     HandleGetMe();
  //     console.log("user", user);
  //   }
  // }, [user]);
  

  const value = useMemo(
    () => ({ user, setUser, token, setToken, loading,userData, setUserData }),
    [user, token, loading,userData,setUserData]
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
