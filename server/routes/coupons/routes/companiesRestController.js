require('dotenv').config();
const express = require('express');
const router = express.Router();
const { handleError } = require('../../../utils/errorHandler');
const { GetCompanies } = require('../models/companiesAccessDataService');

router.get('/', async (req, res) => {
    try {
        const companies = await GetCompanies();
        return res.send(companies);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


module.exports = router;
