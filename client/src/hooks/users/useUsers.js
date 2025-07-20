"use client"
import AuthService from "@/app/auth/services/apiService";
import { useUser } from "@/app/components/providers/UserProvider";
import { getUser, setTokenInLocalStorage } from "@/app/services/localStorageService";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import useAxios from "../Axios/useAxios";
import normalizeUser from "@/app/auth/helpers/normalization/normalizeUser";
import { useAlert } from "@/providers/AlertProvider/AlertProvider";

const AuthServiceInstance = new AuthService();

const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const AlertInstance = useAlert();
    


    useAxios();

    const { user, setUser, setToken } = useUser();
    const requestStatus = useCallback(
        (loading, errorMessage, users, user = null) => {
          setLoading(loading);
          setUsers(users);
          setUser(user);
          setError(errorMessage);
        },
        [setUser]
      );

    const handleLogin = useCallback(async (user) => {
        try {
          const token = await AuthServiceInstance.Login(user);      
          setTokenInLocalStorage(token);
          setToken(token);
          const userFromLocalStorage = getUser();
          requestStatus(false, null, null, userFromLocalStorage);
          router.push("/");
        } catch (error) {
          requestStatus(false, error, null);
        }
      }, []);
    const handleRegister = useCallback(
      async (userFromClient) => {
        try {
          const normalizedUser = normalizeUser(userFromClient);
          const { data } = await AuthServiceInstance.Register(normalizedUser);
          await handleLogin({
            phone: userFromClient.phone,
            password: userFromClient.password,
          });
        } catch (error) {
          requestStatus(false, error, null);
        }
      },
      [requestStatus, handleLogin]
    );
    const handleUpdateUser = useCallback(
      async (userId, userFromClient) => {
        try {
          const normalizedUser = normalizeUser(userFromClient);
          const { data } = await AuthServiceInstance.UpdateUser({userId, _body: normalizedUser});
          requestStatus(false, null, null, data);
          AlertInstance("SUCCESS", "פרטי המשתמש עודכנו בהצלחה")
        } catch (error) {
          requestStatus(false, error, null);
        }
      },
      []
    );
    const handleGetMyUsers = useCallback(async () => {
        try {
          const data = await AuthServiceInstance.GetMyUsers();          
          requestStatus(false, null, data, null);
        } catch (error) {
          requestStatus(false, error, null, null);
        }
      },
      [requestStatus]
    );
    const handleGetAllUsers = useCallback(
      async () => {
        try {
          const data = await AuthServiceInstance.GetAllUsers();
          requestStatus(false, null, data);
        } catch (error) {
          requestStatus(false, error, null);
        }
      },
      [requestStatus]
    );
    const handleMakeAdmin = useCallback(async (userId) => {
      try {
        const { data } = await AuthServiceInstance.MakeAdmin(userId);
        requestStatus(false, null, null, data);
        AlertInstance("SUCCESS", "פרטי המשתמש עודכנו בהצלחה")
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
    );
    const handleDeleteUser = useCallback(async (userId) => {
      try {
        const { data } = await AuthServiceInstance.DeleteUser(userId);
        requestStatus(false, null, null, data);
        AlertInstance("SUCCESS", "פרטי המשתמש עודכנו בהצלחה")
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
    );
      
    
      const value = useMemo(
        () => ({ isLoading, error, user, users }),
        [isLoading, error, user, users]
      );
    
      return {
        value,
        handleLogin,
        // handleLogout,
        handleRegister,
        handleUpdateUser,
        handleGetMyUsers,
        handleGetAllUsers,
        handleMakeAdmin,
        handleDeleteUser
        // handleEdit,
        // handleGetUser,
      };
    
  
}

export default useUsers;