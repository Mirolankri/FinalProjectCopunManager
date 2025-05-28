'use client'
import axios from 'axios'
// axios.defaults.withCredentials = true;

const apiUrl = process.env.NEXT_PUBLIC_API_URL

class CouponService {
    constructor(_Params={}) {
        for (const [key, value] of Object.entries(_Params)) {
            this[key] = value;
        }
    }
    
    getCoupons = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/coupons`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    getSharedCoupon = async (couponId) => {
        try {
            const { data } = await axios.get(`${apiUrl}/coupons/share/${couponId}`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    Create = async (coupon) => {
        try {
            const { data } = await axios.post(`${apiUrl}/coupons`, coupon)
            return data
        }
        catch (error) {            
            return Promise.reject(error)
        }
    }
    Delete = async (couponId) => {
        try {
            const { data } = await axios.delete(`${apiUrl}/coupons/${couponId}`)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    Update = async (couponId, couponData) => {
        try {
            const { data } = await axios.put(`${apiUrl}/coupons/${couponId}`, couponData)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    Share = async (couponId, sharedData) => {
        try {
            const { data } = await axios.post(`${apiUrl}/coupons/share/${couponId}`, sharedData)
            return data
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
    
}
export default CouponService