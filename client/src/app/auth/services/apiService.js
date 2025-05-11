'use client'
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
}
export default AuthService