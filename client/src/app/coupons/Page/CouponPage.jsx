import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/app/components/Elements/Spinner/Spinner'
import Coupons from '../components/Coupons'
import ErrorPage from '@/app/components/Elements/Pages/ErrorPage'

const CouponPage = ({isLoading, coupons, error,onDelete,onEdit,onShare}) => {
    if (isLoading) return <Spinner/>
    if (error) return <ErrorPage error={error.message}/>
    if(coupons && !coupons.length) return <ErrorPage error={"לא נמצאו קופונים"}/>
    
    if(coupons && !!coupons.length) 
    return (
        <Coupons
            coupons={coupons}
            onDelete={onDelete}
            onEdit={onEdit}
            onShare={onShare}
        />
    )
}

CouponPage.propTypes = {}

export default CouponPage