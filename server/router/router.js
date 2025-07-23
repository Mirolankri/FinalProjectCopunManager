const express = require('express');
const router = express.Router();
const { handleError } = require('../utils/errorHandler');
const usersRestController = require('../routes/users/routes/usersRestController');
const authRestController = require('../routes/auth/routes/authRestController');
const couponRestController = require('../routes/coupons/routes/couponRestController');
const companiesRestController = require('../routes/coupons/routes/companiesRestController');
const categoriesRestController = require('../routes/coupons/routes/categoriesRestController');
const subscriptionRestController = require('../routes/subscription/routes/subscriptionRestController');

router.use('/auth', authRestController);
router.use('/users', usersRestController);
router.use('/coupons', couponRestController);
router.use('/companies', companiesRestController);
router.use('/categories', categoriesRestController);
router.use('/subscription', subscriptionRestController);

router.use((req, res, next) => {
    handleError(res, 404, 'Error 404: Page not found.')
});

module.exports = router;
