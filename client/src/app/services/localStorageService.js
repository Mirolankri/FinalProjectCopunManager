'use client'
import { jwtDecode } from "jwt-decode";
const TOKEN = "token";
const isBrowser = () => typeof window !== 'undefined';

export const setTokenInLocalStorage = (encryptedToken) =>
  isBrowser() && localStorage.setItem(TOKEN, encryptedToken);

export const getUser = () => {
  try {
    const user = isBrowser() && localStorage.getItem(TOKEN);
    return jwtDecode(user);
  } catch (error) {
    return null;
  }
};

export const removeToken = () => isBrowser() && localStorage.removeItem(TOKEN);

export const getToken = () => isBrowser() && localStorage.getItem(TOKEN);

export const SetValueLocalStorage = (key, value) => isBrowser() && localStorage.setItem(key, value);

export const GetValueLocalStorage = (key) => isBrowser() && localStorage.getItem(key);