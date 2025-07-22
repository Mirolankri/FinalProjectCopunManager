'use client'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import Coupons from '../components/Coupons'
import ErrorPage from '@/app/components/Elements/Pages/ErrorPage'
import { AlignJustify, Grid3x3, LayoutGrid, Rows4 } from 'lucide-react'
import { IconButton } from '@/components/animate-ui/buttons/icon'
import { GetValueLocalStorage, SetValueLocalStorage } from '@/app/services/localStorageService'
import ViewMode from './Layout/ViewMode'
import { ShowFavorite } from './Layout/Filters/ShowFavorite'

const CouponPage = ({isLoading, coupons, error,onDelete,onEdit,onShare,companies,categories,onMarkUsed_UnUsed,onFavorite}) => {
    const [view, setView] = useState('grid');
    const [filteredCoupons, setFilteredCoupons] = useState(coupons);
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
        
    };
    if (isLoading) return <Spinner/>
    if (error) return <ErrorPage error={error.message}/>
    if(coupons && !coupons.length) return <ErrorPage error={"לא נמצאו קופונים"}/>
    if(!coupons)return <Spinner/>
    
   
    
    // if(coupons && !!coupons.length) 
    return (
        <>
        <div className='flex items-center justify-between mb-4 sticky top-15 gap-2 bg-white/30 bg-opacity-25 backdrop-blur-sm h-15'>
            <ViewMode view={view} onHandleViewChange={HandleViewChange}/>
            <ShowFavorite onShowFavorite={HandleShowFavorite}/>
        </div>
        <Coupons
            view={view}
            coupons={coupons}
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

CouponPage.propTypes = {}

export default CouponPage