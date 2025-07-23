require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Subscribe, GetSubscriptions, GetSubscriptionByEmail } = require('../models/subscriptionAccessDataService');
const { handleError } = require('../../../utils/errorHandler');

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) throw new Error('לא הוזן אימייל');
        const subscription = await Subscribe(email);
        return res.send(subscription);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.get('/', async (req, res) => {
    try {
        const user = req.user;
        if(!user.isSuperAdmin) throw new Error('אתה לא מורשה');
        const subscriptions = await GetSubscriptions();
        return res.send(subscriptions);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        if(!email) throw new Error('לא הוזן אימייל');
        const user = req.user;
        if(!user.isSuperAdmin) throw new Error('אתה לא מורשה');
        const subscription = await GetSubscriptionByEmail(email);
        return res.send(subscription);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});
module.exports = router;
