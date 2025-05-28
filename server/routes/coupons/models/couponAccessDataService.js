require('dotenv').config();
const { pick, drop, omit } = require('lodash');
const mongoose = require('mongoose');
const DB = process.env.DB;
const CouponSchema = require('./mongoDB/CouponSchema');
const { encrypt, generateCodeHash, decrypt } = require('../../../utils/encryptionService');
const SharedCouponSchema = require('./mongoDB/SharedCouponSchema');

const CreateCoupon = async (couponData) => {
    if(DB === 'mongoDB'){
        try {
            const { code } = couponData
            const codeHash = generateCodeHash(code);
            let coupon = await CouponSchema.findOne({codeHash});
            if (coupon) throw new Error('הקופון כבר קיים');
            if (couponData.code) {
                couponData.code = encrypt(couponData.code);
            }
            couponData.codeHash = codeHash;
            coupon = new CouponSchema(couponData);
            coupon = await coupon.save();
            coupon = pick(coupon, ['_id']);

        return Promise.resolve(coupon);
    } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }

    }
    return Promise.resolve('Not in mongoDB');
}
const GetMyCoupons = async (userId) => {
    if(DB === 'mongoDB'){
        try {
            let coupons = await CouponSchema.find({userId}).select('-codeHash -userId');
            if(!coupons) throw new Error('לא נמצאו קופונים');
            
            coupons = await Promise.all(coupons.map(async (coupon) => {
                let couponDoc = coupon.toObject();
                if (couponDoc.code) couponDoc.code = decrypt(couponDoc.code);
                
                const sharedCoupons = await SharedCouponSchema.find({couponId: couponDoc._id}).select('-__v');
                const sharedCouponsData = sharedCoupons.map(doc => doc.toObject());

                couponDoc.sharedCoupons = sharedCouponsData || [];
                couponDoc.totalSharedCoupons = sharedCouponsData ? sharedCouponsData.length : 0;
                
                return couponDoc;
            }));
            
            return Promise.resolve(coupons);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
}

const DeleteCoupon = async (id,authUser) => {
    if(DB === 'mongoDB'){
        try {
            const FindCoupon = await CouponSchema.findById(id,{userId:1});
            if (!FindCoupon) throw new Error('לא נמצאו קופונים');
            if (FindCoupon.userId !== authUser._id && !authUser.isAdmin) throw new Error('אתה לא מורשה למחוק קופון');

            const coupon = await CouponSchema.findByIdAndDelete(id);
            if (!coupon) throw new Error('לא נמצאו קופונים');
            return Promise.resolve(coupon);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
}

const UpdateCoupon = async (id, couponData, authUser) => {    
    if(DB === 'mongoDB'){
        try {
            const { code } = couponData
            const codeHash = generateCodeHash(code);
            
            const FindCoupon = await CouponSchema.findById(id,{userId:1});
            if (!FindCoupon) throw new Error('לא נמצאו קופונים');
            if (FindCoupon.userId !== authUser._id && !authUser.isAdmin) throw new Error('אתה לא מורשה לעדכן קופון');
            if (code) {
                couponData.code = encrypt(code);
            }
            couponData.codeHash = codeHash;
            const updatedCoupon = await CouponSchema.findByIdAndUpdate(id, couponData, { new: true });
            if (!updatedCoupon) throw new Error('לא נמצאו קופונים');
            return Promise.resolve(updatedCoupon);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
}
const ShareCoupon = async (couponId, sharedData, authUser) => {
    if(DB === 'mongoDB'){
        try {
            const FindCoupon = await CouponSchema.findById(couponId,{userId:1});
            if (!FindCoupon) throw new Error('לא נמצאו קופונים');
            if (FindCoupon.userId !== authUser._id && !authUser.isAdmin) throw new Error('אתה לא מורשה לשתף קופון');
            sharedData.couponId = couponId;
            let sharedCoupon = new SharedCouponSchema(sharedData);
            sharedCoupon = await sharedCoupon.save();
            if (!sharedCoupon) throw new Error('לא נוצרו שיתופים');
            // iwant set url with id after create
            sharedCoupon.url = `/coupons/share/${sharedCoupon._id}`;
            sharedCoupon = await sharedCoupon.save();
            return Promise.resolve(sharedCoupon);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
}
const GetSharedCoupon = async (id) => {
    if(DB === 'mongoDB'){
        try {
            const sharedCoupon = await SharedCouponSchema.findById(id);
            if (!sharedCoupon) throw new Error('קופון לא נמצא');
            const coupon = await CouponSchema.findById(sharedCoupon.couponId);
            if (!coupon) throw new Error('קופון לא נמצא');            
            let couponDoc = coupon.toObject();
            if (couponDoc.code) couponDoc.code = decrypt(couponDoc.code);
            return Promise.resolve(couponDoc);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve('Not in mongoDB');
}

module.exports = { CreateCoupon, GetMyCoupons, DeleteCoupon, UpdateCoupon,ShareCoupon,GetSharedCoupon };