'use client'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

class SubscriptionApiService {
    constructor(_Params={}) {
        for (const [key, value] of Object.entries(_Params)) {
            this[key] = value;
        }
    }
    
    Subscribe = async (email) => {
        try {
            const { data } = await axios.post(`${apiUrl}/subscription`, { email })
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    GetSubscriptions = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/subscription`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    GetSubscriptionByEmail = async (email) => {
        try {
            const { data } = await axios.get(`${apiUrl}/subscription/${email}`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}

export default SubscriptionApiService