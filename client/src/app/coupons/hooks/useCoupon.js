'use client'
import { useUser } from "@/app/components/providers/UserProvider"
import { useCallback, useEffect, useMemo, useState } from "react";
import CouponService from "../services/apiService";
import useAxios from "@/hooks/Axios/useAxios";
import normalizeCoupon from "../helpers/normalization/normalizeCoupon";
import { useRouter, useSearchParams } from "next/navigation";
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import { useModal } from "@/providers/ModalProvider/ModalProvider";
const CouponInstance = new CouponService();

const useCoupon = () => {
    const {closeModal} = useModal();
    const {user} = useUser();
    const [coupons, setCoupons] = useState(null);
    const [coupon, setCoupon] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('')
    const [filteredCoupons, setFilteredCoupons] = useState(null)
    const router = useRouter();
    const AlertInstance = useAlert();
    const searchParams = useSearchParams();
    useAxios();
    useEffect(()=>{      
      setQuery(searchParams.get('q') ?? '')
    }, [searchParams])

    useEffect(()=>{
      if (coupons) {
        setFilteredCoupons(
          coupons.filter(coupon => coupon.name.includes(query) || String(coupon.code).includes(query))
        )
      }
    },[coupons, query])
  
  
    const requestStatus = (loading, errorMessage, coupons, coupon = null) => {
        setLoading(loading);
        setError(errorMessage);
        setCoupons(coupons);
        setCoupon(coupon);
      };

      const handleGetCoupon = useCallback(async (couponId) => {
        try {
          // i want add setTimeout 5000ms to request to demmy api
          
          setLoading(true);
          // setTimeout(async () => {
            const coupon = await CouponInstance.getSharedCoupon(couponId);
            requestStatus(false, null, [...(coupons || []), coupon], coupon);
          // }, 5000);
        } catch (error) {
          requestStatus(false, error, null);
        }
      }, []);
      const handleGetCoupons = useCallback(async () => {
        try {
          setLoading(true);
          const coupons = await CouponInstance.getCoupons();
          requestStatus(false, null, coupons);
        } catch (error) {
          requestStatus(false, error, null);
        }
      }, []);
      const handleCreateCoupon = useCallback(async (coupon) => {
        try {
          setLoading(true);
          const normalizedCoupon = normalizeCoupon(coupon);
          const newCoupon = await CouponInstance.Create(normalizedCoupon);
          // const coupons = await CouponInstance.getCoupons();
          requestStatus(false, null, null, newCoupon);
          // await handleGetCoupons();
          closeModal();
          AlertInstance("SUCCESS", "קופון נוסף בהצלחה")
          // router.push("/coupons");
        } catch (errorMessage) {
          requestStatus(false, errorMessage.response.data || 'שגיאה בהוספת קופון', null);
        }
      }, []);
      const handleDeleteCoupon = useCallback(async (couponId) => {
        try {
          setLoading(true);
          await CouponInstance.Delete(couponId);
          // const coupons = await CouponInstance.getCoupons();
          requestStatus(false, null, null, null);
          // await handleGetCoupons();
          AlertInstance("SUCCESS", "קופון נמחק בהצלחה");
        } catch (errorMessage) {
          requestStatus(false, errorMessage.response.data || 'שגיאה במחיקת קופון', null);
        }
      }, []);
      const handleUpdateCoupon = useCallback(async (couponId,couponData) => {
        try {
          setLoading(true);
          // const normalizedCoupon = normalizeCoupon(coupon);
          const updatedCoupon = await CouponInstance.Update(couponId, couponData);
          // const coupons = await CouponInstance.getCoupons();
          requestStatus(false, null, null, updatedCoupon);
          // await handleGetCoupons();
          closeModal();
          AlertInstance("SUCCESS", "קופון עודכן בהצלחה");
        } catch (errorMessage) {
          requestStatus(false, errorMessage.response.data || 'שגיאה בעדכון קופון', null);
        }
      }, []);
      const handleShareCoupon = useCallback(async (couponId,sharedData) => {
        try {
          setLoading(true);
          // const normalizedCoupon = normalizeCoupon(coupon);
          const sharedCoupon = await CouponInstance.Share(couponId, sharedData);
          // const coupons = await CouponInstance.getCoupons();
          requestStatus(false, null,null);
          // await handleGetCoupons();
          // closeModal();
          AlertInstance("SUCCESS", "קופון שותף בהצלחה");
          return sharedCoupon
        } catch (errorMessage) {
          requestStatus(false, errorMessage.response.data || 'שגיאה בשיתוף קופון', null);
        }
      }, []);
    
      const value = useMemo(() => {
        return { isLoading, coupons, coupon, error, filteredCoupons };
      }, [isLoading, coupons, coupon, error, filteredCoupons]);
    
      return {
        value,
        handleGetCoupons,
        handleCreateCoupon,
        handleGetCoupon,
        // handleGetMyCards,
        handleDeleteCoupon,
        handleUpdateCoupon,
        handleShareCoupon,
        // handleLikeCard,
        // handleGetFavCards,
      };
}

export default useCoupon
