import AuthService from "@/app/auth/services/apiService";
import { useUser } from "@/app/components/providers/UserProvider";
import { getUser, setTokenInLocalStorage } from "@/app/services/localStorageService";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import useAxios from "../Axios/useAxios";
import normalizeUser from "@/app/auth/helpers/normalization/normalizeUser";

const AuthServiceInstance = new AuthService();

const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();


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
    
      const value = useMemo(
        () => ({ isLoading, error, user, users }),
        [isLoading, error, user, users]
      );
    
      return {
        value,
        handleLogin,
        // handleLogout,
        handleRegister,
        // handleEdit,
        // handleGetUser,
        // handleGetAllUsers,
        // handleDeleteUser,
        // handleBusinessUser
      };
    
  
}

export default useUsers;