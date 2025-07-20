require('dotenv').config();
const express = require('express');
const router = express.Router();
const { handleError } = require('../../../utils/errorHandler');
const auth = require('../../auth/services/authService');
const { validateNewCoupon, validateSharedCoupon } = require('../validations/couponValidationService');
const normalizeCoupon = require('../helpers/normalizeCoupon');
const { CreateCoupon, GetMyCoupons, DeleteCoupon, UpdateCoupon, ShareCoupon, GetSharedCoupon } = require('../models/couponAccessDataService');
const normalizeSharedCoupon = require('../helpers/normalizeSharedCoupon');

router.get('/', auth, async (req, res) => {
    const user = req.user;
    console.log("user", user);
    
    try {
        if(!user.isAdmin) throw new Error('אתה לא מורשה');
        const coupons = await GetMyCoupons(user._id);
        return res.send(coupons);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.post('/', auth, async(req, res) => {
    try {
        let couponData = req.body;
        const user = req.user;
        if(!user.isAdmin) throw new Error('אתה לא מורשה להוסיף קופון');

        const { error } = validateNewCoupon(couponData);
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
        couponData = normalizeCoupon(couponData, user._id);
        
        
        couponData = await CreateCoupon(couponData);
        return res.status(201).send(couponData);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if(!user.isAdmin) throw new Error('אתה לא מורשה למחוק קופון');
        const deletedCoupon = await DeleteCoupon(id,user);
        return res.status(200).send(deletedCoupon);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        let couponData = req.body;
        const user = req.user;
        if(!user.isAdmin) throw new Error('אתה לא מורשה לעדכן קופון');
        const { error } = validateNewCoupon(couponData);
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
        couponData = normalizeCoupon(couponData, user._id);
        
        const updatedCoupon = await UpdateCoupon(id, couponData, user);
        return res.status(200).send(updatedCoupon);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

/**
 * 
 */
router.post('/share/:couponId', auth, async (req, res) => {
    try {
        const { couponId } = req.params;
        let sharedData = req.body;
        const user = req.user;
        if(!user.isAdmin) throw new Error('אתה לא מורשה לשתף קופון');
        const { error } = validateSharedCoupon(sharedData);
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
        sharedData = normalizeSharedCoupon(sharedData, couponId);
        
        const sharedCoupon = await ShareCoupon(couponId, sharedData, user);
        return res.status(200).send(sharedCoupon);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.get('/share/:couponId', async (req, res) => {
    const { couponId } = req.params;
    try {
        // if(!user.isAdmin) throw new Error('אתה לא מורשה');
        const sharedCoupon = await GetSharedCoupon(couponId);
        return res.send(sharedCoupon);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});



module.exports = router;