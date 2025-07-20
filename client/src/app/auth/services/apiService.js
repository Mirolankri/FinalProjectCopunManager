'use client'
import { getToken } from '@/app/services/localStorageService';
import axios from 'axios'
// axios.defaults.withCredentials = true;

const apiUrl = process.env.NEXT_PUBLIC_API_URL

class AuthService {
    constructor(_Params={}) {
        for (const [key, value] of Object.entries(_Params)) {
            this[key] = value;
        }
    }
    /**
     * Login
     * @param _body {object}
     *  - phone {string}
     *  - password {string}
     * @returns 
     */
    Login = async (_body) => {
        try {
            const { data } = await axios.post(`${apiUrl}/auth/login`, _body)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    Register = async (_body) => {
        try {
            const { data } = await axios.post(`${apiUrl}/auth/register`, _body)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    GetMe = async () => {
        const GetToken = getToken();
        if(!GetToken) return Promise.reject(new Error('No token found'));
        axios.defaults.headers.common["x-auth-token"] = GetToken;
        try {
            const { data } = await axios.get(`${apiUrl}/users/me`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    UpdateUser = async ({userId,_body}) => {
        try {
            const { data } = await axios.put(`${apiUrl}/users/${userId}`, _body)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    GetMyUsers = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/users/my-users`)            
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    GetAllUsers = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/users`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    MakeAdmin = async (userId) => {
        try {
            const { data } = await axios.patch(`${apiUrl}/users/make-admin/${userId}`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    DeleteUser = async (userId) => {
        try {
            const { data } = await axios.delete(`${apiUrl}/users/${userId}`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}
export default AuthService