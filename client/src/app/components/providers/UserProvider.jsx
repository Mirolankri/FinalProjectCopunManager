"use client";
import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { node } from "prop-types";
import {
  getToken,
  getUser,
  removeToken,
} from "@/app/services/localStorageService";
import { useRouter, usePathname } from "next/navigation";
import { userNavigation } from "../layout/header/TopNavBar/Menu";
import AuthService from "@/app/auth/services/apiService";

const AuthServiceInstance = new AuthService();

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getToken);
  const router = useRouter();
  const pathname = usePathname();

  const HandleGetMe = useCallback(async (user) => {
    try {
      const userData = await AuthServiceInstance.GetMe();
      const mergedUser = { ...userData, exp: user.exp, iat: user.iat };
      setUserData(mergedUser);
    } catch (error) {}
  }, []);
  const handleLogout = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
    setUserData(null);
  }, [setUser, setUserData]);

  useEffect(() => {
    // console.log("token change", token);
  }, [token]);
  useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();

      if (!userFromLocalStorage) {
        const filteredRequiredLogin = userNavigation.filter(
          (item) => item.requiredLogin
        );
        setLoading(false);
        if (filteredRequiredLogin.includes(pathname))
          return router.push("/auth/login");
      }
      setUser(userFromLocalStorage);
      HandleGetMe(userFromLocalStorage);
      setLoading(false);
    }
    if (user) {
      if (!user.exp || user.exp * 1000 < Date.now()) {
        const expDate = new Date(user.exp * 1000);

        removeToken();
        setUser(null);
        setLoading(false);
        router.push("/auth/login");
      } else {
        HandleGetMe(user);
      }
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      loading,
      userData,
      setUserData,
      handleLogout,
    }),
    [user, token, loading, userData, setUserData, handleLogout]
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
