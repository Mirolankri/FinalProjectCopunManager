'use client'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/app/components/providers/UserProvider"
import CouponService from "../services/apiService";
import useAxios from "@/hooks/Axios/useAxios";
import normalizeCoupon from "../helpers/normalization/normalizeCoupon";
import { useSearchParams } from "next/navigation";
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
    const AlertInstance = useAlert();
    const searchParams = useSearchParams();
    useAxios();
    useEffect(()=>{      
      setQuery(searchParams.get('q') ?? '')
    }, [searchParams])

    useEffect(()=>{
      if (coupons) {
        const filtered = coupons.filter(coupon => coupon.name.toLowerCase().includes(query.toLowerCase()) || String(coupon.code).toLowerCase().includes(query.toLowerCase()) || String(coupon.description).toLowerCase().includes(query.toLowerCase()) || String(coupon.categoryName).toLowerCase().includes(query.toLowerCase()) || String(coupon.storeName).toLowerCase().includes(query.toLowerCase()));
        const sorted = [...filtered].sort((a, b) => {
          if (a.used && !b.used) return 1;
          if (!a.used && b.used) return -1;
          return 0;
        });
        setFilteredCoupons(sorted);
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
          setLoading(true);
            const coupon = await CouponInstance.getSharedCoupon(couponId);
            requestStatus(false, null, [...(coupons || []), coupon], coupon);
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
          requestStatus(false, null, null, newCoupon);
          closeModal();
          AlertInstance("SUCCESS", "קופון נוסף בהצלחה")
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
      const handleMarkUsed_UnUsed = useCallback(async (couponId) => {
        try {
          const updatedCoupon = await CouponInstance.MarkUsed_UnUsed(couponId);
          requestStatus(false, null, null, updatedCoupon);
        } catch (errorMessage) {
          requestStatus(false, errorMessage.response.data || 'שגיאה בעדכון קופון', null);
        }
      }, []);
      const handleMarkFavorite_UnFavorite = useCallback(async (couponId) => {
        try {
          const updatedCoupon = await CouponInstance.MarkFavorite_UnFavorite(couponId);
          requestStatus(false, null, null, updatedCoupon);
        } catch (errorMessage) {
          requestStatus(false, errorMessage.response.data || 'שגיאה בעדכון קופון', null);
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
        handleMarkUsed_UnUsed,
        handleDeleteCoupon,
        handleUpdateCoupon,
        handleShareCoupon,
        handleMarkFavorite_UnFavorite,
      };
}

export default useCoupon
