'use client'
import React, { useEffect, useState } from 'react'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import Coupons from '../components/Coupons'
import ErrorPage from '@/app/components/Elements/Pages/ErrorPage'
import { GetValueLocalStorage, SetValueLocalStorage } from '@/app/services/localStorageService'
import ViewMode from './Layout/ViewMode'
import { ShowFavorite } from './Layout/Filters/ShowFavorite'
import { useUser } from '@/app/components/providers/UserProvider'
import AddNewCouponBTN from '../components/btn/AddNewCouponBTN'

const CouponPage = ({isLoading, coupons, error,onDelete,onEdit,onShare,companies,categories,onMarkUsed_UnUsed,onFavorite,OnCreateCoupon}) => {
    const {user} = useUser();
    const [view, setView] = useState('grid');
    const [filteredCoupons, setFilteredCoupons] = useState(coupons);
    const [showFavoriteOnly, setShowFavoriteOnly] = useState(false);
    
    useEffect(() => {
        if (showFavoriteOnly) {
            setFilteredCoupons(coupons?.filter(coupon => coupon.favorite) || []);
        } else {
            setFilteredCoupons(coupons);
        }
    }, [coupons, showFavoriteOnly]);

    useEffect(() => {
        const GetViewFromLocalStorage = GetValueLocalStorage('view');
        if (GetViewFromLocalStorage) {
            setView(GetViewFromLocalStorage);
        }
        
    }, []);
    
    const HandleViewChange = (view) => {
        setView(view);
        SetValueLocalStorage('view', view);
    };
    const HandleShowFavorite = (showFavorite) => {
        setShowFavoriteOnly(showFavorite);
    };
    if (isLoading) return <Spinner/>
    if (error) return <ErrorPage error={error.message}/>
    if(coupons && !coupons.length) 
        return (<div className='flex flex-col items-center justify-between gap-5'>
                <ErrorPage error={"לא נמצאו קופונים"}/>
                <div className='flex items-center justify-center gap-2'>
                    <div className='text-lg font-bold'>הוספת קופון חדש</div>
                    <AddNewCouponBTN categories={categories} companies={companies} OnCreateCoupon={OnCreateCoupon}/>
                </div>
            </div>)
    if(!coupons)return <Spinner/>
    
    return (
        <>
        <div className='flex items-center justify-between mb-4 sticky top-15 gap-2 bg-white/30 bg-opacity-25 backdrop-blur-sm h-15'>
            <ViewMode view={view} onHandleViewChange={HandleViewChange}/>
            {user && 
                <ShowFavorite onShowFavorite={HandleShowFavorite}/>
            }
            
        </div>
        <Coupons
            view={view}
            coupons={filteredCoupons}
            onDelete={onDelete}
            onEdit={onEdit}
            onShare={onShare}
            companies={companies}
            categories={categories}
            onMarkUsed_UnUsed={onMarkUsed_UnUsed}
            onFavorite={onFavorite}
        />
        </>
    )
}
export default CouponPage