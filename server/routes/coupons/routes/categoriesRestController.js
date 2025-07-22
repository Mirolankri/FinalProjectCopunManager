require('dotenv').config();
const express = require('express');
const router = express.Router();
const { handleError } = require('../../../utils/errorHandler');
const { GetCategories } = require('../models/categoriesAccessDataService');

router.get('/', async (req, res) => {
    try {
        const categories = await GetCategories();
        return res.send(categories);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


module.exports = router;
